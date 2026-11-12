import{initPlanner}from'./planner.js?v=20261111-hoofdletters';
const items=window.TWENTE_DATA;
const compareTitle = new Intl.Collator('nl', {sensitivity: 'base', numeric: true}).compare;
const byName = (a, b) => compareTitle(a.name, b.name);
const byPrice = (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity) || byName(a, b);

const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),money=n=>new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR'}).format(n),groupLabel={vehicles:'Voertuigen',activities:'Activiteiten',food:'Eten & Drinken'};let chosen=[];try{chosen=JSON.parse(localStorage.getItem('toer-plan')||'[]').filter(id=>items.some(p=>p.id===id))}catch{}const page=document.body.dataset.page||'home';
function photo(p){return p?.image||'/toer/thema/assets/item-3.jpg'}
function card(p){if(p.id===5)return `<article class="card buggy-card"><a class="card-photo" href="/toer/voertuigen/?voertuig=5" aria-label="Bekijk Buggy Experience"><img loading="lazy" src="${photo(p)}" alt="Off-road buggy rijden bij TwenteToer"></a><div class="card-body"><span class="tag">Echt off-road · onder begeleiding</span><h3>Buggy Experience</h3><p>Een uur zelf rijden over de zandwegen rond Ootmarsum. Stof, modder en een flinke grijns.</p><div class="card-bottom"><div class="price"><small>Per persoon · 1 uur</small><b>€ 60,00</b></div><button class="cta green" data-add="5">Toevoegen aan Mijn toer</button></div><a class="textlink" href="/toer/voertuigen/?voertuig=5">Ontdek de buggyrit</a></div></article>`;return `<article class="card"><button class="card-photo" data-detail="${p.id}" aria-label="Bekijk ${esc(p.name)}"><img loading="lazy" src="${photo(p)}" alt="${esc(p.name)} bij TwenteToer"></button><div class="card-body"><span class="tag">${groupLabel[p.group]} · Ootmarsum</span><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><div class="card-bottom"><div class="price"><small>${p.id===27?'Per kar':p.price!==null?'Vanaf':'Prijs'}</small><b>${p.id===27?money(140):p.price!==null?money(p.price):'Op aanvraag'}</b></div><button class="cta green" data-add="${p.id}">Toevoegen aan Mijn toer</button></div><button class="textlink card-details" data-detail="${p.id}">Bekijk mogelijkheden</button></div></article>`}
function bind(){document.querySelectorAll('[data-detail]').forEach(b=>b.onclick=()=>detail(Number(b.dataset.detail)));document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>add(Number(b.dataset.add)))}
function add(id){if(!chosen.includes(id))chosen.push(id);localStorage.setItem('toer-plan',JSON.stringify(chosen));updateCount();if(page==='plan')renderSelection();$('#detail').close();toast('Toegevoegd aan Mijn toer')}
function updateCount(){document.querySelectorAll('.plan-count').forEach(e=>{e.textContent=chosen.length?String(chosen.length):'';e.hidden=chosen.length===0})}
function toast(text){$('#toast').textContent=text;if(text==='Toegevoegd aan Mijn toer'){const link=document.createElement('a');link.href='/toer/mijn-toer/#aanbod';link.textContent='Bekijk & Betaal';$('#toast').append(link)}$('#toast').hidden=false;setTimeout(()=>$('#toast').hidden=true,6000)}
function drinksMenu(id){if(![52,76].includes(id))return '';const group=(title,drinks)=>`<section><h3>${title}</h3><ul>${drinks.map(d=>`<li>${d}</li>`).join('')}</ul></section>`;return `<div class="drinks-menu"><div class="drinks-included">${id===52?'Standaardassortiment + Premium extra’s · € 12,00 toeslag':'Inbegrepen in het standaard drankarrangement · € 0,00 toeslag'}</div>${id===52?`<div class="drinks-premium">${group('Speciaalbieren',['Texels','Othmar bier'])}${group('Mixdranken',['Gin-tonic','Bacardi-cola','Wodka-Sprite','Andere mixdranken uit het Premium-assortiment'])}<p>Ook alle onderstaande standaarddranken zijn inbegrepen.</p></div>`:''}<div class="drinks-groups">${group('Frisdranken',['Coca-Cola','Coca-Cola Zero','Fanta Orange','Fanta Cassis','Sprite'])}${group('Royal Bliss',['Ginger Ale','Bitter Lemon','Signature Tonic Water','Ginger Beer','Pink Aromatic Berry'])}${group('Water & Fris',['Chaudfontaine Still','Chaudfontaine Sparkling','Rivella'])}${group('IJsthee & Sap',['Fuze Tea Green Tea','Fuze Tea Peach','Fuze Tea Mango','Fuze Tea Lemon','Minute Maid Orange','Minute Maid Apple'])}${group('Bier op fles',['Grolsch pijpje · Premium Pilsner','Grolsch 0,0%','Grolsch Radler 2%','Grolsch Radler 0,0%'])}${group('Wijn van de tap',['Wit · Sauvignon Blanc · Domaine la Colombette, Frankrijk','Rosé · Grenache · Domaine la Colombette, Frankrijk','Rood · Puech D’hortes · Domaine la Colombette, Frankrijk','Zoet · Rheinhessen, Duitsland'])}</div><p class="drinks-footnote">De toeslag hoort bij het drankarrangement; € 0,00 betekent geen extra toeslag, niet los gratis drinken. Alcohol uitsluitend voor 18 jaar en ouder.</p></div>`}
const routeAppLinks = `<div class="actions">
      <a class="textlink" href="https://apps.apple.com/nl/app/twentetoer/id1469183012">App Store</a>
      <a class="textlink" href="https://play.google.com/store/apps/details?id=com.thar.edityourapp.twentetoer">Google Play</a>
    </div>`;

function eChopperDetails(id) {
  if (id !== 2) return '';
  return `<section>
    <h3>Op pad met de E-Chopper</h3>
    <p>Stap op de elektrische E-Chopper en ontdek Ootmarsum en het Twentse landschap. De E-Chopper is makkelijk te besturen. Rijd samen over kronkelende landweggetjes en geniet van de rust en het uitzicht.</p>
  </section>
  <section>
    <h3>In het kort</h3>
    <p>Of je nu met z’n tweeën rijdt of met vrienden op pad gaat, op de elektrische E-Chopper neem je de tijd voor kleine landwegen en weidse uitzichten. Een helm en haarnetje zijn inbegrepen. Je hebt een geldig rijbewijs voor het voertuig nodig.</p>
  </section>
  <section>
    <h3>E-Chopper met kinderen</h3>
    <p>Kinderen van 5 tot en met 10 jaar mogen gratis achterop. Met een passagier is de huurtijd maximaal 2 uur, omdat de actieradius afneemt. Bestuurder en passagier mogen samen maximaal 120 kg wegen.</p>
    <p>We hebben helmen met haarnetjes voor jong en oud. De kleinste helmmaat is S.</p>
    <p>Met een kind op pad? Bekijk ook de <a class="textlink" href="https://www.twentetoer.nl/voertuigen/goccia/">E-Puch</a>.</p>
  </section>
  <section>
    <h3>Routes in de app</h3>
    <p>Download vóór vertrek de gratis TwenteToer-app. Kies een route die past bij je huurtijd, door de bossen en weilanden van Twente of net over de grens in Duitsland. Je kunt ook zelf een route uitstippelen.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Kosten en praktische informatie</h3>
    <p>Per E-Chopper: 2 uur € 30, 3 uur € 35, 4 uur € 40 en 5 uur € 45. Daghuur kost € 50.</p>
    <ul>
      <li>Met een volle accu rijd je maximaal 40 km. Met een passagier neemt de actieradius af.</li>
      <li>Je haalt de E-Chopper op in Ootmarsum. TwenteToer helpt je onderweg en bij slecht weer kun je gratis verplaatsen.</li>
      <li>Een kinderzitje is op de E-Chopper niet mogelijk. TwenteToer verwijst hiervoor naar de E-Puch.</li>
    </ul>
  </section>
  <section>
    <h3>Combineer de E-Chopper met een uitje</h3>
    <p>Ga met een gids op pad, volg een route met foto-opdrachten of combineer de rit met lunch, pizza, barbecue of een borrelplank. Je kunt de rit ook combineren met F1-simracing en schieten met kermisbuksen.</p>
  </section>`;
}

function vehiclePhotoGallery(name, files) {
  return `<section>
    <h3 id="vehicle-gallery-title">Foto-impressie</h3>
    <div class="grid vehicle-photo-grid" data-photo-gallery>
      ${files.map((file, index) => `<a class="card" href="/toer/thema/assets/${file}">
        <img class="card-photo" src="/toer/thema/assets/${file}" alt="${name}, foto ${index + 1}" loading="lazy">
      </a>`).join('')}
    </div>
    <dialog class="buggy-lightbox" aria-labelledby="vehicle-gallery-title">
      <form method="dialog"><button class="close" aria-label="Sluiten">×</button></form>
      <img alt="">
      <div class="buggy-lightbox-controls">
        <button type="button" data-gallery-step="-1" aria-label="Vorige foto">←</button>
        <span aria-live="polite"></span>
        <button type="button" data-gallery-step="1" aria-label="Volgende foto">→</button>
      </div>
    </dialog>
  </section>`;
}

function topolinoDetails(id) {
  if (id !== 3) return '';
  return `<section>
    <h3>Topolino Dolce Vita in Ootmarsum</h3>
    <p>In de volledig elektrische Fiat Topolino beleef je Twente met de wind in je haren. De compacte tweezitter heeft een retro-uitstraling en past bij de smalle straten van Ootmarsum en de kronkelwegen langs weilanden en oude boerderijen.</p>
    <p>Klap het cabriodak open, geniet van de zon en stop onderweg voor koffie op een terras. Dankzij de stille elektrische aandrijving ontdek je de omgeving op je eigen tempo.</p>
  </section>
  <section>
    <h3>In het kort</h3>
    <p>Een open cabrio met volledig elektrische aandrijving en uitgestippelde routes door Twente. In elke Topolino is plaats voor twee personen.</p>
  </section>
  <section>
    <h3>Dolce Vita in Twente</h3>
    <p>Met vrienden kun je in meerdere Topolino’s samen op pad. In de dorpjes valt de kleine Fiat meteen op, dus reken op een zwaai onderweg.</p>
    <p>Verken Ootmarsum met z’n tweeën in de volledig elektrische Fiat Topolino. Dit open cabriootje heeft instapkoorden en een dak dat je zelf opent en sluit. Via een bluetoothspeaker kun je onderweg je eigen muziek afspelen.</p>
  </section>
  <section>
    <h3>Routes in de TwenteToer-app</h3>
    <p>Download de gratis app voor vertrek en zet je telefoon in de dashboardhouder. De routes brengen je langs natuur, bezienswaardigheden en terrasjes.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Huurprijzen en voorwaarden</h3>
    <p><strong>2 uur € 30 · 3 uur € 40 · 4 uur € 50</strong> per persoon bij twee personen per auto. In de boekingsdemo gelden aparte testtarieven.</p>
    <ul>
      <li>Maximaal twee personen per auto. Huisdieren zijn niet toegestaan.</li>
      <li>De bestuurder is minimaal 24 jaar en heeft minstens één jaar rijbewijs B.</li>
      <li>Maximaal 75 km actieradius. Je rijdt uitsluitend de aangegeven routes. De auto heeft gps om misbruik te voorkomen.</li>
      <li>Geen borg. Btw en WA-verzekering zijn inbegrepen.</li>
    </ul>
  </section>
  <section>
    <h3>Combineer de Topolino met een uitje</h3>
    <p>Schuif na de rit aan voor barbecue met drankjes en softijs, warme en koude tapas of een lunch. Bij het pizza-arrangement beleg je je eigen pizza.</p>
    <p>Voor groepen is er een rally met roadbook, een QR-speurtocht of de escapebox ‘Het Verloren Goud’. Wie onderweg iets wil proeven kan de rit combineren met Proef de Boer of een high tea bij Dennenoord in Vasse.</p>
    <p><a class="textlink" href="/toer/arrangementen/">Bekijk arrangementen</a></p>
  </section>
  ${vehiclePhotoGallery('Topolino Dolce Vita', ['topolino-impressie-1.jpg', 'topolino-impressie-2.jpg', 'topolino-impressie-3.png', 'topolino-impressie-4.jpg', 'topolino-impressie-5.jpg', 'topolino-impressie-6.jpg', 'topolino-impressie-7.jpg'])}`;
}

const eBikeRentalInfo = `<p><strong>1 dag € 25 · 2 dagen € 45 · 3 dagen € 60 · 4 dagen € 75 · 5 dagen € 90 · 6 dagen € 100 · 7 dagen € 110</strong> per fiets.</p><p>Ophalen vanaf 10.00 uur, terugbrengen uiterlijk 18.00 uur. Bij eerder terugbrengen geldt de volledige huur. De oplader zit in de gratis fietstas. Het zadel verstel je met de snelspanner.</p>`;

