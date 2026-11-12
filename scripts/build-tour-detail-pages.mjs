import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {createContext, runInContext} from 'node:vm';

const root = new URL('../toer/', import.meta.url).pathname;
const localOutput = process.argv[2];
const localeFolders = ['', 'de/'];
const assetsVersion = '20261112-detailpaginas';

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

for (const locale of localeFolders) {
  const folder = join(root, locale);
  const home = readFileSync(join(folder, 'index.html'), 'utf8');
  const items = JSON.parse(home.match(/window\.TWENTE_DATA=(\[.*?\]);/s)[1]);
  const code = readFileSync(join(folder, 'thema/app.js'), 'utf8');
  const startup = code.indexOf("$('#menu-toggle').onclick=");
  if (startup < 0) throw new Error('Could not find application entry point');
  const source = code.slice(0, startup).replace(/^import[^\n]+\n/gm, '');

  // Render the same content used in the existing catalog and gallery.
  const nodes = new Map();
  const document = {
    body: {dataset: {}},
    querySelector(selector) {
      if (!nodes.has(selector)) nodes.set(selector, {
        innerHTML: '', classList: {toggle() {}, remove() {}}, showModal() {},
        querySelector() { return null; },
      });
      return nodes.get(selector);
    },
    querySelectorAll() { return []; },
  };
  const context = createContext({document, window: {TWENTE_DATA: items}});
  runInContext(source, context);
  runInContext('bindPhotoGallery = () => {}', context);

  function render(expression, argument) {
    context.argument = argument;
    runInContext(expression, context);
    return nodes.get('#detail-content').innerHTML;
  }

  function writePage(path, category, title, description, content) {
    const prefix = '/toer/' + locale;
    const template = readFileSync(join(folder, category, 'index.html'), 'utf8');
    const back = locale ? 'Zur Übersicht' : 'Terug naar het overzicht';
    const main = '<main id="main"><div class="wrap detail-page"><a class="textlink detail-back" href="' +
      prefix + (category ? category + '/' : '') + '">' + back + '</a><article>' +
      content.replace('<h2>', '<h1>').replace('</h2>', '</h1>') + '</article></div></main>';
    const page = template
      .replace(/<title>.*?<\/title>/s, () => '<title>' + escapeHTML(title) + ' · TwenteToer</title>')
      .replace(/(<meta name="description" content=")[^"]*/, (_, start) => start + escapeHTML(description))
      .replace(/<link rel="alternate" hreflang="(nl|de)" href="[^"]*">/g, (_, lang) =>
        '<link rel="alternate" hreflang="' + lang + '" href="https://kolfoort.com/toer/' + (lang === 'de' ? 'de/' : '') + path + '">')
      .replace(/(<a class="tt-language-switch" href=")[^"]*/, (_, start) =>
        start + '/toer/' + (locale ? '' : 'de/') + path)
      .replace(/(<body )data-page="[^"]+"/, (_, start) => start + 'data-page="detail" data-detail-category="' + ({voertuigen:'vehicles',activiteiten:'activities',arrangementen:'arrangements'}[category] ?? 'home') + '"')
      .replace(/<main id="main">.*?<\/main>/s, () => main)
      .replace(/(app\.js\?v=)[^"]+/, '$1' + assetsVersion)
      .replace(/(site-information\.css\?ver=)[\d.]+/, '$1' + '4.18');

    const destination = join(folder, path, 'index.html');
    mkdirSync(dirname(destination), {recursive: true});
    writeFileSync(destination, page);

    if (localOutput) {
      const target = join(localOutput, locale, path, 'index.html');
      mkdirSync(dirname(target), {recursive: true});
      writeFileSync(target, page.replace(/(?<!https:\/\/kolfoort\.com)\/toer\/(de\/thema\/|thema\/)?/g,
        (_, asset) => asset ? '/wp-content/themes/twentetoer/toer/' + (asset === 'de/thema/' ? 'de/thema/' : '') : '/'));
    }
  }

  for (const item of items.filter(({group}) => group === 'vehicles' || group === 'activities')) {
    const path = new URL(item.source).pathname.slice(1);
    if (!/^(voertuigen|activiteiten)\/[a-z0-9_-]+\/$/.test(path)) throw new Error(path);
    writePage(path, item.group === 'vehicles' ? 'voertuigen' : 'activiteiten',
      item.name, item.description, render('detail(argument)', item.id));
  }
  const overview = runInContext('arrangementOverview()', context);
  for (const match of overview.matchAll(/data-arrangement="([^"]+)" data-title="([^"]+)"/g)) {
    const [, key, escapedTitle] = match;
    const title = escapedTitle.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    const path = 'arrangementen/' + key + '/';
    const description = runInContext('arrangementDetails[argument].sections[0][1]', Object.assign(context, {argument: key}));
    const content = render('openArrangement(argument)', {dataset: {arrangement: key, title}});
    writePage(path, 'arrangementen', title, description, content);
  }

  const comboRows = code.slice(code.indexOf('  const combinations = ['), code.indexOf('  ].map(([title, vehicleId'));
  const slugs = {3: 'dolce-vita-lunch', 5: 'buggy-barbecue', 2: 'e-chopper-pizza', 9: 'fatmax-borrel-bbq'};
  for (const row of comboRows.matchAll(/\[(?:'([^']+)'|"([^"]+)"), (\d+), (\d+),/g)) {
    const title = row[1] ?? row[2];
    const vehicle = items.find(item => item.id === Number(row[3]));
    const food = items.find(item => item.id === Number(row[4]));
    context.argument = {title, vehicle, food};
    const content = runInContext('combinationContent(argument)', context);
    writePage('arrangementen/' + slugs[vehicle.id] + '/', 'arrangementen', title, vehicle.name + ' · ' + food.name, content);
  }
  const story = render('openHomeTeamStory()', {});
  const title = story.match(/<h2>([^<]+)<\/h2>/)[1];
  const description = story.match(/<p>([^<]+)<\/p>/)[1];
  writePage('ervaringen/tcc-e-chopper/', '', title, description, story);
}