function rentalVehicleDetails(id) {
  switch (id) {
    case 1:
      return `<section>
    <h3>Met de TukTuk door Ootmarsum</h3>
    <p>Start de motor en je hoort meteen waar de TukTuk zijn naam aan dankt. Jullie rijden zelf een uitgezette route door het Twentse landschap. Onderweg kun je de rit combineren met een picknick of teamspel. De TukTuk heeft drie zitplaatsen en is het hele jaar te huur.</p>
    <p>TwenteToer verhuurt één TukTuk. Ga je met een grotere groep? Bekijk dan de <a class="textlink" href="/toer/voertuigen/?voertuig=3">Topolino</a> of combineer de rit met een <a class="textlink" href="/toer/voertuigen/?voertuig=2">E-Chopper</a>.</p>
  </section>
  <section>
    <h3>Op pad met kinderen</h3>
    <p>Neem zelf een kinderzitje mee als je dat nodig hebt. De TukTuk heeft geen Isofix. In de gratis TwenteToer-app vind je routes langs bijvoorbeeld een kinderboerderij, sterrenwacht of speeltuin.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Kosten en informatie</h3>
    <p>Per TukTuk betaal je <strong>€ 50 voor 1 uur</strong> of <strong>€ 75 voor 2 uur</strong>. Btw en WA-verzekering zijn inbegrepen.</p>
    <ul>
      <li>De bestuurder is minimaal 24 jaar, heeft motorrijbewijs A of A1 en ervaring op een motorfiets. Voor vertrek rijdt de bestuurder een proefronde.</li>
      <li>Maximaal drie personen. Huisdieren zijn niet toegestaan.</li>
      <li>Ophalen en vertrekken in Ootmarsum. TwenteToer bezorgt het voertuig niet.</li>
    </ul>
  </section>`;
    case 4:
      return `<section>
    <h3>Op pad met de Cooper</h3>
    <p>Verken Ootmarsum en omgeving op een elektrische scooter met brede banden en een opvallend uiterlijk. De stille motor past bij een ontspannen tocht langs bos, glooiende weilanden en het centrum van Ootmarsum.</p>
    <p>De Cooper is een optie voor een rit met vrienden, een teamuitje of een dagje samen. De voertuigpagina noemt een prijs van <strong>€ 45</strong>.</p>
  </section>`;
    case 6:
      return `<section>
    <h3>Twente verkennen met de Lambretta</h3>
    <p>Op deze Italiaanse scooter rijd je met maximaal 45 km/u door Twentse dorpen en landelijk gebied. Met een halve of hele dag huur heb je tijd voor een terrasstop of een rit over de Duitse grens.</p>
  </section>
  <section>
    <h3>De mooiste routes</h3>
    <p>Volg een route uit de gratis TwenteToer-app, kies een knooppuntenroute of stel zelf een tocht samen. Plan onderweg tijd in voor koffie, een foto of iets lekkers uit de streek.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Stijlvol en veilig</h3>
    <p>De scooter biedt plaats aan twee personen. De bestuurder moet rijervaring hebben en maakt vooraf een proefronde. Een helm is verplicht en de passagier moet minimaal 12 jaar zijn.</p>
  </section>
  <section>
    <h3>Kosten en informatie</h3>
    <p><strong>4 uur € 40 · 8 uur € 75</strong> per Lambretta. De passagier rijdt gratis mee. Btw en WA-verzekering zijn inbegrepen.</p>
    <p>Je krijgt de scooter met een volle tank en levert hem weer vol in. Tanken kan met E5 of E10.</p>
  </section>`;
    case 7:
      return `<section>
    <h3>Met de Goccia op pad</h3>
    <p>Door zijn retro-uitstraling noemen ze deze elektrische brommer in Twente ook wel de E-Puch. Hij rijdt stil en biedt plaats aan een volwassene en een passagier tot ongeveer 14 jaar.</p>
  </section>
  <section>
    <h3>Toer een mooie route</h3>
    <p>Rijd bijvoorbeeld naar Denekamp, het Lutterzand of het Stift in Weerselo. Download de gratis app, zet je telefoon in de stuurhouder en volg de route. De actieradius is ongeveer 60 km en neemt af met een passagier.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Goccia met kinderen</h3>
    <p>De Goccia weegt maximaal 55 kg en is wendbaar. Achterop zitten een zadel met handvat en voetsteunen. Een kind moet zich zelf kunnen vasthouden. De kleinste helmmaat is S.</p>
    <p>Voor 11- tot 16-jarigen zonder rijbewijs noemt TwenteToer de Beachcruiser, Fatbike en Fatmax als alternatieven.</p>
  </section>
  <section>
    <h3>Kosten en informatie</h3>
    <p><strong>2 uur € 30 · 3 uur € 35 · 4 uur € 40</strong> per Goccia. Een passagier rijdt gratis mee.</p>
    <p>Een geldig (bromfiets)rijbewijs en een helm zijn verplicht. Een haarnetje is inbegrepen en TwenteToer biedt hulp onderweg.</p>
  </section>`;
    case 8:
      return `<section>
    <h3>Scooter huren in Ootmarsum</h3>
    <p>Met de Euro 5-scooter rijd je 25 km/u over de landwegen rond Ootmarsum. Er is plek voor twee personen. Je passagier rijdt gratis mee en helm en haarnetje zijn inbegrepen.</p>
  </section>
  <section>
    <h3>Scootertoer door Twente</h3>
    <p>Rijd door het centrum van Ootmarsum of maak een rondje langs Denekamp, Singraven en het Lutterzand. Met een volle tank kun je ongeveer 125 km rijden.</p>
  </section>
  <section>
    <h3>Op pad met kinderen</h3>
    <p>Stop onderweg bij een speeltuin of boerderij. Voor oudere kinderen kun je de Fatbike bekijken. Daarvoor geldt een minimumlengte van 155 cm. Een kinderzitje is op deze scooter niet mogelijk. Bekijk daarvoor de <a class="textlink" href="/toer/voertuigen/?voertuig=7">Goccia E-Puch</a>.</p>
  </section>
  <section>
    <h3>Een hele dag toeren</h3>
    <p>Daghuur kost € 47,50. Ophalen kan vanaf 10.00 uur, ook later op de dag. Lever de scooter om 17.00 uur weer in met een volle tank Euro 98.</p>
  </section>
  <section>
    <h3>Kosten en informatie</h3>
    <p><strong>2 uur € 30 · 3 uur € 35 · 4 uur € 40 · daghuur € 47,50</strong> per scooter.</p>
    <p>Een geldig (bromfiets)rijbewijs is verplicht. Btw en WA-verzekering zijn inbegrepen. Brandstof is inbegrepen bij de huur per uur.</p>
  </section>`;
    case 9:
      return `<section>
    <h3>Op pad met de Fatmax E-Kickbike</h3>
    <p>Met deze elektrische step op brede banden rijd je tot 25 km/u door Ootmarsum en de natuur eromheen. Na uitleg en een proefronde kun je op pad met vrienden, familie of collega’s.</p>
  </section>
  <section>
    <h3>Vanaf 16 jaar</h3>
    <p>Voor de Fatmax geldt volgens TwenteToer een minimumleeftijd van 16 jaar. Een rijbewijs is niet nodig. Je kunt een rit combineren met de E-Chopper. Voor wie jonger is, noemt TwenteToer de Fatbike als alternatief.</p>
  </section>
  <section>
    <h3>Routes in de app</h3>
    <p>Kies in de gratis TwenteToer-app een route die past bij de actieradius van de accu. Onderweg kun je stoppen bij een café of restaurant of een bezienswaardigheid bekijken, zoals Huis Singraven.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Kosten en informatie</h3>
    <p><strong>1 uur € 25 · 2 uur € 30 · 3 uur € 35</strong> per Fatmax. De actieradius is maximaal 30 km. Neem een rugtas mee voor bagage. Btw en WA-verzekering zijn inbegrepen. Je vertrekt vanuit Ootmarsum en krijgt hulp onderweg. Bij slecht weer kun je gratis verplaatsen.</p>
  </section>
  <section>
    <h3>Combineer de rit</h3>
    <p>Ga met een gids op pad, neem een smikkeltas mee of sluit af met barbecue, buffet of high tea. TwenteToer biedt ook een combinatie met een escapebox aan.</p>
  </section>`;
    case 10:
      return `<section>
    <h3>Op pad met de Fatbike</h3>
    <p>De elektrische Fatbike heeft brede banden en krachtige trapondersteuning. Rijd over de zandwegen van het Springendal, langs de bronvijvers en heide, of richting Singraven en Bad Bentheim. De fiets haalt volgens TwenteToer ongeveer 24 km/u en je hebt geen rijbewijs nodig.</p>
  </section>
  <section>
    <h3>Samen met kinderen</h3>
    <p>Het kleine frame is verstelbaar. Voor de huur geldt een minimumlengte van 155 cm, zoals vermeld bij de voorwaarden. Iedereen rijdt op een eigen Fatbike.</p>
  </section>
  <section>
    <h3>Kosten en informatie</h3>
    <p><strong>2 uur € 25 · 3 uur € 30 · 4 uur € 35</strong> per Fatbike. De actieradius is maximaal 50 km en de motor heeft 250 watt. TwenteToer heeft twee modellen en wijst er bij de verhuur één toe. Bij slecht weer kun je gratis verplaatsen. Gratis routes staan in de app.</p>
    ${routeAppLinks}
  </section>`;
    case 11:
      return `<section>
    <h3>Op pad met de Beachcruiser</h3>
    <p>De elektrische Beachcruiser combineert een retroframe met brede banden en trapondersteuning. Fiets over bospaden en zandwegen rond Ootmarsum en Vasse, of kies een tocht richting Denekamp of de Duitse grens.</p>
  </section>
  <section>
    <h3>Ook voor kinderen</h3>
    <p>Een rijbewijs is niet nodig. De Beachcruiser is geschikt vanaf 160 cm. Ouders kunnen de tocht bijvoorbeeld combineren met een E-Chopper. De gratis TwenteToer-app bevat fietsroutes voor onderweg.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Kosten en informatie</h3>
    <p><strong>2 uur € 30 · 3 uur € 35</strong> per Beachcruiser. De actieradius is ongeveer 35 km. Er is plek voor één persoon en een kinderzitje is niet mogelijk. Neem een rugtas mee voor bagage. Ophalen en vertrekken doe je in Ootmarsum.</p>
  </section>`;
    case 12:
      return `<section>
    <h3>Fietsverhuur in Ootmarsum</h3>
    <p>Verken het Springendal tussen Ootmarsum en Vasse, fiets naar Singraven bij Denekamp of steek de grens over richting Bad Bentheim. De elektrische fiets wordt goed onderhouden en heeft een stuurhouder voor je telefoon.</p>
  </section>
  <section>
    <h3>Routes en service</h3>
    <p>Kies een gratis route in de TwenteToer-app. Bij een lekke band of ander technisch probleem probeert TwenteToer zo snel mogelijk een vervangende fiets te brengen.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Kosten en informatie</h3>
    <p>Geschikt voor een lengte van ongeveer 1,45 tot en met 1,90 m. De actieradius is ongeveer 80 km.</p>
    ${eBikeRentalInfo}
  </section>`;
    case 13:
      return `<section>
    <h3>Elektrische fiets met groot frame</h3>
    <p>Met de grote e-bike fiets je naar de Kuiperberg, door het Springendal of richting Denekamp. Bij helder weer kijk je vanaf de Kuiperberg uit richting Enschede, Hengelo, Almelo en Lingen.</p>
  </section>
  <section>
    <h3>Routes en service</h3>
    <p>Kies een gratis route in de TwenteToer-app of volg je eigen knooppuntenroute. Bij pech probeert TwenteToer zo snel mogelijk vervangend vervoer te regelen.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Kosten en informatie</h3>
    <p>Geschikt vanaf 1,80 m. De actieradius is ongeveer 70 km.</p>
    ${eBikeRentalInfo}
  </section>`;
    case 14:
      return `<section>
    <h3>Op pad met de E-Mountainbike</h3>
    <p>Verken de natuur rond Ootmarsum op een elektrische mountainbike met middenmotor en een actieradius van ongeveer 70 km. De trapondersteuning helpt op heuvels en zandpaden.</p>
  </section>
  <section>
    <h3>Offroad in Twente</h3>
    <p>Fiets langs de bossen en heide van het Springendal of kies een mountainbikeroute in het grensgebied met Duitsland. In het Springendal zijn routes van verschillende afstanden uitgezet.</p>
  </section>
  <section>
    <h3>Kies je route</h3>
    <p>De middenmotor biedt ondersteuning voor zowel recreatieve als ervaren mountainbikers. Download de gratis TwenteToer-app voor extra route-ideeën.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Huurprijs</h3>
    <p>Op de voertuigpagina staat een prijs van <strong>€ 25</strong>.</p>
  </section>`;
    case 15:
      return `<section>
    <h3>Stadsfiets in Ootmarsum</h3>
    <p>De stadsfiets heeft zeven versnellingen en wordt geleverd met een fietstas. TwenteToer biedt service onderweg. Op de voertuigpagina staat een prijs van <strong>€ 13,50</strong>.</p>
  </section>`;
    case 16:
      return `<section>
    <h3>Op pad met de elektrische bakfiets</h3>
    <p>Fiets met de kinderen naar het Springendal of richting Singraven bij Denekamp. De bak is ook handig voor boodschappen. De actieradius is ongeveer 50 km. Huisdieren mogen niet mee in de bak.</p>
  </section>
  <section>
    <h3>Eropuit met kinderen</h3>
    <p>De middenmotor geeft ondersteuning zodra je begint te trappen, ook met een volle bak. De bakfiets ligt stabiel op de weg en TwenteToer vermeldt een belastbaar gewicht van 220 kg. De rest van het gezin kan meefietsen op een gewone e-bike.</p>
  </section>
  <section>
    <h3>Kosten en informatie</h3>
    <p><strong>1 dag € 37,50 · 2 dagen € 62,50 · 3 dagen € 90 · 7 dagen € 155</strong> per bakfiets. Je haalt de fiets op in Ootmarsum. TwenteToer biedt routes in de app en service onderweg.</p>
    ${routeAppLinks}
  </section>`;
    default:
      return '';
  }
}

function dafDetails(id) {
  if (id !== 21) return '';
  return `<section>
    <h3>Met de DAF YA 126 op pad</h3>
    <p>Stap met vrienden, familie of collega’s achterin een originele Nederlandse legertruck uit de jaren vijftig. Jullie kunnen de rit rond Ootmarsum combineren met een dropping, escapegame of wandeling. Ook voor een kinderfeestje of een groep met eigen wensen kan TwenteToer een voorstel maken.</p>
  </section>
  <section>
    <h3>Kosten en informatie</h3>
    <p><strong>€ 225 per uur per truck, inclusief btw</strong>. De truck rijdt altijd met chauffeur. De rit is voor 6 tot 14 personen per truck en blijft in de omgeving van Ootmarsum. De vertrektijd spreek je af met TwenteToer.</p>
  </section>
  <section>
    <h3 id="daf-gallery-title">Foto-impressie legertrucks</h3>
    <div class="grid vehicle-photo-grid" data-photo-gallery>
      <a class="card" href="/toer/thema/assets/leger-truck-1.jpg"><img class="card-photo" src="/toer/thema/assets/leger-truck-1.jpg" alt="Foto-impressie legertrucks 1" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/leger-truck-2.jpg"><img class="card-photo" src="/toer/thema/assets/leger-truck-2.jpg" alt="Foto-impressie legertrucks 2" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/leger-truck-3.jpg"><img class="card-photo" src="/toer/thema/assets/leger-truck-3.jpg" alt="Foto-impressie legertrucks 3" loading="lazy"></a>
    </div>
    <dialog class="buggy-lightbox" aria-labelledby="daf-gallery-title">
      <form method="dialog"><button class="close" aria-label="Sluiten">×</button></form>
      <img alt="">
      <div class="buggy-lightbox-controls">
        <button type="button" data-gallery-step="-1" aria-label="Vorige foto">←</button>
        <span aria-live="polite"></span>
        <button type="button" data-gallery-step="1" aria-label="Volgende foto">→</button>
      </div>
    </dialog>
  </section>`;
}

function buggyDetails(id) {
  if (id !== 5) return '';
  return `<section>
    <h3>Een uur off-road in Ootmarsum</h3>
    <p>Na de uitleg starten jullie zelf de motor en volgen jullie de gids op een vaste route. Waar het mag, rijden jullie over zandwegen door het bos. Het tempo past bij de groep. Halverwege kun je van bestuurder wisselen.</p>
    <ul>
      <li>De gids rijdt voorop. Inhalen is verboden. Op de openbare weg gelden de gewone verkeersregels.</li>
      <li>Trek kleding aan die vies mag worden. TwenteToer leent stofbrillen uit en raadt een stofmasker aan. Overalls zijn niet beschikbaar.</li>
    </ul>
  </section>
  <section>
        <h3>Kosten en informatie</h3><p><strong>€ 60 per persoon voor een uur rijden. Voor kinderen geldt hetzelfde tarief.</strong></p>
        <ul><li>Minimaal 6 deelnemers of een minimumbedrag van € 360.</li><li>Maximaal 10 deelnemers per groep.</li><li>Bestuurders zijn minimaal 20 jaar en hebben een autorijbewijs. Kinderen kunnen mee vanaf 5 jaar.</li><li>De rit vertrekt vanuit Ootmarsum. TwenteToer bezorgt de buggy’s niet.</li></ul>
      </section>
  <section><h3>Met meer dan 10 personen?</h3><p>TwenteToer biedt voor grotere groepen een combinatie van twee uur aan. Met 18 personen rijdt bijvoorbeeld de ene helft eerst buggy en de andere helft E-Chopper. Na een uur wisselen jullie van voertuig. De prijs per persoon blijft gelijk.</p><a class="textlink" href="/toer/contact/">Stem jullie groepsuitje af</a></section>
  <section>
    <h3 id="buggy-gallery-title">Foto-impressie</h3>
    <div class="grid vehicle-photo-grid" data-photo-gallery>
      <a class="card" href="/toer/thema/assets/buggy-rit-3.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-3.jpg" alt="Buggyrit in Ootmarsum, foto 3" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-1.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-1.jpg" alt="Buggyrit in Ootmarsum, foto 1" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-9.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-9.jpg" alt="Buggyrit in Ootmarsum, foto 9" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-2.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-2.jpg" alt="Buggyrit in Ootmarsum, foto 2" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-10.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-10.jpg" alt="Buggyrit in Ootmarsum, foto 10" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-6.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-6.jpg" alt="Buggyrit in Ootmarsum, foto 6" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-7.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-7.jpg" alt="Buggyrit in Ootmarsum, foto 7" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-5.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-5.jpg" alt="Buggyrit in Ootmarsum, foto 5" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-11.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-11.jpg" alt="Buggyrit in Ootmarsum, foto 11" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-4.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-4.jpg" alt="Buggyrit in Ootmarsum, foto 4" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-8.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-8.jpg" alt="Buggyrit in Ootmarsum, foto 8" loading="lazy"></a>
    </div>
    <dialog class="buggy-lightbox" aria-labelledby="buggy-gallery-title">
        <form method="dialog"><button class="close" aria-label="Sluiten">×</button></form>
        <img alt="">
        <div class="buggy-lightbox-controls">
          <button type="button" data-gallery-step="-1" aria-label="Vorige foto">←</button>
          <span aria-live="polite"></span>
          <button type="button" data-gallery-step="1" aria-label="Volgende foto">→</button>
        </div>
      </dialog>
  </section>
  <section>
    <h3>Combineer je buggyrit</h3>
    <ul>
      <li><a class="textlink" href="https://www.twentetoer.nl/voertuigen/buggy_barbecue_ootmarsum/">Buggy en BBQ All-in</a> · Na de rit barbecue, softijs en 2,5 uur drankjes. Vanaf € 110.</li>
      <li><a class="textlink" href="https://www.twentetoer.nl/voertuigen/buggy-en-boogschieten/">Buggy en Boogschieten</a> · Een buggyrit gevolgd door boogschieten, met twee consumpties. Vanaf € 80.</li>
      <li><a class="textlink" href="https://www.twentetoer.nl/voertuigen/vakantie-buggy-toer/">Vakantie Buggy Toer</a> · Een rit voor het gezin op geselecteerde dagen in de schoolvakantie. Vanaf € 35.</li>
    </ul>
  </section>`;
}

function piaggioDetails(id) {
  if (id === 19) {
    return `<section>
    <h3>Originele Piaggio Ape voor evenementen</h3>
    <p>TwenteToer verhuurt verschillende originele modellen van de Italiaanse driewieler. Gebruik de Ape als foodtruck, verkoopwagen, reclamewagen of blikvanger op een beurs. Ook voor catering op locatie kun je hem inzetten.</p>
    <h3>Huurprijs en bezorging</h3>
    <p><strong>Vanaf € 175 per dag.</strong> Bezorging op locatie is in overleg mogelijk in heel Europa. Je kunt ook overleggen over reclame voor je eigen bedrijf op de wagen. Wil je een rit maken, dan kun je een <a class="textlink" href="/toer/voertuigen/?voertuig=1">TukTuk</a> huren.</p>
  </section>
  ${vehiclePhotoGallery('Piaggio Ape Classic', ['ape-classic-impressie-1.jpg', 'ape-classic-impressie-2.jpg', 'ape-classic-impressie-3.jpg', 'ape-classic-impressie-4.jpg', 'ape-classic-impressie-5.jpg', 'ape-classic-impressie-6.jpg'])}`;
  }
  if (id === 20) {
    return `<section>
    <h3>Een mobiele keuken voor je feest</h3>
    <p>De zijkleppen van de Piaggio Ape Fly gaan open, zodat je vanaf de wagen kunt serveren. Zet hem neer op een feest of klein festival en schenk champagne of serveer warme pizza en wafels.</p>
    <h3>Uitrusting en huuraanvraag</h3>
    <ul>
      <li>Ledverlichting in het dak en een 230V-stroomaansluiting.</li>
      <li>Een koelkast en een warmhoudbak in formaat GN 1/1.</li>
      <li>Meerdere lades, waarvan één op slot kan voor bijvoorbeeld de kassa.</li>
    </ul>
    <p><strong>€ 400.</strong> De details stem je bij je aanvraag af met TwenteToer.</p>
  </section>
  ${vehiclePhotoGallery('Piaggio Ape Keuken', ['ape-keuken-impressie-1.jpg', 'item-20.jpg'])}`;
  }
  return '';
}

function dikkeDafDetails(id) {
  if (id !== 22) return '';
  return `<section>
    <h3>Achterin de DAF YA 328</h3>
    <p>Deze originele legertruck uit 1955 neemt jullie met chauffeur mee rond Ootmarsum. De tocht van drie uur gaat door het Springendal en langs de Duitse grens, over verharde en onverharde wegen. Op onverharde stukken komt de 6×6-aandrijving goed van pas.</p>
  </section>
  <section>
    <h3>Grensverhalen en stops onderweg</h3>
    <p>Het Springendal was vroeger smokkelgebied. Onderweg is er tijd om stil te staan bij die geschiedenis. TwenteToer plant ongeveer twee stops, met hapjes en drankjes. Waar mogelijk kun je een uitkijktoren beklimmen. Bij de drankjes hoort ook een Twentse borrel, de fusel.</p>
  </section>
  <section>
    <h3>Kosten en informatie</h3>
    <p><strong>€ 500 per truck</strong>, inclusief chauffeur, tapashapjes en drankjes. Er is plaats voor maximaal 12 personen per truck. Voor een kleinere groep blijft de prijs per truck gelijk. Voor grotere groepen zijn meerdere trucks beschikbaar.</p>
  </section>
  ${vehiclePhotoGallery('Dikke Daf Toer', ['dikke-daf-impressie-1.jpg', 'dikke-daf-impressie-2.jpg', 'item-22.jpg'])}`;
}


const activityDetails = {
  24: {
    sections: [
      ["Op de roos", "Na de uitleg schieten jullie met professionele bogen op doel. Speel individueel of in twee teams en tel de punten. Er zijn bogen voor links- en rechtshandigen."],
      ["Kosten en informatie", "€ 20 per persoon, inclusief twee consumpties, chips en nootjes. Reken op ongeveer één uur. Van maart tot en met oktober, op twee overdekte banen. Vanaf 12 jaar. Bij minder dan vijf deelnemers geldt € 100 voor de groep."],
    ],
    images: ["item-24.jpg", "boogschieten-impressie.jpg"],
  },
  25: {
    sections: [
      ["Het raadsel van het gestolen goud", "In ons café-restaurant onderzoeken jullie de kist van smokkelaar Wim Pietersen. Los samen de puzzels op of laat meerdere teams tegen elkaar spelen."],
      ["Kosten en informatie", "€ 39,95 per persoon. Reken op anderhalf uur, met drankjes, chips en nootjes inbegrepen. Vijf tot acht deelnemers per box. Het hele jaar door te boeken. Eten of een rit kan erbij."],
    ],
    images: ["item-25.jpg", "escapebox-impressie-1.jpg", "escapebox-impressie-2.jpeg"],
  },
  26: {
    sections: [
      ["Van Ootmarsum naar de golfbaan", "Rijd in ongeveer drie kwartier naar Tubbergen. Daar krijgen jullie uitleg en spelen jullie op een baan met negen holes en achttien afslagpunten. Er zijn kinderclubs en een binnen- en buitenspeeltuin. Na het golfen is er tijd voor het terras en de terugrit."],
      ["Kosten en informatie", "€ 17,50 per persoon inclusief koffie, thee of een drankje aan de bar. Huur voor drie uur een voertuig, apart te betalen. De Trike is uitgesloten. Reken voor het hele uitje op ongeveer vier uur."],
    ],
    images: ["item-26.jpg", "golfen-impressie-2.jpg", "golfen-impressie-3.jpg"],
  },
  27: {
    sections: [
      ["Kloatscheet’n op z’n Twents", "Na een korte uitleg wandelen jullie met de bolderkar naar de baan. Twee teams gooien om beurten onderhands met een verzwaarde bal. Het team dat met de minste worpen de route aflegt, wint."],
      ["De bolderkar", "Onderweg hebben jullie bier, fris, wijn, kaas en worst bij de hand. Verbind je telefoon met de muziekbox in de kar. Geef bijzondere wensen vooraf door."],
      ["Kosten en informatie", "€ 140 per kar, met hapjes en drankjes voor tien personen en twee klootballen. Voor een kleinere groep geldt dezelfde karprijs. Bij grotere groepen kun je een kar bijboeken. Reken op 2,5 uur, waarvan ongeveer 1,5 uur spelen."],
    ],
    images: ["item-27.jpg", "bolderkar-impressie.jpg"],
  },
  28: {
    sections: [
      ["Met de Dikke Daf naar de grens", "Na de uitleg in het café-restaurant brengt de DAF YA 328 jullie naar een plek in Duitsland. Met een kompas en smokkelkaart vinden jullie via oude smokkelroutes rond het Springendal de weg terug naar Ootmarsum. Onderweg kraken jullie de code van de munitiekist en wacht een snack met een Twents kruidenbittertje."],
      ["Kosten en informatie", "€ 25 per persoon, met een minimum van € 250 per groep, inclusief rit en tussendoortje. Ongeveer 3,5 uur en minstens 7 km wandelen. Ook ’s avonds mogelijk. Draag wandelschoenen. Geschikt voor volwassenen en oudere kinderen. De route is ongeschikt voor huisdieren, rollators, rolstoelen en kinderwagens."],
    ],
    images: ["item-28.jpg", "dropping-truck.jpg", "dropping-loopgroep.jpg", "dropping-smokkelkaart.jpg", "dropping-springendal.jpg"],
  },
  29: {
    sections: [
      ["Mikken op de kermisdoelen", "Schiet op sterretjes, roosjes en andere doelen. Voor een familie- of bedrijfsuitje kun je er een puntenwedstrijd van maken. Tussendoor is er tijd voor een drankje in de lounge."],
      ["Kosten en informatie", "€ 20 per persoon inclusief twee consumpties, chips en nootjes. Bij minder dan vijf deelnemers geldt € 100 per groep. Ongeveer één uur, van maart tot en met oktober, op twee overdekte banen. Vanaf 16 jaar. Minderjarigen doen mee onder begeleiding van een volwassene."],
    ],
    images: ["item-29.jpg", "kermisbuks-impressie.jpg"],
  },
  30: {
    sections: [
      ["Verover de vlag", "Rijd vanuit Ootmarsum met een voertuig van TwenteToer naar onze partner. Na de uitleg spelen jullie twee rondes van ongeveer 15 tot 20 minuten per deelnemer. Tussen de rondes bekijk je de score en is er tijd voor pauze."],
      ["Kosten en informatie", "Kies E-Chopper met lasergame voor € 55 per persoon of Topolino met lasergame voor € 65 per persoon. Het arrangement duurt ongeveer drie uur inclusief heen- en terugrit. Vanaf acht deelnemers. Neem zelf wat te drinken mee voor de pauze."],
    ],
    images: ["item-30.jpg", "lasergame-impressie-1.jpg", "lasergame-impressie-2.jpeg", "lasergame-impressie-3.jpg"],
  },
  31: {
    sections: [
      ["Scan, speur en scoor", "Ieder team krijgt een eigen route door Ootmarsum en omgeving. Zoek onderweg de QR-codes, beantwoord de vragen en verdien punten. Per team heb je één telefoon nodig die QR-codes kan scannen."],
      ["Kosten en informatie", "€ 5 per persoon voor het spel, plus twee uur voertuigverhuur. Het uitje duurt ongeveer twee uur. Consumpties onderweg zijn voor eigen rekening. Op zondag is het centrum autovrij en valt de TukTuk af."],
    ],
    images: ["item-31.jpg", "qr-kuiperberg.jpg"],
  },
  32: {
    sections: [
      ["Spelletjes voor elk team", "Ga in teams langs de spellen en verdien punten met onder meer darten, cornhole, ringwerpen, sjoelen, kubb en boogschieten. Jullie spelen binnen en buiten. Bij slecht weer kan het parcours volledig overdekt."],
      ["Kosten en informatie", "€ 25 per persoon voor ongeveer twee uur. Op aanvraag uit te breiden met een voertuig, BBQ of buffet, borrelhapjes of een all-in drankarrangement."],
    ],
    images: ["item-32.jpg", "spelletjesmarkt-darten.jpeg", "spelletjesmarkt-boogschieten.jpg"],
  },
  33: {
    sections: [
      ["Op zoek naar de verborgen sleutel", "Vanuit het café-restaurant wandelen jullie door het historische centrum. Gevels en straatjes geven aanwijzingen. Bij iedere opgeloste opdracht verdienen jullie een letter. Samen vormen die de sleutel van Ootmarsum."],
      ["Kosten en informatie", "€ 10 per persoon en ongeveer twee uur onderweg. De wandelroute is toegankelijk met een rolstoel of kinderwagen. Na afloop kun je de uitkomst bespreken in het café. Consumpties zijn voor eigen rekening."],
    ],
    images: ["item-33.jpg", "sleutel-centrum.jpg", "sleutel-cafe.jpeg", "sleutel-speurtocht.jpg"],
  },
  34: {
    sections: [
      ["Van brouwketel tot proefglas", "Bij Othmar Bier in Ootmarsum zie je hoe ze op traditionele wijze bier brouwen. De gids neemt jullie mee door het hele proces. Na afloop kunnen jullie bij TwenteToer aanschuiven voor een BBQ of buffet."],
      ["Kosten en informatie", "€ 19 per persoon. De rondleiding duurt één uur en is voor groepen vanaf tien personen. Tot en met dertig deelnemers krijg je twee proefbieren per persoon. Grotere groepen krijgen één pul speciaalbier per persoon. Op maandag is de brouwerij gesloten."],
    ],
    images: ["item-34.jpg", "brouwerij-impressie-1.jpg", "brouwerij-impressie-2.jpg", "brouwerij-impressie-3.jpg"],
  },
  35: {
    sections: [
      ["Op het erf bij boer Dennis", "Bij Erfgoed Bossem in Lattrop vertelt boer Dennis over het dagelijks leven op de boerderij. Bekijk de Brandrode runderen en de trekker. Na de rondleiding kun je iets drinken in het restaurant of op het terras."],
      ["Kosten en informatie", "€ 7,50 per persoon. De rondleiding duurt 45 minuten en is voor groepen vanaf tien personen. Lattrop ligt op ongeveer tien minuten rijden van Ootmarsum. Plan je dit bezoek als tussenstop tijdens jullie toer, dan geldt minimaal drie uur voertuigverhuur."],
    ],
    images: ["item-35.jpg", "boerderij-impressie.jpeg"],
  },
  36: {
    sections: [
      ["Twente van honderd jaar geleden", "Wandel met een audiotour door het Openluchtmuseum Ootmarsum. Bekijk ingerichte Saksische boerderijen, een smidse en andere werkplaatsen. Je komt ook te weten wie het vroeger voor het zeggen hadden. In het museumpark zijn dieren en een terras aan het water."],
      ["Kosten en informatie", "€ 8 per persoon. Reken op ongeveer anderhalf uur. Een rondleider kost € 30 extra per groep. Geef die wens door bij het reserveren. Er is geen minimumaantal deelnemers."],
    ],
    images: ["item-36.jpg", "heeren-los-hoes.jpg", "heeren-smidse.jpg", "heeren-museumpark.jpg"],
  },
  37: {
    sections: [
      ["Onder de sterrenhemel", "In het planetarium van de COSMOS Sterrenwacht vertelt de gids over sterrenbeelden, de maan en planeten. Daarna bekijken jullie de telescoop in de koepel. Wat je ermee kunt zien, hangt af van het weer."],
      ["Kosten en informatie", "€ 10 per persoon voor een rondleiding van één uur. De sterrenwacht ligt op ongeveer vijf autominuten van TwenteToer. Stoppen jullie er tijdens een rit, dan komt er één uur voertuigverhuur bij."],
    ],
    images: ["item-37.jpg", "sterrenwacht-telescoop.jpg", "sterrenwacht-cosmos.jpg", "sterrenwacht-impressie.jpg"],
  },
  38: {
    sections: [
      ["Van Twents eikenhout tot whisky", "Bij Stokerij Sculte in het oude klooster van Ootmarsum ontdek je hoe ze whisky en fruitdistillaten maken. Je hoort over de regionale ingrediënten, het bronwater en de eigen eiken vaten. Tijdens de rondleiding kies je één proefglaasje."],
      ["Kosten en informatie", "€ 17,50 per persoon voor ongeveer 45 minuten, vanaf zes personen. Koop je na afloop een fles in de stokerij, dan krijg je € 10 korting."],
    ],
    images: ["item-38.jpg", "stokerij-impressie-1.jpg", "stokerij-impressie-2.jpg", "stokerij-impressie-3.jpg", "stokerij-impressie-4.jpg", "stokerij-impressie-5.jpg"],
  },
  39: {
    sections: [
      ["Proeven bij boer Dennis", "Rijd via een mooie route naar Erfgoed Bossem in Lattrop. Daar proef je droge worst, een beefburger en pastrami van Brandrode runderen. Na afloop rijd je in ongeveer een halfuur terug naar TwenteToer."],
      ["Kosten en informatie", "€ 15 per persoon voor de proeverij van ongeveer één uur. Drankjes reken je op de boerderij af. Combineer het bezoek met een voertuigrit."],
    ],
    images: ["item-39.jpg", "boerderij-erf.jpg", "boerderij-impressie.jpeg"],
  },
  40: {
    sections: [
      ["Zeven wijnen bij Heisterkamp", "Bij Heisterkamp Wijnkopers krijgen jullie een rondleiding en uitleg over wijnproeven. Proef drie witte wijnen, drie rode wijnen en één dessertwijn, met boerenbrood, olijfolie, kaas en worst. Een favoriete wijn kun je meenemen naar huis."],
      ["Kosten en informatie", "€ 30 per persoon voor ongeveer twee uur. Maximaal 25 deelnemers. Met minder dan twaalf deelnemers kan ook, tegen betaling voor twaalf personen."],
    ],
    images: ["item-40.jpg", "wijnproeverij-heisterkamp.jpg", "wijnproeverij-impressie.jpg"],
  },
  41: {
    sections: [
      ["Met de Dikke Daf naar het bos", "Een rit van ongeveer twintig minuten brengt jullie naar een originele militaire veldkeuken midden in het bos. Samen steken jullie het fornuis aan en bereiden jullie een voor-, hoofd- en nagerecht met ingrediënten die bij het seizoen passen."],
      ["Kosten en informatie", "€ 75 per persoon voor ongeveer vier uur, inclusief eten en drankjes. Vanaf 25 deelnemers of € 1.875 voor de groep. Er is bier, wijn en fris. In de winter is er ook glühwein of warme chocolademelk."],
    ],
    images: ["item-41.jpg", "veldkeuken-impressie-1.jpg", "veldkeuken-impressie-2.jpg", "veldkeuken-impressie-3.jpg", "veldkeuken-impressie-4.jpg"],
  },
  42: {
    sections: [
      ["Met een gids naar de bronvijvers", "Jullie vertrekken vanuit Ootmarsum en parkeren halverwege in het Springendal. De gids neemt jullie te voet mee langs de bronnen, de vijvers en het begin van de Springendalsebeek. Misschien spot je onderweg een beekprik."],
      ["Kosten en informatie", "€ 12,50 per persoon, plus twee uur voertuigverhuur. Het uitje duurt twee uur, met één uur rijden en één uur wandelen met de gids. Neem wandelschoenen mee."],
    ],
    images: ["item-42.jpg", "bronnen-Springendal_Vasse.jpg", "bronnen-bronvijver_springendal.jpg", "bronnen-gids_springendal.jpg", "bronnen-mariabeeld_springendal.jpg", "bronnen-springendal_beekje.jpg", "bronnen-springendal_nutter.jpg", "bronnen-springendal_vakwerk_huis.jpg"],
  },
  43: {
    sections: [
      ["Over de heide bij Hezingen", "Vanuit Ootmarsum rijden jullie naar het Springendal. Daar wandel je met de gids door de Paardenslenkte, een heidelandschap op de Nederlands-Duitse grens. Onderweg hoor je over de oude grenssteen en zie je misschien de schaapskudde."],
      ["Kosten en informatie", "€ 35 per persoon vanaf vijf deelnemers, inclusief E-Chopper, Fatmax of Fatbike. Reken op twee uur onder begeleiding, met één uur rijden en één uur wandelen. Neem wandelschoenen mee."],
    ],
    images: ["item-43.jpg", "bronnen-Springendal_Vasse.jpg", "chopper-gids-schapen.jpg", "bronnen-springendal_nutter.jpg"],
  },
  44: {
    sections: [
      ["Ootmarsum tijdens de Tweede Wereldoorlog", "Een plaatselijke gids vertelt over de bezetting en de bevrijding van Ootmarsum op 4 april 1945. Onderweg staan jullie stil bij het monument op het Bergplein, het Joods monument, Hotel Tubantia en de smokkelroutes bij de grens."],
      ["Kosten en informatie", "€ 12,50 per persoon inclusief btw. De tocht vindt plaats onder begeleiding van een gids."],
    ],
    images: ["item-44.jpg", "woii-ootmarsum.jpg", "woii-tubantia.jpg"],
  },
  45: {
    sections: [
      ["Door de steegjes van Ootmarsum", "Een gids uit Ootmarsum neemt jullie mee door het middeleeuwse stratenpatroon. Langs het oude stadhuis, de kerken en het klooster vertelt hij over de stad. Onderweg ontdek je oude waterputten en plekken waar vroeger de stadswallen lagen."],
      ["Kosten en informatie", "€ 12,50 per persoon, met een minimum van € 125 per groep. Reken op één tot anderhalf uur. Het hele jaar door te boeken."],
    ],
    images: ["item-45.jpg", "stadswandeling-straten.jpg", "stadswandeling-kerk.jpg", "stadswandeling-ton-schulten.jpg", "stadswandeling-museum.jpg", "stadswandeling-pasen.jpg"],
  },
  46: {
    sections: [
      ["Achter de gids aan op de E-Chopper", "Na de uitleg in Ootmarsum rijdt een plaatselijke gids voorop. Halverwege parkeren jullie in het Springendal voor een wandeling langs de beek, bronnen en vijvers. Geef het vooraf door als jullie rekening willen houden met minder goed begaanbare paden."],
      ["Kosten en informatie", "€ 37,50 per persoon inclusief E-Chopper en gids, ongeveer twee uur. Eén persoon per E-Chopper en een geldig rijbewijs is vereist. Neem stevige wandelschoenen mee."],
    ],
    images: ["item-46.jpg", "chopper-gids-toer.jpg", "chopper-gids-nutter.jpg", "bronnen-gids_springendal.jpg", "chopper-gids-schapen.jpg"],
  },
  47: {
    sections: [
      ["Vergaderen in ons restaurant", "Neem met jullie team plaats in een apart gedeelte van het restaurant. Jullie bepalen zelf de tijden. Er is wifi en een 65-inch HD-scherm. We openen dagelijks om 10.00 uur."],
      ["Lunchbuffet", "Na de vergadering staat er een buffet klaar met verschillende soorten broodbeleg, gebakken ei, kroket en fruit. Melk en jus d’orange zijn inbegrepen, net als onbeperkt koffie en thee."],
      ["Samen actief op pad", "Kies een rit met de E-Chopper, Topolino, Fatmax Kickbike of Retro Fatbike. Jullie kunnen ook kiezen voor boogschieten, luchtbuksschieten of een buggyrit. Voor de buggy geldt € 25 toeslag per persoon."],
      ["Kosten en informatie", "€ 72,50 per persoon. Vergaderen kan tot ongeveer 40 personen. Sluit de dag desgewenst af met een BBQ, buffet of pizzaworkshop."],
    ],
    images: ["item-47.jpg", "vergaderen-restaurant.jpeg", "vergaderen-lunch.jpg", "vergaderen-topolino.jpeg", "vergaderen-fatmax.jpg", "item-2.jpg"],
  },
  48: {
    sections: [
      ["10.30 uur · Ontvangst", "We verwelkomen jullie met Beukenhorst-koffie of thee en een plak Ootmarsumse krentenwegge."],
      ["11.00 uur · Stadswandeling met gids", "Een plaatselijke gids neemt jullie mee langs het oude stadhuis, de kerken, het klooster en de steegjes. Onderweg hoor je ook over de Ootmarsumse paasgebruiken."],
      ["12.30 uur · Lunch", "Schuif aan voor soep en een buffet met belegde broodjes. Bij mooi weer staat er buiten een foodtruck met broodjes kroket. Jus d’orange, melk, koffie en thee zijn inbegrepen."],
      ["13.30 uur · Twee uur toeren", "Kies een E-Chopper, Topolino, Fatmax, Retro Fatbike of Beachcruiser. Jullie rijden zelfstandig een route uit de gratis TwenteToer-app. Voor het gekozen voertuig gelden de bijbehorende leeftijds- en rijbewijseisen."],
      ["16.00 uur · BBQ met drankjes all-in", "Na de rit gaan jullie zelf aan de grill. Er zijn onder meer burgers, garnalenspiesen en kipdij, met een saladebuffet, stokbrood en sausjes. Drankjes met en zonder alcohol zijn inbegrepen."],
      ["18.00 uur · Einde van het programma", "€ 110 per persoon inclusief btw, voor groepen vanaf ongeveer 35 personen. Voor kleinere groepen kun je een programma op maat aanvragen. De tijden zijn indicatief en kunnen worden aangepast."],
    ],
    images: ["item-48.jpg", "dagje-wegge.jpg", "stadswandeling-straten.jpg", "dagje-lunch.jpg", "dagje-bbq.jpg", "dagje-veranda.jpg"],
  },
};

function renderActivityDetails(activity, name) {
  const sections = activity.sections.map(([title, description]) => `<section>
    <h3>${esc(title)}</h3>
    <p>${esc(description)}</p>
  </section>`).join('');
  return sections + vehiclePhotoGallery(esc(name), activity.images);
}

function detail(id){const activity=activityDetails[id];const p=items.find(x=>x.id===id);$('#detail').classList.toggle('drinks-detail',[52,76].includes(id));$('#detail-content').innerHTML=`<img class="detail-img" src="${photo(p)}" alt="${esc(p.name)}"><div class="detail-pad"><div class="eyebrow">${groupLabel[p.group]} · TwenteToer</div><h2>${esc(p.name)}</h2><p>${esc(p.description)}</p>${eChopperDetails(id)}${topolinoDetails(id)}${rentalVehicleDetails(id)}${dafDetails(id)}${buggyDetails(id)}${piaggioDetails(id)}${dikkeDafDetails(id)}${drinksMenu(id)}${activity ? renderActivityDetails(activity, p.name) : ''}${activity || [3, 5, 10, 19, 20, 21, 22].includes(id) ? '' : `<div class="price"><small>${[52,76].includes(id)?'Toeslag op het drankarrangement':'Vanafprijs'}</small><b>${p.price===null?'Op aanvraag':money(p.price)}</b></div>`}<div class="notice">De exacte prijs, duur, minimumdeelname, leeftijds- en rijbewijsvoorwaarden worden per activiteit bevestigd. Deze testsite controleert geen beschikbaarheid en maakt geen reservering.</div><div class="actions"><button class="cta green" data-add="${p.id}">${chosen.includes(p.id)?'Staat in Mijn toer':'Toevoegen aan Mijn toer'}</button><a class="cta light" href="/toer/mijn-toer/#aanbod">Mijn toer bekijken & Betalen</a></div></div>`;bind();bindPhotoGallery($('#detail-content'));$('#detail').showModal()}
function named(term){return items.find(p=>p.name.toLowerCase().includes(term.toLowerCase()))||items[0]}
const headerRides=[['Topolino','HET DOLCE VITA GEVOEL!','topolino'],['E-Chopper','ELEKTRISCH EN GENIETEN!','e-chopper'],['Buggy','AVONTUUR IN TWENTE!','buggy'],['E-Bike','BELEEF HET OP DE FIETS!','e-bike'],['Fatmax','ELEKTRISCH OP AVONTUUR!','fatmax']];
function photoHeader(){return `<section class="original-photo-header" aria-label="Ontdek TwenteToer"><div class="photo-slider" aria-roledescription="carrousel">${headerRides.map(([name,title,term],i)=>`<div class="photo-slide ${i===0?'active':''}" aria-hidden="${i!==0}"><img src="/toer/thema/assets/header-slide-${i+1}.jpg" alt="${name} rijden in Ootmarsum en omgeving" ${i?'loading="lazy"':'fetchpriority="high"'}><div class="photo-caption"><h2>${title}</h2></div></div>`).join('')}<div class="photo-controls"><div class="photo-dots">${headerRides.map(([name],i)=>`<button data-slide="${i}" aria-label="Toon foto ${name}" aria-pressed="${i===0}"><span></span></button>`).join('')}</div><button class="photo-pause" aria-label="Diavoorstelling pauzeren">Pauze</button></div></div><nav class="vehicle-brush-row" aria-label="Kies je voertuig">${headerRides.map(([name,title,term],i)=>`<a href="${term==='buggy'?'/toer/voertuigen/?voertuig=5':'/toer/voertuigen/?voertuig='+named(term).id}"><span class="brush-disc"><img src="/toer/thema/assets/header-icon-${i+1}.png" alt=""></span><strong>${name}</strong></a>`).join('')}</nav></section>`}
function initPhotoHeader(){let index=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches;const slides=[...document.querySelectorAll('.photo-slide')],dots=[...document.querySelectorAll('[data-slide]')],pause=document.querySelector('.photo-pause');const show=i=>{index=i;slides.forEach((s,n)=>{s.classList.toggle('active',n===i);s.setAttribute('aria-hidden',String(n!==i))});dots.forEach((d,n)=>d.setAttribute('aria-pressed',String(n===i)))};dots.forEach(d=>d.onclick=()=>show(Number(d.dataset.slide)));const label=()=>{pause.textContent=paused?'Afspelen':'Pauze';pause.setAttribute('aria-label',paused?'Diavoorstelling afspelen':'Diavoorstelling pauzeren')};pause.onclick=()=>{paused=!paused;label()};label();setInterval(()=>{if(!paused&&!document.hidden&&!document.querySelector('.photo-slider:hover')&&!document.querySelector('.photo-slider:focus-within'))show((index+1)%slides.length)},6000)}
function homeReviews() {
  const reviews = [["Hidde Norder", "3 fiatjes gehuurd. Goed onderhouden en stonden klaar volgens afspraak."], ["Jerry Kaletruckert", "Superleuk!!!! Tip: boek de herlichkeit lage (3 uur). En de e-chopper voor 3 uur,…"], ["Joop Leferink", "Eind juli voor een week twee fietsen gehuurd. Netjes geholpen bij afhalen. Vriendelijk geholpen bij…"], ["Li Lit", "I like"]];
  const experiences = [["Een heerlijke dag met collega’s", "De gymdocenten van het TCC aan de Potskampstraat gingen samen op pad met de E-Chopper.", "ervaring-team.jpg"], ["Een geweldige familiedag", "Na de TukTuk-rit schoof het gezin aan voor een buffet. De rit, organisatie en het restaurant vielen in de smaak.", "ervaring-familie.jpg"], ["Genoten op de Trike", "De gasten waren enthousiast over de ontvangst, de route en de lunch bij Erve Bossem.", "ervaring-trike.jpg"]];
  return `<section class="section home-reviews" aria-labelledby="home-reviews-title">
    <div class="section-head"><h2 id="home-reviews-title">Recensies</h2>
      <div class="home-review-controls">
        <button type="button" data-review-step="-1" aria-controls="home-review-track" aria-label="Vorige recensie">←</button>
        <button type="button" data-review-step="1" aria-controls="home-review-track" aria-label="Volgende recensie">→</button>
      </div>
    </div>
    <div class="home-review-track" id="home-review-track">
      ${reviews.map(([name, quote]) => `<figure class="home-review">
        <span class="home-review-stars" aria-label="5/5">★★★★★</span>
        <blockquote>${esc(quote)}</blockquote><figcaption>${esc(name)}</figcaption>
      </figure>`).join('')}
    </div>
    <h2>Ervaringen</h2>
    <div class="home-experiences">
      ${experiences.map(([title, description, photo]) => `<article>
        <img src="/toer/thema/assets/${photo}" width="104" height="104" alt="" loading="lazy">
        <h3>${esc(title)}</h3><p>${esc(description)}</p>
      </article>`).join('')}
    </div>
    <div class="home-trustpilot"><a href="https://nl.trustpilot.com/review/twentetoer.nl" target="_blank" rel="noopener noreferrer">Lees alle reviews op Trustpilot ↗</a></div>
  </section>`;
}

function bindHomeReviews() {
  const track = $('#home-review-track');
  const buttons = [...document.querySelectorAll('[data-review-step]')];
  function updateControls() {
    buttons[0].disabled = track.scrollLeft <= 1;
    buttons[1].disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }
  buttons.forEach(button => {
    button.onclick = () => {
      const cards = track.children;
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
      track.scrollBy({left: step * Number(button.dataset.reviewStep), behavior});
    };
  });
  track.addEventListener('scroll', updateControls, {passive: true});
  new ResizeObserver(updateControls).observe(track);
  updateControls();
}

function home(){const top=named('topolino'),buggy=named('buggy');const portals=[{title:'VOERTUIGEN',image:top,copy:'Hoe gaan jullie op pad? Van een Topolino tot fiets of legertruck.',url:'/toer/voertuigen/',links:[['Buggy Experience','buggy'],['Samen toeren','samen'],['Scooters & E-choppers','tweewielers'],['Fietsen & E-steps','fietsen'],['Met chauffeur','chauffeur']]},{title:'ACTIVITEITEN',image:named('boogschieten'),copy:'Samen iets beleven. Actief, een beetje competitie of juist rustig ontdekken.',url:'/toer/activiteiten/',links:[['Actief & Spelen','actief'],['Speuren & Puzzelen','speuren'],['Proeven & Ontdekken','proeven'],['Met een gids op pad','gids']]},{title:'ETEN & DRINKEN',image:named('barbecue incl'),copy:'Van de eerste koffie tot samen tafelen. Maak jullie uitje compleet.',url:'/toer/eten-drinken/',links:[['Ontvangst','ontvangst'],['Lunch & Onderweg','lunch'],['Borrel & Hapjes','borrel'],['Diner & Samen Tafelen','diner']]}];$('#main').innerHTML=`${photoHeader()}<section class="hero home-hero wrap"><div class="hero-copy"><span class="handwritten home-hero-note">Waar gaan jullie heen?</span><div class="eyebrow">TwenteToer · Ootmarsum</div><h1>EFFEN D’R UIT.<br><em>SAMEN TWENTE<br>BELEVEN.</em></h1><p>Toeren door het Tukkerland, samen iets leuks doen en gezellig aanschuiven. Stof op je schoenen, wind door je haren en iets lekkers na afloop. Zo doen we dat hier!</p><div class="actions"><a class="cta" href="#ontdek">Ontdek de mogelijkheden</a><a class="textlink" href="/toer/boeken/">Boek je Topolino</a></div></div><div class="hero-img"><img src="${photo(top)}" alt="Samen genieten in elektrische Topolino’s in Twente"><div class="home-stamp"><span>TwenteToer</span><b>Jullie club.<br>Jullie toer.</b></div><div class="hero-label"><strong>Jullie dag begint hier.</strong>Van een ritje met z’n tweeën tot een uitje met de hele groep.</div></div></section><div class="wrap"><div class="ribbon"><span><strong>Vertrek vanuit Ootmarsum</strong></span><span>Voor vrienden, families & Collega’s</span><span>Voertuig + activiteit + gezellig tafelen</span></div><section class="buggy-feature" id="buggy-experience"><div class="buggy-feature-copy"><span class="handwritten">Stof happen? Kom maar op!</span><div class="eyebrow">Voor de avonturiers</div><h2>BUGGY<br><em>EXPERIENCE!</em></h2><p>Een uur zelf achter het stuur, de zandwegen op en samen het avontuur in. Beleef het echte off-road gevoel rond Ootmarsum.</p><div class="fun-facts"><span>1 uur rijden</span><span>Met begeleiding</span><span>Start in Ootmarsum</span></div><div class="actions"><a class="cta" href="/toer/voertuigen/?voertuig=5">Dit wil ik beleven</a><a class="textlink" href="/toer/voertuigen/?categorie=buggy">Bekijk de buggy’s</a></div></div><div class="buggy-feature-photo"><span class="mud-stamp">Niet bang<br>voor een beetje<br><b>modder?</b></span><img loading="lazy" src="/toer/thema/assets/buggy-experience.jpg" alt="Blauw-zwarte off-road buggy van TwenteToer, volledig in beeld"></div></section><section class="section" id="ontdek"><div class="section-head"><div><div class="eyebrow">Kies waar je wilt beginnen</div><h2>WAAR HEBBEN JULLIE ZIN IN?</h2></div><p>Begin bij het voertuig, de activiteit of het eetmoment. Je kunt ze later combineren in Mijn toer.</p></div><div class="portal-grid">${portals.map(p=>`<article class="portal"><a class="portal-image" href="${p.url}"><img loading="lazy" src="${photo(p.image)}" alt="${p.title.toLowerCase()} bij TwenteToer"></a><div class="portal-body"><div class="eyebrow">${p.title==='VOERTUIGEN'?'01 · KIES JE RIT':p.title==='ACTIVITEITEN'?'02 · BELEEF IETS LEUKS':'03 · SCHUIF GEZELLIG AAN'}</div><h3><a href="${p.url}">${p.title}</a></h3><p>${p.copy}</p><div class="portal-links">${p.links.map(([label,cat])=>`<a href="${p.url}?categorie=${cat}">${label}</a>`).join('')}</div><a class="cta green" href="${p.url}">Bekijk alle ${p.title==='ETEN & DRINKEN'?'eetmomenten':p.title.toLowerCase()}</a></div></article>`).join('')}</div></section><section class="section" style="padding-top:0"><div class="split"><img loading="lazy" src="${photo(buggy)}" alt="Buggy-avontuur in de omgeving van Ootmarsum"><div class="split-copy"><div class="eyebrow">Liever een complete combinatie?</div><h2>EERST OP PAD.<br><span>DAN GEZELLIG AANSCHUIVEN.</span></h2><p>Toeren en lunchen. Een avontuur en barbecue. Of een activiteit met een borrel na afloop. Bekijk de voorbeelden en kies wat bij jullie gezelschap past.</p><a class="cta" href="/toer/arrangementen/">Bekijk arrangementen</a></div></div></section><section class="section home-occasion" style="padding-top:0"><div><div class="eyebrow">Met wie gaan jullie op pad?</div><h2>VOOR ELK GEZELSCHAP.</h2></div><div class="occasion-links"><a href="/toer/voertuigen/?categorie=samen"><b>Met z’n tweeën</b><span>Kies een voertuig en ontdek samen de omgeving.</span></a><a href="/toer/arrangementen/"><b>Familie & Vrienden</b><span>Een gezellige dag met jullie eigen club.</span></a><a href="/toer/activiteiten/?categorie=groepen"><b>Collega’s & Grote Groepen</b><span>Van een teamuitje tot een verzorgde groepsdag.</span></a></div></section><section class="section home-plan" style="padding-top:0"><div class="section-head"><div><div class="eyebrow">Zelf combineren</div><h2>ZO STEL JE JULLIE TOER SAMEN.</h2></div><a class="cta green" href="/toer/mijn-toer/">Begin met samenstellen</a></div><div class="route-steps"><div><b>01</b><h3>Kies je favorieten</h3><p>Bekijk voertuigen, activiteiten en horeca. Voeg de keuzes toe aan Mijn toer.</p></div><div><b>02</b><h3>Vertel je wensen</h3><p>Kies een gewenste datum, groepsgrootte en eventuele bijzonderheden.</p></div><div><b>03</b><h3>Bekijk het overzicht</h3><p>Bewaar je conceptaanvraag. Datum, voorwaarden en prijs worden daarna afgestemd.</p></div></div></section><section class="section" style="padding-top:0"><div class="section-head"><div><div class="eyebrow">Een paar fijne vertrekpunten</div><h2>DIT ZOU ZOMAAR JULLIE DAG KUNNEN ZIJN.</h2></div></div><div class="grid">${[top,named('outdoor lasergame'),named('stadswandeling'),named('top your pizza')].map(card).join('')}</div></section><section class="section faq" style="padding-top:15px"><div><div class="eyebrow">Handig om te weten</div><h2>NOG EVEN DIT.</h2><p class="small">Staat jouw vraag er niet bij?</p><a class="textlink" href="/toer/contact/">Neem contact op</a></div><div>${faq()}</div></section>${homeReviews()}<div style="height:30px"></div></div>`;bind();initPhotoHeader();bindHomeReviews()}

function stoet(){return `<aside class="stoet-link"><div><strong>Alleen trek in verse stoet?</strong><p>Stoet is een eigen bestelomgeving onder de naam TwenteToer, los van verhuur en uitjes.</p></div><a class="cta light" href="/toer/stoet/">Naar Stoet</a></aside>`}
function faq(){return [['Heb ik een rijbewijs nodig?','Dat verschilt per voertuig. Bekijk de voorwaarden van het gekozen voertuig en laat leeftijds- en rijbewijseisen vóór je boeking bevestigen.'],['Kan ik verschillende onderdelen combineren?','Ja, in Mijn toer bewaar je voertuigen, activiteiten en horeca. De daadwerkelijke planning en mogelijkheden worden door TwenteToer bevestigd.'],['Kan ik hier al echt boeken?','Dit is een testversie. Je kunt het aanbod bekijken en je dag samenstellen, maar er wordt niets geboekt of betaald. Neem contact op om te reserveren.'],['Zijn de vanafprijzen de totale kosten?','Nee, het zijn vanafprijzen. Prijseenheden, aantallen, duur en arrangementvoorwaarden verschillen. Mijn toer rekent met gekozen duur, aantallen en bekende prijseenheden. Onderdelen op aanvraag blijven apart.'],['Waar vertrekken we?','Het contactadres is Denekamperstraat 36, 7631 AC Ootmarsum. Stem je vertrekpunt en tijd af bij de definitieve boeking.']].map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}
function catalog(){const group={vehicles:'vehicles',activities:'activities',food:'food'}[page],title={vehicles:'KIES JE VOERTUIG.',activities:'MAAK ER EEN BELEVENIS VAN.',food:'SCHUIF MAAR AAN.'}[page];$('#main').innerHTML=`<div class="wrap"><div class="page-head"><div class="eyebrow">${groupLabel[group]} · Ootmarsum</div><h1>${title}</h1><p>${group==='vehicles'?'Van een elektrische Topolino tot een stoere buggy. Ontdek het volledige voertuigenaanbod en kies wat bij jullie past.':group==='activities'?'Actief, culinair of samen iets nieuws beleven. Bekijk alle activiteiten op één plek.':'Lunch, borrel of uitgebreid tafelen tijdens jullie uitje. Dit horeca-aanbod hoort bij de verhuur en activiteiten; Stoet heeft een eigen sectie.'}</p></div><div class="tools"><input id="search" type="search" aria-label="Zoek in het aanbod" placeholder="Zoek bijvoorbeeld ${group==='vehicles'?'Topolino':group==='activities'?'wandeling':'barbecue'}"><div class="chips"><button data-sort="default" aria-pressed="true">Naam A–Z</button><button data-sort="price" aria-pressed="false">Vanafprijs oplopend</button></div></div><p class="result-count" id="results"></p><div class="grid catalog" id="catalog"></div>${group==='food'?stoet():''}</div>`;let sort='default';function render(){let rows=items.filter(p=>p.group===group&&(p.name+' '+p.description).toLowerCase().includes($('#search').value.toLowerCase()));rows.sort(sort === 'price' ? byPrice : byName);$('#results').textContent=rows.length+' mogelijkheden · indicatieve vanafprijzen';$('#catalog').innerHTML=rows.length?rows.map(card).join(''):'<p class="empty">Geen resultaat. Probeer een andere zoekterm.</p>';bind()}$('#search').oninput=render;document.querySelectorAll('[data-sort]').forEach(b=>b.onclick=()=>{sort=b.dataset.sort;document.querySelectorAll('[data-sort]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});render()}
function foodCatalog(){const groups=[{id:'ontvangst',name:'Ontvangst',subtitle:'Eerst even landen.',copy:'Koffie of thee met iets lekkers voor je op pad gaat.',ids:[53,54,55,56]},{id:'lunch',name:'Lunch & Onderweg',subtitle:'Tijd voor een tussenstop.',copy:'Samen lunchen, een picknick of iets lekkers mee voor onderweg.',ids:[51,60,62,58,57,61,63,59]},{id:'borrel',name:'Borrel & Hapjes',subtitle:'Nog even gezellig blijven.',copy:'Een drankje en iets hartigs na jullie activiteit.',ids:[64,65,67,69,66]},{id:'diner',name:'Diner & Samen Tafelen',subtitle:'Sluit de dag lekker af.',copy:'Van zelf pizza maken tot barbecue of buffet. Bekijk per keuze wat is inbegrepen.',ids:[49,50,72,70,71,74,75,68,73]},{id:'dranken',name:'Drankjes',subtitle:'Wat drinken we erbij?',copy:'Bekijk het assortiment en de drankarrangementen. De voorwaarden verschillen per keuze.',ids:[76,52]}];let selected=new URLSearchParams(location.search).get('categorie')||'all';if(!groups.some(g=>g.id===selected))selected='all';$('#main').innerHTML=`<div class="wrap"><div class="page-head food-intro"><div><div class="eyebrow">Eten & Drinken · bij jullie uitje</div><h1>VAN EERSTE KOFFIE<br>TOT LAATSTE BORREL.</h1><p>Maak jullie dag compleet. Kies iets voor de ontvangst, een pauze onderweg of gezellig tafelen na afloop. Bewaar je favorieten in Mijn toer.</p></div><aside class="food-help"><strong>Zo combineer je ’t</strong><p>Kies je eetmoment, bekijk wat erbij hoort en voeg het toe aan jullie dag.</p><a class="textlink" href="/toer/mijn-toer/">Bekijk Mijn toer</a></aside></div><div class="food-nav" aria-label="Kies je eetmoment"><div class="chips"><button data-food="all" aria-pressed="true">Alles bekijken</button>${groups.map(g=>`<button data-food="${g.id}" aria-pressed="false">${g.name}</button>`).join('')}</div></div><div class="tools"><input type="search" id="food-search" aria-label="Zoek eten en drinken" placeholder="Zoek bijvoorbeeld barbecue, lunch of vegetarisch"><div class="chips"><button id="food-sort" aria-pressed="false">Vanafprijs oplopend</button></div></div><p class="result-count" id="food-count"></p><div id="food-sections"></div><aside class="notice food-note"><b>Goed om te weten</b><br>De getoonde bedragen zijn vanafprijzen. Duur, minimumdeelname, dieetwensen en inbegrepen drankjes worden per keuze bevestigd. Geef allergieën altijd vooraf door. Een keuze in Mijn toer is nog geen reservering.</aside>${stoet()}</div>`;let sorted=false;function render(){let count=0;let html='';const q=$('#food-search').value.toLowerCase().trim();for(const g of groups){if(selected!=='all'&&selected!==g.id)continue;let rows=g.ids.map(id=>items.find(p=>p.id===id)).filter(p=>p&&(p.name+' '+p.description).toLowerCase().includes(q));if(sorted)rows.sort(byPrice);else if(g.id!=='dranken')rows.sort(byName);if(!rows.length)continue;count+=rows.length;html+=`<section class="food-group" id="${g.id}"><div class="section-head"><div><div class="eyebrow">${g.name}</div><h2>${g.subtitle}</h2></div><p>${g.copy}</p></div><div class="grid">${rows.map(card).join('')}</div></section>`}$('#food-sections').innerHTML=html||'<p class="empty">Geen passende keuze gevonden. Probeer een andere zoekterm of een ander eetmoment.</p>';$('#food-count').textContent=count+' mogelijkheden'+(selected!=='all'?' · '+groups.find(g=>g.id===selected).name:' · ingedeeld per eetmoment');bind()}document.querySelectorAll('[data-food]').forEach(b=>b.onclick=()=>{selected=b.dataset.food;document.querySelectorAll('[data-food]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render()});document.querySelectorAll('[data-food]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.food===selected)));$('#food-search').oninput=render;$('#food-sort').onclick=()=>{sorted=!sorted;$('#food-sort').setAttribute('aria-pressed',String(sorted));render()};render()}

function activityCatalog(){const groups=[{id:'actief',name:'Actief & Spelen',subtitle:'Samen de uitdaging aan.',copy:'Een beetje competitie, een avontuur of gewoon gezellig samen spelen.',ids:[24,30,28,29,26,27,32]},{id:'speuren',name:'Speuren & Puzzelen',subtitle:'Wie vindt de oplossing?',copy:'Ontdek de omgeving met opdrachten of kraak samen de escapebox.',ids:[25,31,33]},{id:'proeven',name:'Proeven & Ontdekken',subtitle:'Ontdek de verhalen van Twente.',copy:'Een kijkje achter de schermen, een proeverij of samen koken.',ids:[34,38,40,39,35,36,37,41]},{id:'gids',name:'Met een gids op pad',subtitle:'Meer zien. Meer beleven.',copy:'Ontdek Ootmarsum en het Springendal met iemand die de omgeving kent.',ids:[45,42,43,44,46]},{id:'groepen',name:'Zakelijk & Grote Groepen',subtitle:'Een dag voor de hele club.',copy:'Van vergaderen met een activiteit tot een compleet verzorgde groepsdag.',ids:[47,48]}];let selected=new URLSearchParams(location.search).get('categorie')||'all',sorted=false;if(!groups.some(g=>g.id===selected))selected='all';$('#main').innerHTML=`<div class="wrap"><div class="page-head food-intro"><div><div class="eyebrow">Activiteiten · samen op pad</div><h1>VAN LEKKER ACTIEF<br>TOT SAMEN ONTDEKKEN.</h1><p>Kies wat bij jullie gezelschap past. Ga de uitdaging aan, proef iets van Twente of ontdek de omgeving met een gids. Bewaar je favorieten in Mijn toer.</p></div><aside class="food-help"><strong>Maak er jullie dag van</strong><p>Combineer een activiteit met een voertuig en iets lekkers voor of na afloop.</p><a class="textlink" href="/toer/mijn-toer/">Stel mijn toer samen</a></aside></div><div class="food-nav" aria-label="Kies een soort activiteit"><div class="chips"><button data-activity="all" aria-pressed="true">Alles bekijken</button>${groups.map(g=>`<button data-activity="${g.id}" aria-pressed="false">${g.name}</button>`).join('')}</div></div><div class="tools"><input type="search" id="activity-search" aria-label="Zoek een activiteit" placeholder="Zoek bijvoorbeeld lasergame, proeverij of wandeling"><div class="chips"><button id="activity-sort" aria-pressed="false">Vanafprijs oplopend</button></div></div><p class="result-count" id="activity-count"></p><div id="activity-sections"></div><aside class="notice food-note"><b>Even afstemmen voor vertrek</b><br>De mogelijkheden hangen af van de groepsgrootte, leeftijd, datum en gekozen activiteit. Duur, begeleiding en definitieve prijzen worden bevestigd bij je aanvraag. Een selectie in Mijn toer is nog geen boeking.</aside><div class="hero-small"><h2>MAAK JE UITJE COMPLEET.</h2><p>Al iets leuks gevonden? Kies er een voertuig, lunch of diner bij en verzamel alles in één overzicht.</p><div class="actions"><a class="cta green" href="/toer/voertuigen/">Bekijk voertuigen</a><a class="cta light" href="/toer/eten-drinken/">Kies eten & Drinken</a></div></div></div>`;function render(){let count=0,html='';const q=$('#activity-search').value.toLowerCase().trim();for(const g of groups){if(selected!=='all'&&selected!==g.id)continue;let rows=g.ids.map(id=>items.find(p=>p.id===id)).filter(p=>p&&(p.name+' '+p.description).toLowerCase().includes(q));rows.sort(sorted ? byPrice : byName);if(!rows.length)continue;count+=rows.length;html+=`<section class="food-group" id="${g.id}"><div class="section-head"><div><div class="eyebrow">${g.name}</div><h2>${g.subtitle}</h2></div><p>${g.copy}</p></div><div class="grid">${rows.map(card).join('')}</div></section>`}$('#activity-sections').innerHTML=html||'<p class="empty">Geen passende activiteit gevonden. Probeer een andere zoekterm of categorie.</p>';$('#activity-count').textContent=count+' activiteiten'+(selected==='all'?' · ingedeeld op soort uitje':' · '+groups.find(g=>g.id===selected).name);bind()}document.querySelectorAll('[data-activity]').forEach(b=>b.onclick=()=>{selected=b.dataset.activity;document.querySelectorAll('[data-activity]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render()});document.querySelectorAll('[data-activity]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.activity===selected)));$('#activity-search').oninput=render;$('#activity-sort').onclick=()=>{sorted=!sorted;$('#activity-sort').setAttribute('aria-pressed',String(sorted));render()};render()}

function vehicleCatalog(){const groups=[{id:'buggy',name:'Buggy Experience',subtitle:'Zandwegen. Modder. Grote grijns.',copy:'Zelf off-road rijden onder begeleiding. Ontdek alles over de Buggy Experience.',ids:[5]},{id:'samen',name:'Samen toeren',subtitle:'Stap in. Samen eropuit.',copy:'Samen op pad met een Topolino, TukTuk of buggy.',ids:[3,1]},{id:'tweewielers',name:'Scooters & E-choppers',subtitle:'Jouw rondje Tukkerland.',copy:'Kies je favoriete scooter of e-chopper. Laat de rijbewijs- en leeftijdsvoorwaarden per voertuig bevestigen.',ids:[2,4,6,7,8]},{id:'fietsen',name:'Fietsen & E-steps',subtitle:'Actief de omgeving in.',copy:'Van een stadsfiets tot een elektrische mountainbike of Fatmax. Kies wat past bij jullie route.',ids:[12,13,15,14,10,11,9,16]},{id:'chauffeur',name:'Met chauffeur',subtitle:'Meerijden met een verhaal.',copy:'Op pad met een karaktervolle legertruck of jeep. Stem de mogelijkheden voor jullie groep af.',ids:[21,22,23]},{id:'evenementen',name:'Evenementen & Foodtrucks',subtitle:'Een bijzondere blikvanger.',copy:'Een Piaggio Ape als originele toevoeging aan een evenement of feest.',ids:[19,20]},{id:'extra',name:'Kinderzitjes',subtitle:'Ook de kleintjes mee.',copy:'Bekijk de zitjes en stem vooraf af welke combinatie geschikt is voor jouw kind en fiets.',ids:[17,18]}];let selected=new URLSearchParams(location.search).get('categorie')||'all',sorted=false;if(!groups.some(g=>g.id===selected))selected='all';$('#main').innerHTML=`<div class="wrap"><div class="page-head food-intro"><div><div class="eyebrow">Voertuigen · Ootmarsum</div><h1>KIES JE VOERTUIG.<br>ONTDEK HET TUKKERLAND.</h1><p>Samen in een Topolino, op een e-chopper of lekker op de fiets. Bekijk de mogelijkheden per soort voertuig en bewaar je favorieten in Mijn toer.</p></div><aside class="food-help"><strong>Eerst even kiezen</strong><p>Kies hoe je wilt reizen. Combineer je rit daarna met een activiteit, lunch of diner.</p><a class="textlink" href="/toer/mijn-toer/">Stel mijn toer samen</a></aside></div><div class="food-nav" aria-label="Kies een soort voertuig"><div class="chips"><button data-vehicle="all" aria-pressed="true">Alles bekijken</button>${groups.map(g=>`<button data-vehicle="${g.id}" aria-pressed="false">${g.name}</button>`).join('')}</div></div><div class="tools"><input type="search" id="vehicle-search" aria-label="Zoek een voertuig" placeholder="Zoek bijvoorbeeld Topolino, buggy of e-bike"><div class="chips"><button id="vehicle-sort" aria-pressed="false">Vanafprijs oplopend</button></div></div><p class="result-count" id="vehicle-count"></p><div id="vehicle-sections"></div><aside class="notice food-note"><b>Even afstemmen voor vertrek</b><br>Controleer per voertuig de leeftijd, het rijbewijs, het aantal zitplaatsen, de route en de huurduur. Tarieven en beschikbaarheid worden bij je aanvraag bevestigd. Een selectie in Mijn toer is nog geen boeking.</aside><div class="hero-small"><h2>MAAK JE UITJE COMPLEET.</h2><p>Voertuig gevonden? Kies er een activiteit en iets lekkers bij. Verzamel jullie wensen in Mijn toer.</p><div class="actions"><a class="cta green" href="/toer/activiteiten/">Kies een activiteit</a><a class="cta light" href="/toer/eten-drinken/">Kies eten & Drinken</a></div></div></div>`;function render(){let count=0,html='';const q=$('#vehicle-search').value.toLowerCase().trim();for(const g of groups){if(selected!=='all'&&selected!==g.id)continue;const groupIds=selected==='samen' ? [...g.ids, ...groups.find(group=>group.id==='buggy').ids] : g.ids;let rows=groupIds.map(id=>items.find(p=>p.id===id)).filter(p=>p&&(p.name+' '+p.description).toLowerCase().includes(q));rows.sort(sorted ? byPrice : byName);if(!rows.length)continue;count+=rows.length;html+=`<section class="food-group" id="${g.id}"><div class="section-head"><div><div class="eyebrow">${g.name}</div><h2>${g.subtitle}</h2></div><p>${g.copy}</p></div><div class="grid">${rows.map(card).join('')}</div></section>`}$('#vehicle-sections').innerHTML=html||'<p class="empty">Geen passend voertuig gevonden. Probeer een andere zoekterm of categorie.</p>';$('#vehicle-count').textContent=count+' mogelijkheden'+(selected==='all'?' · ingedeeld op soort voertuig':' · '+groups.find(g=>g.id===selected).name);bind()}document.querySelectorAll('[data-vehicle]').forEach(b=>b.onclick=()=>{selected=b.dataset.vehicle;document.querySelectorAll('[data-vehicle]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render()});document.querySelectorAll('[data-vehicle]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.vehicle===selected)));$('#vehicle-search').oninput=render;$('#vehicle-sort').onclick=()=>{sorted=!sorted;$('#vehicle-sort').setAttribute('aria-pressed',String(sorted));render()};render()}

const arrangementDetails = {
  abraham: {
    sections: [
      ["Jullie vijftigste vieren", "Vier jullie verjaardag met een besloten feest in ’t Witte Peard in Ootmarsum. Er is ruimte om te dansen, een drankbuffet en een veranda. Stem muziek, hapjes en dieetwensen vooraf af."],
      ["All-in feest", "Vanaf € 39,50 per persoon met een welkomstdrankje, vier uur drankjes, twee koude en twee warme hapjes en nootjes en chips. Een afsluitend broodje of friet is bij te boeken. Binnen is er plek voor ongeveer 125 gasten en met terras en veranda voor ongeveer 300. Uiterlijk om 01.00 uur sluit het café."],
    ],
    images: ["feest-ruimte.jpg", "feest-hapjes.jpg", "feest-welkomstdrank.jpg"],
  },
  party: {
    sections: [
      ["Vier jullie eigen feest", "Huur het café-restaurant voor een besloten feest met dansvloer en veranda. Gasten kunnen zelf drank inschenken. Bediening voor de hele avond kan voor € 150 extra. Jullie kunnen eigen muziek draaien tot 00.30 uur. Het café sluit uiterlijk om 01.00 uur."],
      ["Wat is inbegrepen?", "Vanaf € 39,50 per persoon met een welkomstdrankje, vier uur drankjes, twee koude en twee warme hapjes en nootjes en chips. Broodjes of friet na afloop zijn apart bij te boeken. De ruimte biedt plek aan ongeveer 125 gasten, of circa 300 met terras en veranda."],
    ],
    images: ["feest-ruimte.jpg", "feest-drankbuffet.jpg", "feest-hapjes.jpg"],
  },
  nacalculatie: {
    sections: [
      ["Een feest op rekening", "Gasten bestellen hun drankjes aan de bar. TwenteToer houdt bij wat er wordt besteld en rekent na afloop af op basis van verbruik. Consumpties vanaf € 3,25. Het all-in drankbuffet is bij dit arrangement gesloten."],
      ["Hapjes aan tafel", "Bestel naar wens nootjes, kaas, worst of warme snacks, zoals bitterballen. Stem jullie voorkeuren vooraf af."],
    ],
    images: ["feest-nacalculatie.jpeg", "feest-hapjes.jpg"],
  },
  borrel: {
    sections: [
      ["Samen borrelen", "Voor een zakelijke borrel, receptie of informele bijeenkomst. Twee uur lang pakken jullie zelf bier, huiswijn of fris van het drankbuffet. Op tafel komen tapas en hartige nootjes."],
      ["Prijs", "€ 22,50 per persoon."],
    ],
    images: ["feest-ruimte.jpg", "feest-drankbuffet.jpg"],
  },
  catering: {
    sections: [
      ["Food TukTuk op locatie", "De Food TukTuk heeft een koelkast en warmhoudvoorziening. Warme hapjes worden ter plekke bereid. Denk aan broodjes beenham, hamburgers, pizzapunten of champignons met knoflooksaus. Vegetarisch, glutenvrij of halal kan in overleg."],
      ["Prijs op maat", "Vanaf € 25 per persoon, met standaard twee uur bediening op locatie. De prijs hangt af van groepsgrootte, locatie, tijdstip en menu. TwenteToer rekent vanaf Ootmarsum."],
    ],
    images: ["catering-foodtruck.jpg", "catering-hapjes.jpeg"],
  },
  kerstbuffet: {
    sections: [
      ["Samen aan het kerstbuffet", "Begin met glühwein of warme chocolademelk. Aan het buffet staan onder meer schnitzel, kipsaté, spareribs, nasi en salades. Sluit af met softijs en kies je eigen toppings."],
      ["Kosten en informatie", "€ 47,50 per persoon met twee uur all-in drankjes. Vanaf twintig deelnemers of minimaal € 950 per groep. Halal, vegetarisch en glutenvrij zijn mogelijk in overleg."],
    ],
    images: ["kerstbuffet-warm.jpg", "kerstbuffet-salades.jpg", "feest-drankbuffet.jpg"],
  },
  kerstmini: {
    sections: [
      ["Twee uur samen proosten", "Een kerst- of nieuwjaarsborrel met twee uur drankjes all-in. Jullie schenken zelf bier, huiswijn of fris in. Er zijn nootjes op tafel en er komt één ronde koude en één ronde warme hapjes."],
      ["Kosten en informatie", "€ 25 per persoon. Jullie kiezen zelf het tijdstip. Er is een verwarmde veranda. Glutenvrij, halal of vegetarisch kan in overleg."],
    ],
    images: ["feest-welkomstdrank.jpg", "feest-drankbuffet.jpg", "feest-hapjes.jpg"],
  },
  kerstborrel: {
    sections: [
      ["Vier uur kerstborrel", "Bij aankomst krijgen jullie glühwein of warme chocolademelk. Daarna is het drankbuffet vier uur open. Op tafel staan nootjes en we serveren twee rondes koude en twee rondes warme hapjes."],
      ["Kosten en informatie", "€ 39,50 per persoon. Ook als nieuwjaarsborrel te boeken. Jullie bepalen zelf de tijden. Glutenvrij of vegetarisch kan in overleg."],
    ],
    images: ["feest-welkomstdrank.jpg", "feest-drankbuffet.jpg", "feest-hapjes.jpg"],
  },
  gezin: {
    sections: [
      ["Samen op pad met het gezin", "Verken Ootmarsum met een TukTuk of kies bijvoorbeeld een Fatbike of Beachcruiser. Maak onderweg een stop bij een speeltuin of kinderboerderij. Jullie kunnen verschillende voertuigen combineren."],
      ["Samen aan tafel", "Maak de dag compleet met pannenkoeken, een buffet of een BBQ. De prijs hangt af van jullie keuze van voertuigen en eten."],
    ],
    images: ["item-1.jpg", "item-10.jpg", "item-11.jpg"],
  },
  vrijgezel: {
    sections: [
      ["Een vrijgezellendag op maat", "Ga buggy rijden, stap in een Topolino, rijd op een E-Chopper of speel samen de Escapebox. Liever door de stad? Kies een speurtocht, stadswandeling of bezoek aan de brouwerij."],
      ["Samen eten en drinken", "Combineer jullie uitje met lunch, tapas, pizza bakken of een BBQ. De prijs hangt af van de gekozen onderdelen."],
    ],
    images: ["item-5.jpg", "item-3.jpg", "item-25.jpg", "item-49.jpg"],
  },
  fatmax10: {
    sections: [
      ["Een ochtend op de Fatmax", "Begin met koffie of thee en maak daarna een rit van twee uur op de elektrische Fatmax Kickbike. De route staat in de gratis TwenteToer-app. Terug in Ootmarsum krijgen jullie één drankje per persoon aan de bar."],
      ["Prijs", "€ 25 per persoon."],
    ],
    images: ["item-9.jpg", "vergaderen-fatmax.jpg"],
  },
  dealechopper: {
    sections: [
      ["Social Deal E-Chopper", "Deze actie liep tot eind maart 2026. Voor de beschreven actie reserveerde je via Social Deal, met maximaal tien personen per groep."],
      ["Voorwaarden voor de rit", "Rijbewijs AM of B en een helm zijn verplicht. Een haarnetje krijg je bij de helm. Gratis routes staan in de TwenteToer-app."],
    ],
    images: ["item-2.jpg", "chopper-gids-toer.jpg"],
  },
  dealfatbike: {
    sections: [
      ["Social Deal Fatbike", "De beschreven actie liep tot en met 29 mei 2024, van dinsdag tot en met vrijdag en met maximaal vijftien personen per groep."],
      ["Voorwaarden voor de rit", "De verhuurpagina noemt een minimale lengte van 1,55 meter, geen passagiers en gratis routes in de TwenteToer-app."],
    ],
    images: ["item-10.jpg"],
  },
  dealfatmax: {
    sections: [
      ["Social Deal Fatmax", "TwenteToer vermeldt momenteel geen lopende Social Deal voor de Fatmax. De Fatmax staat wel bij de gewone verhuur en bij het 10-uurtje."],
    ],
    images: ["item-9.jpg", "vergaderen-fatmax.jpg"],
  },
  sleutelwinter: {
    sections: [
      ["Op zoek naar de sleutel", "Los samen opdrachten op tijdens een wandeling door het oude centrum van Ootmarsum. Daarna staat een Twents stamppotbuffet klaar, met twee uur drankjes tijdens het eten."],
      ["Kosten en informatie", "€ 50 per persoon voor de wintereditie met buffet. Reken op ongeveer vier uur. De speurtocht gaat te voet. De gewone Sleutel van Ootmarsum is apart beschikbaar."],
    ],
    images: ["sleutel-centrum.jpg", "winter-stamppot.jpeg", "sleutel-speurtocht.jpg"],
  },
  winterwandeling: {
    sections: [
      ["Met gids door het Springendal", "Wandel langs de bronvijvers en hoor over de geschiedenis van het grensgebied en de gevonden goudschat. Aan het einde wacht een warme hap met een drankje bij de houtgestookte veldkeuken."],
      ["Kosten en informatie", "€ 45 per persoon. Na afloop brengt de legertruck jullie terug naar het startpunt."],
    ],
    images: ["winterwandeling-veldkeuken.jpeg", "winterwandeling-onderweg.jpeg", "bronnen-bronvijver_springendal.jpg"],
  },
};

function openArrangement(button) {
  const arrangement = arrangementDetails[button.dataset.arrangement];
  const title = button.dataset.title;
  const dialog = $('#detail');
  const content = $('#detail-content');
  dialog.classList.remove('drinks-detail');
  content.innerHTML = `<img class="detail-img" src="/toer/thema/assets/${arrangement.images[0]}" alt="${esc(title)}">
    <div class="detail-pad">
      <div class="eyebrow">Arrangementen · TwenteToer</div>
      <h2>${esc(title)}</h2>
      ${renderActivityDetails(arrangement, title)}
      <div class="actions">
        <a class="cta green" href="/toer/contact/">Neem contact op</a>
        <a class="cta light" href="/toer/mijn-toer/">Stel Mijn toer samen</a>
      </div>
    </div>`;
  bindPhotoGallery(content);
  dialog.showModal();
}

function arrangementOverview() {
  const groups = [
    ["Feestje?", [
      ["Abraham & Sarah", "Een feest voor jullie vijftigste verjaardag, met eten en drinken bij TwenteToer.", "abraham"],
      ["All-in party", "Vier jullie feest met een arrangement voor eten en drinken.", "party"],
      ["Feest op nacalculatie", "Stel het feest samen en stem vooraf af wat op nacalculatie wordt afgerekend.", "nacalculatie"],
      ["Borrel", "Een borrel voor jullie groep in Ootmarsum.", "borrel"],
      ["Catering op locatie", "Eten en drinken voor een feest op jullie eigen locatie.", "catering"],
      ["Kerstbuffet", "Samen aan tafel voor een kerstbuffet.", "kerstbuffet"],
      ["Kerstborrel Mini", "Een kerstborrel in receptievorm.", "kerstmini"],
      ["Kerstborrel", "Een gezellige afsluiting van het jaar met jullie groep.", "kerstborrel"],
    ]],
    ["Groepen", [
      ["Vergaderen & Actief", "Vergader in het restaurant, schuif aan bij het lunchbuffet en kies daarna een rit of activiteit.", 47],
      ["Dagje Ootmarsum", "Een compleet programma met stadswandeling, lunch, voertuigrit en een BBQ met drankjes.", 48],
      ["Gezinsuitje in Ootmarsum", "Een dag op pad met het gezin in Ootmarsum en omgeving.", "gezin"],
      ["Vrijgezellenfeest", "Kies een uitje voor de aanstaande bruid of bruidegom en jullie gezelschap.", "vrijgezel"],
    ]],
    ["Kortingsacties", [
      ["Fatmax 10-uurtje", "Een Fatmax-actie voor wie ’s ochtends op pad wil.", "fatmax10"],
      ["Social Deal E-Chopper", "Bekijk de actie en de voorwaarden voor een rit op de E-Chopper.", "dealechopper"],
      ["Social Deal Fatbike", "Bekijk de actie en de voorwaarden voor een Fatbike-rit.", "dealfatbike"],
      ["Social Deal Fatmax", "Bekijk de actie en de voorwaarden voor een rit op de Fatmax.", "dealfatmax"],
    ]],
    ["Winteruitjes", [
      ["Verborgen Sleutel – Winter", "Los onderweg opdrachten op en ontdek het historische centrum.", "sleutelwinter"],
      ["Escapebox", "Los met jullie team het raadsel van de kist op in het café-restaurant.", 25],
      ["Stadswandeling Ootmarsum", "Verken de stad met een plaatselijke gids.", 45],
      ["Winterwandeling", "Trek de wandelschoenen aan voor een winteruitje in de omgeving.", "winterwandeling"],
      ["Smokkel Dropping", "Vind met kaart en kompas de weg terug naar Ootmarsum.", 28],
    ]],
  ];
  return `<div class="tt-information" id="aanbod">
    ${groups.map(([heading, entries]) => `<section class="section">
      <h2>${esc(heading)}</h2>
      ${entries.map(([title, description, destination]) => `<details>
        <summary>${esc(title)}</summary>
        <p>${esc(description)}</p>
        <button class="textlink" ${typeof destination === 'number'
          ? `data-detail="${destination}"`
          : `data-arrangement="${destination}" data-title="${esc(title)}"`}>Bekijk details</button>
      </details>`).join('')}
    </section>`).join('')}
  </div>`;
}

function arrangements() {
  const combinations = [
    ['Dolce Vita & Gezellig tafelen', 3, 51, "Familie & Vrienden"],
    ['Avontuur & Barbecue', 5, 50, "Vrienden & Collega’s"],
    ['Toeren & Pizza bakken', 2, 49, "Familie & Vrienden"],
    ['Actief & Borrelen', 9, 65, "Vrienden & Collega’s"],
  ].map(([title, vehicleId, foodId, audience]) => ({
    title, audience,
    vehicle: items.find(item => item.id === vehicleId),
    food: items.find(item => item.id === foodId),
  })).filter(({vehicle, food}) => vehicle && food)
    .sort((a, b) => compareTitle(a.title, b.title));

  function choose({vehicle, food}) {
    chosen = [...new Set([...chosen, vehicle.id, food.id])];
    localStorage.setItem('toer-plan', JSON.stringify(chosen));
    location.href = "/toer/mijn-toer/";
  }

  function showCombination(combination) {
    const {title, vehicle, food} = combination;
    const dialog = $('#detail');
    dialog.classList.remove('drinks-detail');
    $('#detail-content').innerHTML = `<img class="detail-img" src="${photo(vehicle)}" alt="${esc(vehicle.name)}">
      <div class="detail-pad">
        <h2>${esc(title)}</h2>
        <ul><li>${esc(vehicle.name)}</li><li>${esc(food.name)}</li></ul>
        <p>Samenstelling, planning en prijs stemmen we op aanvraag af.</p>
        <button type="button" class="cta green" id="choose-combination">Kies deze combinatie</button>
      </div>`;
    $('#choose-combination').onclick = () => choose(combination);
    dialog.showModal();
  }

  $('#main').innerHTML = `<div class="wrap"><div class="page-head"><div class="eyebrow">Samen op pad</div><h1>JULLIE DAG. JULLIE COMBINATIE.</h1><p>Inspiratie voor een complete dag. De samenstelling, planning en prijs bevestigen we op aanvraag.</p></div>${arrangementOverview()}<section class="section"><h2>Zelf combineren</h2><div class="grid">
    ${combinations.map(({title, vehicle, food, audience}, index) => `<article class="card">
      <button type="button" class="card-photo" data-view-combo="${index}" aria-label="Bekijk combinatie ${esc(title)}">
        <img src="${photo(vehicle)}" alt="${esc(vehicle.name)}">
      </button>
      <div class="card-body">
        <span class="tag">Inspiratie · ${esc(audience)}</span>
        <h3><button type="button" class="textlink card-details" data-view-combo="${index}">${esc(title)}</button></h3>
        <p>${esc(vehicle.name)} en ${esc(food.name)}.</p>
        <button type="button" class="cta green" data-combo="${index}">Kies deze combinatie</button>
      </div>
    </article>`).join('')}
  </div></section><div class="hero-small"><h2>LIEVER ZELF MIXEN?</h2><p>Kies uit het volledige aanbod en maak je eigen selectie in Mijn toer.</p><a class="cta" href="/toer/mijn-toer/">Stel mijn dag samen</a></div></div>`;
  bind();
  document.querySelectorAll('[data-arrangement]').forEach(button => {
    button.onclick = () => openArrangement(button);
  });
  document.querySelectorAll('[data-view-combo]').forEach(button => {
    button.onclick = () => showCombination(combinations[button.dataset.viewCombo]);
  });
  document.querySelectorAll('[data-combo]').forEach(button => {
    button.onclick = () => choose(combinations[button.dataset.combo]);
  });
}

let refreshPlanner;
function plan(){refreshPlanner=initPlanner({items:[...items].sort(byName),chosen,onChange:ids=>{chosen=[...ids];updateCount()}})}
function renderSelection(){refreshPlanner?.()}
function info() {
  $('#main').innerHTML = `<div class="wrap">
  <div class="page-head"><div class="eyebrow">Voor je op pad gaat</div><h1>HANDIG OM TE WETEN.</h1><p>Een helder vertrekpunt voor jullie uitje in Ootmarsum.</p></div>
  <div class="tt-information">
  <section class="section" id="bezoek">
    <h2>Plan je bezoek</h2>
    <details><summary>Openingstijden 2026/2027</summary><p>Van maart tot en met november zijn we dagelijks geopend vanaf 10.00 uur. Van december tot en met februari openen we op reservering, als het weer het toelaat, of voor feestjes.</p><p>Gesloten op Koningsdag, Hemelvaartsdag, eerste en tweede kerstdag, oudejaarsdag, nieuwjaarsdag en tijdens de Koale Kermis.</p></details>
    <details><summary>Parkeren</summary><p>Parkeer gratis naast het restaurant aan Denekamperstraat 36. Is die parkeerplaats vol, rijd dan naar De Meierij. Bij de supermarkten geldt een blauwe zone van maximaal twee uur met parkeerschijf. Achteraan kun je langer gratis parkeren. Vanaf daar loop je ongeveer 250 tot 300 meter naar TwenteToer.</p></details>
    <details><summary>Auto en fiets opladen</summary><p>Bij TwenteToer kunnen twee elektrische auto’s tegelijk laden. Vraag bij de receptie naar beschikbaarheid en voorwaarden. Bezoekers van een activiteit of het terras kunnen hun e-bike tijdens hun bezoek gratis opladen.</p></details>
    <details><summary>Ootmarsum en omgeving</summary><p>Wandel door de straatjes van Ootmarsum langs historische gevels, galeries en terrassen. In het Springendal vind je bronnen, beekjes, heide en oude boerderijen. Ook Vasse en het Dal van de Mosbeek zijn geschikt voor een wandeling of fietstocht.</p></details>
  </section>
  <section class="section" id="voorwaarden">
    <h2>Voertuigen en Voorwaarden</h2>
    <details><summary>Leeftijd en rijbewijs</summary><ul class="benefits"><li>TukTuk: vanaf 24 jaar, motorrijbewijs A of A1 en ervaring op een motorfiets.</li><li>Buggy: vanaf 20 jaar, rijbewijs B minstens één jaar in bezit.</li><li>Topolino: vanaf 24 jaar, rijbewijs B minstens één jaar in bezit.</li><li>E-Chopper: vanaf 18 jaar, rijbewijs AM, A of B. Goccia: rijbewijs AM, A of B.</li><li>Fatmax en Trike: vanaf 16 jaar. Fatbike: vanaf 155 cm. Beachcruiser: vanaf 160 cm.</li></ul><p>Bekijk de voorwaarden bij het voertuig en neem het vereiste rijbewijs mee.</p></details>
    <details><summary>Huurvoorwaarden en Plus+ Verzekering</summary><p>De gewone WA-dekking geldt voor voertuigen waarvoor die verplicht is. TwenteToer biedt daarnaast Plus+ aan. De productinformatie noemt een maximaal eigen risico van € 150 bij gedekte schade. Voor diefstaldekking noemt TwenteToer een politieaangifte binnen 24 uur en het kunnen overhandigen van de originele sleutel(s). Controleer vóór vertrek samen het voertuig en vraag bij je boeking naar de premie, dekking en uitsluitingen.</p><p><a class="textlink" href="/toer/huurvoorwaarden/">Huurvoorwaarden</a> · <a class="textlink" href="/toer/boekings-en-huurvoorwaarden/">Boekingsvoorwaarden</a></p></details>
  </section>
  <section class="section" id="twentetoer">
    <h2>Over TwenteToer</h2>
    <details><summary>Ons verhaal</summary><p>TwenteToer begon in 2013 met één TukTuk. Inmiddels organiseren we voertuigverhuur en groepsuitjes vanuit Ootmarsum. Sinds 2021 ontvangen we gasten ook in het café-restaurant aan de rand van het centrum, voorheen ’t Witte Peard.</p><a class="textlink" href="/toer/bedrijfsgegevens/">Bedrijfsgegevens</a></details>
    <details><summary>Werken bij TwenteToer</summary><p>Interesse in verhuur, onderhoud, keuken, bar of vakantie- en weekendwerk? Neem contact op om te vragen welke functies openstaan en bespreek je beschikbaarheid.</p><a class="textlink" href="/toer/contact/">Informeer naar vacatures</a></details>
    <details><summary>Ervaringen van gasten</summary><p>Lees ervaringen van bezoekers over onder andere bedrijfsuitjes met buggy’s, familiedagen en tochten met E-Choppers.</p><a class="textlink" href="https://nl.trustpilot.com/review/twentetoer.nl" target="_blank" rel="noopener noreferrer">Lees beoordelingen op Trustpilot</a></details>
  </section>
  <section class="section" id="cadeaubonnen">
    <h2>Cadeaubonnen</h2>
    <details><summary>Een cadeaubon geven</summary><p>Kies een bedrag op de cadeaubonpagina. Je ontvangt de bon met een unieke code per e-mail en kunt hem zelf printen.</p><a class="textlink" href="https://www.twentetoer.nl/activiteiten/cadeaubon/">Cadeaubon kopen</a></details>
    <details><summary>Een cadeaubon gebruiken</summary><p>Op de bon staat voor welke uitjes je de code kunt gebruiken. Vul die bij een echte online reservering in. Lukt dat niet voor het gekozen uitje, bijvoorbeeld voor buggy rijden, neem dan contact met ons op om de code bij je aanvraag te laten verwerken.</p><a class="textlink" href="/toer/contact/">Hulp bij verzilveren</a></details>
  </section>
  <section class="section" id="overnachten">
    <h2>Overnachten</h2>
    <details><summary>Vakantiewoning in Ootmarsum</summary><p>De vakantiewoning ligt op ongeveer 300 meter van het centrum en biedt plaats aan maximaal zeven personen, inclusief slaapbank. Er zijn twee slaapkamers, een ingerichte keuken en een infraroodsauna. De woning ligt op de eerste verdieping en is bereikbaar via een buitentrap. Inchecken kan vanaf 15.00 uur, uitchecken is vóór 11.00 uur. Bedlinnen, eindschoonmaak en toeristenbelasting zijn inbegrepen. Huisdieren, roken en feesten zijn niet toegestaan.</p><a class="textlink" href="https://www.booking.com/hotel/nl/slapen-in-ootmarsum-ootmarsum.nl.html">Bekijk beschikbaarheid bij Booking.com</a></details>
    <details><summary>Campings</summary><p><a href="https://www.dewitteberg.nl/">De Witte Berg</a> ligt op ongeveer 800 meter en heeft kampeerplaatsen, bungalows, chalets en zwembaden. <a href="https://www.campingbijdebronnen.nl/">Bij de Bronnen</a> ligt op ongeveer 900 meter, bij het Springendal, en is een uitvalsbasis voor wandelingen en fietstochten.</p></details>
    <details><summary>Hotels en bed &amp; breakfasts</summary><p>Voor hotels kun je het regionale verblijfsoverzicht bekijken. Voor bed &amp; breakfast noemt TwenteToer <a href="https://ervehowerboer.nl/">Erve Höwerboer</a>, <a href="https://thofke-ootmarsum.nl/t-hofke">’t Höfke</a> bij de Kuiperberg en <a href="https://www.bossem.nl/">Erfgoed Bossem</a> met onder meer boerderijkamers en sterrenkubussen.</p><a class="textlink" href="https://www.ootmarsum-dinkelland.nl/">Verblijven in Ootmarsum-Dinkelland</a></details>
  </section>
  <section class="section" id="catering">
    <h2>Catering op locatie</h2>
    <details><summary>Food TukTuk voor je feest</summary><p>TwenteToer kan naar jullie locatie komen met de Food TukTuk. De wagen heeft onder meer koeling, een warmhoudvoorziening en een werkblad. Op locatie kunnen we warme en koude hapjes serveren, zoals broodjes, pizzapunten en champignons met knoflooksaus.</p></details>
    <details><summary>Menu en offerte op maat</summary><p>Vegetarisch, glutenvrij of halal kan in overleg. Bespreek dieetwensen en allergieën vooraf. We gaan uit van twee uur op locatie en een prijs vanaf € 25 per persoon, gerekend vanaf Ootmarsum. De offerte hangt af van locatie, groepsgrootte, tijd en menu.</p><a class="textlink" href="/toer/contact/">Vraag catering aan</a></details>
  </section>
  <section class="section"><h2>Nog een vraag?</h2><a class="textlink" href="/toer/veelgestelde-vragen/">Veelgestelde vragen</a></section>
  </div>
</div>`;
}

function contact(){ $('#main').innerHTML=`<div class="wrap"><div class="page-head"><div class="eyebrow">We denken graag met je mee</div><h1>BEGIN BIJ EEN GOED IDEE.</h1><p>Een vraag over een voertuig, een complete groepsdag of een specifieke wens? Hier vind je de contactgegevens van TwenteToer.</p></div><div class="contact-grid"><section class="panel"><div class="eyebrow">TwenteToer · Ootmarsum</div><h2>KOM IN CONTACT.</h2><p>Denekamperstraat 36<br>7631 AC Ootmarsum</p><p><a class="textlink" href="tel:+31541296459">0541 – 29 64 59</a><br><a class="textlink" href="mailto:info@twentetoer.nl">info@twentetoer.nl</a></p><div class="actions"><a class="cta green" href="tel:+31541296459">Bel TwenteToer</a><a class="cta light" href="mailto:info@twentetoer.nl">E-mail TwenteToer</a></div><p class="small">Deze links openen je telefoon- of e-mailprogramma. De testsite verstuurt zelf niets.</p></section><section class="panel"><h2>EERST EVEN SAMENSTELLEN?</h2><p>Kies je favoriete voertuigen, activiteiten en horeca. Zo heb je jouw wensen alvast overzichtelijk bij elkaar.</p><a class="cta" href="/toer/mijn-toer/">Stel mijn toer samen</a></section></div></div>`}

function bindPhotoGallery(root) {
  let galleryLinks = [];
  const lightbox = root.querySelector('.buggy-lightbox');
  if (!lightbox) return;
  const fullPhoto = lightbox.querySelector('img');
  const counter = lightbox.querySelector('[aria-live]');
  let currentPhoto = 0;

  function showPhoto(index) {
    currentPhoto = (index + galleryLinks.length) % galleryLinks.length;
    const link = galleryLinks[currentPhoto];
    fullPhoto.alt = link.querySelector('img').alt;
    fullPhoto.src = link.href;
    counter.textContent = (currentPhoto + 1) + ' / ' + galleryLinks.length;
  }

  root.querySelectorAll('[data-photo-gallery]').forEach(gallery => {
    const links = [...gallery.querySelectorAll('a')];
    links.forEach((link, index) => {
      link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        galleryLinks = links;
        showPhoto(index);
        lightbox.showModal();
      });
    });
  });
  lightbox.querySelectorAll('[data-gallery-step]').forEach(button => {
    button.addEventListener('click', () => showPhoto(currentPhoto + Number(button.dataset.galleryStep)));
  });
  lightbox.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    showPhoto(currentPhoto + (event.key === 'ArrowLeft' ? -1 : 1));
  });
}

function playfulPages(){
 const themes={
  vehicles:{label:'Voertuigen · kies je rit',note:'Ramen open. Haren in de wind.',title:'INSTAPPEN.',accent:'EN GAAN!',copy:'Rustig tuffen in een Topolino, de zandwegen op met een buggy of op twee wielen door Twente. Waar stappen jullie op?',photo:3,small:2,stamp:'Jullie rit.<br>Jullie tempo.',caption:'Tuffen door ’t Tukkerland',links:[['Samen toeren','/toer/voertuigen/?categorie=samen'],['Op twee wielen','/toer/voertuigen/?categorie=tweewielers'],['Liever off-road?','/toer/voertuigen/?voertuig=5']]},
  activities:{label:'Activiteiten · samen beleven',note:'Een beetje lef. Een hoop lol.',title:'DOE MAAR',accent:'LEKKER MEE!',copy:'Wie schiet er raak? Wie kraakt de code? En wie wil gewoon lekker op ontdekking? Kies iets leuks voor jullie hele club.',photo:24,small:45,stamp:'Samen uit.<br>Samen lol.',caption:'Herinneringen maak je samen',links:[['Actief & Spelen','/toer/activiteiten/?categorie=actief'],['Speuren & Puzzelen','/toer/activiteiten/?categorie=speuren'],['Proeven & Ontdekken','/toer/activiteiten/?categorie=proeven']]},
  food:{label:'Eten & Drinken · schuif gezellig aan',note:'Van al dat toeren krijg je trek.',title:'LEKKER ETEN.',accent:'LANG TAFELEN.',copy:'Eerst koffie met iets lekkers. Een fijne lunch tussendoor. En na de laatste bocht? Samen aan tafel. Daar maken we graag tijd voor.',photo:70,small:55,stamp:'Goede trek?<br>Schuif aan!',caption:'Nog eentje dan. Het is gezellig.',links:[['Eerst koffie','/toer/eten-drinken/?categorie=ontvangst'],['Lunchtijd','/toer/eten-drinken/?categorie=lunch'],['Samen tafelen','/toer/eten-drinken/?categorie=diner']]},
  arrangements:{label:'Arrangementen · mix je dag',note:'Een ritje. Iets leuks. Iets lekkers.',title:'ALLES ERBIJ.',accent:'DA’S EEN DAG!',copy:'Toeren en tafelen, avontuur en barbecue of zelf pizza bakken na jullie rit. Kies een voorbeeldcombinatie of mix gewoon je eigen dag.',photo:3,small:49,stamp:'Zelf mixen?<br>Mag ook!',caption:'Van eerste rit tot laatste borrel',links:[['Bekijk de combinaties','#aanbod'],['Zelf samenstellen','/toer/mijn-toer/'],['Iets lekkers erbij','/toer/eten-drinken/']]},
  plan:{label:'Mijn toer · jullie eigen plan',note:'Jullie kiezen. Wij denken mee.',title:'DIT WORDT',accent:'JULLIE DAG.',copy:'Een favoriet voertuig, een leuke activiteit en iets lekkers erbij. Verzamel jullie ideeën en zet je dag op een rij. Dit blijft een conceptaanvraag.',photo:3,small:49,stamp:'Kies. Mix.<br>Beleef!',caption:'Een dag met jullie eigen draai',links:[['Kies je favorieten','#aanbod'],['Topolino-testboeking','/toer/boeken/'],['Even overleggen','/toer/contact/']]},
  info:{label:'Handig om te weten · voor vertrek',note:'Eerst even dit. Dan lekker op pad.',title:'GOED GEREGELD.',accent:'FIJN OP PAD.',copy:'Met welk rijbewijs mag je rijden? Waar vertrek je? En kunnen de kinderen mee? Bekijk de handige informatie en stem jullie wensen vooraf af.',photo:45,small:3,stamp:'Even lezen.<br>Dan beleven!',caption:'Zo beginnen jullie ontspannen',links:[['Veelgestelde vragen','#aanbod'],['Bekijk voertuigen','/toer/voertuigen/'],['Vraag het ons','/toer/contact/']]},
  contact:{label:'Contact · TwenteToer Ootmarsum',note:'Een wild idee? Vertel maar!',title:'KOM MAAR OP',accent:'MET DAT PLAN.',copy:'Een dag met de familie, op pad met collega’s of gewoon zin in iets leuks? Bel of mail TwenteToer en vertel wat jullie in gedachten hebben.',photo:3,small:54,stamp:'Tot zo<br>in Twente!',caption:'Het begint met een goed idee',links:[['Bel TwenteToer','tel:+31541296459'],['E-mail TwenteToer','mailto:info@twentetoer.nl'],['Eerst inspiratie','/toer/arrangementen/']]}
 };
 const t=themes[page],head=$('.page-head');if(!t||!head)return;
 document.body.classList.add('playful-page','mood-'+page);
 head.className='page-head outing-intro';head.innerHTML=`<div class="outing-copy"><div class="eyebrow">${t.label}</div><span class="handwritten">${t.note}</span><h1>${t.title}<br><em>${t.accent}</em></h1><p>${t.copy}</p><div class="outing-links">${t.links.map(([label,url])=>`<a href="${url}">${label}</a>`).join('')}</div></div><div class="outing-scene"><figure class="outing-photo"><img src="${photo(items.find(x=>x.id===t.photo))}" alt="${esc(items.find(x=>x.id===t.photo).name)} bij TwenteToer"><figcaption>${t.caption}</figcaption></figure><figure class="outing-snapshot"><img src="${photo(items.find(x=>x.id===t.small))}" alt="${esc(items.find(x=>x.id===t.small).name)}"><figcaption>${page==='food'?'Begin maar met iets lekkers.':page==='activities'?'Ook rustig genieten mag.':page==='contact'?'Met iets lekkers erbij.':'Samen eropuit!'}</figcaption></figure><span class="outing-stamp">${t.stamp}</span><svg class="outing-scribble" viewBox="0 0 130 50" aria-hidden="true"><path d="M4 34C31 2 60 50 90 14M81 12l15-5-3 17" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg></div>`;
 const next=head.nextElementSibling;if(next)next.id='aanbod';
}

$('#menu-toggle').onclick=()=>{const n=$('#nav'),open=n.classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',open)};$('#detail-close').onclick=()=>$('#detail').close();$('#detail').addEventListener('click',e=>{if(e.target===$('#detail')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}});document.querySelectorAll('nav [data-page]').forEach(a=>{if(a.dataset.page===(page==='buggy'?'vehicles':page))a.setAttribute('aria-current','page')});if(page==='home')home();else if(page==='food')foodCatalog();else if(page==='activities')activityCatalog();else if(page==='vehicles')vehicleCatalog();else if(page==='arrangements')arrangements();else if(page==='plan')plan();else if(page==='info')info();else contact();playfulPages();updateCount();

function syncOutingCategory() {
  const filter = document.querySelector('[data-food][aria-pressed="true"], [data-activity][aria-pressed="true"], [data-vehicle][aria-pressed="true"]');
  const selected = filter?.dataset.food ?? filter?.dataset.activity ?? filter?.dataset.vehicle
    ?? new URLSearchParams(location.search).get('categorie');
  document.querySelectorAll('.outing-links a').forEach(link => {
    const target = new URL(link.href);
    if (selected && target.pathname === location.pathname && target.searchParams.get('categorie') === selected) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

syncOutingCategory();
document.addEventListener('click', event => {
  if (event.target.closest('button[data-food], button[data-activity], button[data-vehicle]')) {
    syncOutingCategory();
  }
});


function season2027(){const bar=document.createElement('a');bar.className='season-ribbon';bar.href='/toer/mijn-toer/?datum=2027-03-01#aanbod';bar.innerHTML='<span class="season-ticket">2027</span><span><b>Een nieuw jaar. Een hoop mooie plannen!</b><small>De agenda is open · uitjes vanaf 1 maart 2027</small></span><strong>Plan jullie uitje</strong>';document.querySelector('header').after(bar);if(page==='home'){const section=document.createElement('section');section.className='season-party wrap';section.innerHTML='<div class="season-calendar"><span>MAART</span><b>01</b><small>2027 · we gaan weer!</small></div><div class="season-copy"><span class="handwritten">Voorpret begint met een datum.</span><h2>2027? ZET IETS LEUKS<br>IN DE AGENDA!</h2><p>Een ritje met de familie, een dag vol lol met collega’s of gewoon samen eropuit. De agenda voor 2027 is geopend voor uitjes vanaf 1 maart.</p><a class="cta green" href="/toer/mijn-toer/?datum=2027-03-01#aanbod">Maak jullie plannen voor 2027</a></div>';document.querySelector('.home-hero').after(section)}}season2027();

if(page==='vehicles'){const requested=Number(new URLSearchParams(location.search).get('voertuig'));if(requested&&items.some(p=>p.id===requested&&p.group==='vehicles'))detail(requested)}

// Keep the WordPress introduction inside the copy column, not in the grid itself.
if (window.TWENTE_PAGE?.content) {
  const intro = page === 'home'
    ? document.querySelector('.home-hero .hero-copy')
    : document.querySelector('.outing-copy')
      ?? document.querySelector('.buggy-hero-grid > div')
      ?? document.querySelector('.page-head');

  if (intro) {
    const editable = document.createElement('div');
    editable.className = 'tt-wordpress-content';
    editable.innerHTML = window.TWENTE_PAGE.content;
    const note = intro.querySelector(':scope > .handwritten');
    if (note) editable.prepend(note);
    intro.querySelector('h1')?.remove();
    intro.querySelector('p')?.remove();
    intro.prepend(editable);
  }
}
