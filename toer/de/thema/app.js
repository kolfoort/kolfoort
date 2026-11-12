import{initPlanner}from'./planner.js?v=20261111-hoofdletters';
const items=window.TWENTE_DATA;
const compareTitle = new Intl.Collator("de", {sensitivity: 'base', numeric: true}).compare;
const byName = (a, b) => compareTitle(a.name, b.name);
const byPrice = (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity) || byName(a, b);

const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),money=n=>new Intl.NumberFormat("de-DE",{style:'currency',currency:'EUR'}).format(n),groupLabel={vehicles:"Fahrzeuge",activities:"Aktivitäten",food:"Essen & Trinken"};let chosen=[];try{chosen=JSON.parse(localStorage.getItem('toer-plan')||'[]').filter(id=>items.some(p=>p.id===id))}catch{}const page=document.body.dataset.page||'home';
function photo(p){return p?.image||'/toer/thema/assets/item-3.jpg'}
function card(p){if(p.id===5)return `<article class="card buggy-card"><a class="card-photo" href="/toer/de/voertuigen/?voertuig=5" aria-label="Buggy-Erlebnis ansehen"><img loading="lazy" src="${photo(p)}" alt="Offroad-Buggy-Fahren bei TwenteToer"></a><div class="card-body"><span class="tag">Wirklich geländegängig · unter Aufsicht</span><h3>Buggy Experience</h3><p>Eine einstündige Fahrt auf den unbefestigten Straßen rund um Ootmarsum. Staub, Schlamm und ein breites Grinsen.</p><div class="card-bottom"><div class="price"><small>Pro Person · 1 Stunde</small><b>€ 60,00</b></div><button class="cta green" data-add="5">Zu „Meine Tour“ hinzufügen</button></div><a class="textlink" href="/toer/de/voertuigen/?voertuig=5">Entdecken Sie die Buggyfahrt</a></div></article>`;return `<article class="card"><button class="card-photo" data-detail="${p.id}" aria-label="Siehe ${esc(p.name)}"><img loading="lazy" src="${photo(p)}" alt="${esc(p.name)} bei TwenteToer"></button><div class="card-body"><span class="tag">${groupLabel[p.group]} · Ootmarsum</span><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><div class="card-bottom"><div class="price"><small>${p.price!==null?"Ab":"Preis"}</small><b>${p.price!==null?money(p.price):"Auf Anfrage"}</b></div><button class="cta green" data-add="${p.id}">Zu „Meine Tour“ hinzufügen</button></div><button class="textlink card-details" data-detail="${p.id}">Optionen anzeigen</button></div></article>`}
function bind(){document.querySelectorAll('[data-detail]').forEach(b=>b.onclick=()=>detail(Number(b.dataset.detail)));document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>add(Number(b.dataset.add)))}
function add(id){if(!chosen.includes(id))chosen.push(id);localStorage.setItem('toer-plan',JSON.stringify(chosen));updateCount();if(page==='plan')renderSelection();$('#detail').close();toast("Zu „Meine Tour“ hinzugefügt")}
function updateCount(){document.querySelectorAll('.plan-count').forEach(e=>{e.textContent=chosen.length?String(chosen.length):'';e.hidden=chosen.length===0})}
function toast(text){$('#toast').textContent=text;if(text==="Zu „Meine Tour“ hinzugefügt"){const link=document.createElement('a');link.href='/toer/de/mijn-toer/#aanbod';link.textContent="Ansehen und bezahlen";$('#toast').append(link)}$('#toast').hidden=false;setTimeout(()=>$('#toast').hidden=true,6000)}
function drinksMenu(id){if(![52,76].includes(id))return '';const group=(title,drinks)=>`<section><h3>${title}</h3><ul>${drinks.map(d=>`<li>${d}</li>`).join('')}</ul></section>`;return `<div class="drinks-menu"><div class="drinks-included">${id===52?"Standardsortiment + Premium-Extras 12,00 € Aufpreis":"Im Standard-Getränkepaket enthalten · 0,00 € Aufpreis"}</div>${id===52?`<div class="drinks-premium">${group("Besondere Biere",["Texel","Othmar-Bier"])}${group("Mixgetränke",["Gin Tonic","Bacardi-Cola","Wodka Sprite","Weitere Mixgetränke aus dem Premium-Sortiment"])}<p>Alle unten aufgeführten Standardgetränke sind ebenfalls enthalten.</p></div>`:''}<div class="drinks-groups">${group("Erfrischungsgetränke",['Coca-Cola',"Coca Cola Zero","Fanta-Orange",'Fanta Cassis','Sprite'])}${group("Königliche Glückseligkeit",['Ginger Ale',"BitterLemon",'Signature Tonic Water',"Ingwerbier","Rosa aromatische Beere"])}${group("Wasser & Frisch",['Chaudfontaine Still','Chaudfontaine Sparkling','Rivella'])}${group("Eistee und Saft",["Fuze Tea Grüner Tee","Fuze Tea Pfirsich",'Fuze Tea Mango',"Fuze Tee Zitrone",'Minute Maid Orange','Minute Maid Apple'])}${group("Flaschenbier",["Grolsch-Pfeife · Premium-Pilsner","Grolsch 0,0 %",'Grolsch Radler 2%','Grolsch Radler 0,0%'])}${group("Wein vom Fass",["Weiß · Sauvignon Blanc · Domaine la Colombette, Frankreich","Rosé · Grenache · Domaine la Colombette, Frankreich","Rot · Puech D'hortes · Domaine la Colombette, Frankreich","Süß · Rheinhessen, Deutschland"])}</div><p class="drinks-footnote">Der Zuschlag ist Bestandteil der Getränkepauschale; 0,00 € bedeutet kein Aufpreis, keine kostenlosen Getränke. Alkohol nur ab 18 Jahren.</p></div>`}
const routeAppLinks = `<div class="actions">
      <a class="textlink" href="https://apps.apple.com/nl/app/twentetoer/id1469183012">App Store</a>
      <a class="textlink" href="https://play.google.com/store/apps/details?id=com.thar.edityourapp.twentetoer">Google Play</a>
    </div>`;

function eChopperDetails(id) {
  if (id !== 2) return '';
  return `<section>
    <h3>Unterwegs mit dem E-Chopper</h3>
    <p>Steig auf den elektrischen E-Chopper und entdecke Ootmarsum und die Landschaft von Twente. Der E-Chopper ist leicht zu fahren. Fahrt gemeinsam über kurvige Landstraßen und genießt die Ruhe und die Aussicht.</p>
  </section>
  <section>
    <h3>Auf einen Blick</h3>
    <p>Ob zu zweit oder mit Freunden: Auf dem elektrischen E-Chopper könnt ihr euch Zeit für kleine Landstraßen und weite Ausblicke nehmen. Helm und Haarnetz sind dabei. Zum Fahren braucht ihr einen gültigen Führerschein für das Fahrzeug.</p>
  </section>
  <section>
    <h3>E-Chopper mit Kindern</h3>
    <p>Kinder von 5 bis einschließlich 10 Jahren dürfen kostenlos mitfahren. Mit einem Beifahrer beträgt die Mietdauer höchstens 2 Stunden, weil die Reichweite sinkt. Fahrer und Beifahrer dürfen zusammen höchstens 120 kg wiegen.</p>
    <p>Wir bieten Helme mit Haarnetzen für Kinder und Erwachsene an. Die kleinste Helmgröße ist S.</p>
    <p>Mit einem Kind unterwegs? Schau dir auch den <a class="textlink" href="https://www.twentetoer.nl/voertuigen/goccia/">E-Puch</a> an.</p>
  </section>
  <section>
    <h3>Routen in der App</h3>
    <p>Lade vor der Abfahrt die kostenlose TwenteToer-App herunter. Wähle eine Route passend zur Mietdauer, durch Wälder und Wiesen in Twente oder direkt hinter der Grenze in Deutschland. Du kannst auch selbst eine Route planen.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Mietpreise und praktische Informationen</h3>
    <p>Pro E-Chopper: 2 Stunden 30 €, 3 Stunden 35 €, 4 Stunden 40 €, 5 Stunden 45 €. Die Tagesmiete kostet 50 €.</p>
    <ul>
      <li>Mit vollem Akku sind bis zu 40 km möglich. Mit Beifahrer sinkt die Reichweite.</li>
      <li>Abfahrt in Ootmarsum. TwenteToer bietet Hilfe unterwegs und bei schlechtem Wetter eine kostenlose Umbuchung an.</li>
      <li>Für den E-Chopper gibt es keinen Kindersitz. Dafür empfiehlt TwenteToer den E-Puch.</li>
    </ul>
  </section>
  <section>
    <h3>Den E-Chopper mit einem Ausflug kombinieren</h3>
    <p>Fahrt mit einem Guide durch die Gegend, erkundet die Route mit einer Fotosuche oder kombiniert die Tour mit Mittagessen, Pizza, Grillen oder einer Snackplatte. Auch F1-Simracing und Schießspiele stehen auf der TwenteToer-Seite zur Auswahl.</p>
  </section>`;
}

function topolinoDetails(id) {
  if (id !== 3) return '';
  return `<section>
    <h3>Topolino Dolce Vita in Ootmarsum</h3>
    <p>Im vollelektrischen Fiat Topolino erlebt ihr Twente unter freiem Himmel. Der kleine Zweisitzer im Retro-Stil passt zu den schmalen Straßen von Ootmarsum und den kurvigen Wegen zwischen Wiesen und alten Bauernhöfen.</p>
    <p>Öffnet das Verdeck, genießt die Sonne und macht unterwegs eine Pause auf einer Terrasse. Der elektrische Antrieb sorgt für eine ruhige Fahrt, bei der ihr die Umgebung in eurem Tempo entdecken könnt.</p>
  </section>
  <section>
    <h3>Auf einen Blick</h3>
    <p>Offenes Cabrio, vollelektrischer Antrieb und ausgearbeitete Routen durch Twente. In jedem Topolino ist Platz für zwei Personen.</p>
  </section>
  <section>
    <h3>Dolce Vita in Twente</h3>
    <p>Auch mit Freunden könnt ihr gemeinsam losfahren und euch auf mehrere Topolinos verteilen. In den Dörfern fällt der kleine Fiat schnell auf.</p>
    <p>Erkundet Ootmarsum zu zweit im vollelektrischen Fiat Topolino. Das kleine Cabrio hat statt Türen ein Einstiegsseil und ein Verdeck, das ihr selbst öffnen und schließen könnt. Für eure Lieblingsmusik könnt ihr euer Handy mit einem Bluetooth-Lautsprecher verbinden.</p>
  </section>
  <section>
    <h3>Routen in der TwenteToer-App</h3>
    <p>Ladet die kostenlose App vor der Abfahrt herunter und steckt das Handy in die Halterung am Armaturenbrett. Die Routen führen an Natur, Sehenswürdigkeiten und Terrassen vorbei.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Mietpreise und Bedingungen</h3>
    <p><strong>2 Stunden 30 € · 3 Stunden 40 € · 4 Stunden 50 €</strong> pro Person bei zwei Personen pro Fahrzeug. Die Mietpreise stammen von der TwenteToer-Website. In der Buchungsdemo gelten eigene Testpreise.</p>
    <ul>
      <li>Höchstens zwei Personen pro Fahrzeug. Haustiere sind nicht erlaubt.</li>
      <li>Fahrer müssen mindestens 24 Jahre alt sein und seit mindestens einem Jahr einen Führerschein der Klasse B haben.</li>
      <li>Bis zu 75 km Reichweite. Das Fahrzeug darf nur auf den vorgesehenen Routen genutzt werden und ist mit GPS gegen Missbrauch ausgestattet.</li>
      <li>Keine Kaution. Mehrwertsteuer und Kfz-Haftpflichtversicherung sind im Preis enthalten.</li>
    </ul>
  </section>
  <section>
    <h3>Den Topolino mit einem Ausflug kombinieren</h3>
    <p>Nach der Fahrt könnt ihr euch zum Grillen mit Getränken und Softeis, zu warmen und kalten Tapas oder zum Mittagessen treffen. Beim Pizza-Arrangement belegt ihr eure Pizza selbst.</p>
    <p>Für Gruppen gibt es eine Rallye mit Roadbook, eine QR-Schnitzeljagd oder die Escapebox „Het Verloren Goud“. Wer unterwegs etwas probieren möchte, kann die Fahrt mit „Proef de Boer“ oder einem High Tea bei Dennenoord in Vasse verbinden.</p>
    <p><a class="textlink" href="/toer/de/arrangementen/">Arrangements ansehen</a></p>
  </section>`;
}

const eBikeRentalInfo = `<p><strong>1 Tag 25 € · 2 Tage 45 € · 3 Tage 60 € · 4 Tage 75 € · 5 Tage 90 € · 6 Tage 100 € · 7 Tage 110 €</strong> pro Fahrrad.</p><p>Abholung ab 10 Uhr, Rückgabe spätestens um 18 Uhr. Bei früherer Rückgabe gilt der volle Mietpreis. Das Ladegerät steckt in der kostenlosen Fahrradtasche. Die Sattelhöhe stellt ihr mit dem Schnellspanner ein.</p>`;

function rentalVehicleDetails(id) {
  switch (id) {
    case 1:
      return `<section>
    <h3>Mit dem TukTuk durch Ootmarsum</h3>
    <p>Sobald der Motor läuft, hört ihr, woher der Name TukTuk kommt. Ihr fahrt selbst auf einer ausgearbeiteten Route durch Twente. Unterwegs könnt ihr ein Picknick oder ein Teamspiel einplanen. Das TukTuk hat drei Sitzplätze und ist ganzjährig mietbar.</p>
    <p>TwenteToer vermietet ein TukTuk. Für größere Gruppen bietet sich der <a class="textlink" href="/toer/de/voertuigen/?voertuig=3">Topolino</a> an. Ihr könnt die Fahrt auch mit einem <a class="textlink" href="/toer/de/voertuigen/?voertuig=2">E-Chopper</a> kombinieren.</p>
  </section>
  <section>
    <h3>Unterwegs mit Kindern</h3>
    <p>Bringt bei Bedarf euren eigenen Kindersitz mit. Das TukTuk hat kein Isofix. In der kostenlosen TwenteToer-App findet ihr Routen, die etwa an einem Streichelzoo, einer Sternwarte oder einem Spielplatz vorbeiführen.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Mietpreise und Hinweise</h3>
    <p>Pro TukTuk zahlt ihr <strong>50 € für 1 Stunde</strong> oder <strong>75 € für 2 Stunden</strong>. Mehrwertsteuer und Kfz-Haftpflichtversicherung sind inklusive.</p>
    <ul>
      <li>Fahrer müssen mindestens 20 Jahre alt sein, einen Motorradführerschein der Klasse A oder A1 besitzen und vorab eine Proberunde fahren.</li>
      <li>Höchstens drei Personen. Haustiere sind nicht erlaubt.</li>
      <li>Abholung und Start in Ootmarsum. TwenteToer liefert das Fahrzeug nicht aus.</li>
    </ul>
  </section>`;
    case 4:
      return `<section>
    <h3>Unterwegs mit dem Cooper</h3>
    <p>Erkundet Ootmarsum und Umgebung auf einem Elektroroller mit breiten Reifen und markantem Design. Mit dem leisen Motor könnt ihr entspannt an Wäldern und sanft gewellten Wiesen vorbeifahren oder einen Abstecher ins Zentrum von Ootmarsum machen.</p>
    <p>Der Cooper eignet sich für eine Fahrt mit Freunden, einen Teamausflug oder einen Tag zu zweit. Auf der Fahrzeugseite ist ein Preis von <strong>45 €</strong> angegeben.</p>
  </section>`;
    case 6:
      return `<section>
    <h3>Twente auf der Lambretta erkunden</h3>
    <p>Mit diesem italienischen Roller fahrt ihr bis zu 45 km/h durch die Dörfer und das Umland von Twente. Ob für einen halben oder einen ganzen Tag, unterwegs bleibt Zeit für eine Pause auf der Terrasse oder einen Abstecher über die deutsche Grenze.</p>
  </section>
  <section>
    <h3>Die schönsten Routen</h3>
    <p>Folgt einer Route aus der kostenlosen TwenteToer-App, orientiert euch an den Knotenpunkten oder plant eure eigene Tour. Unterwegs könnt ihr für einen Kaffee, ein Foto oder eine regionale Spezialität anhalten.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Stilvoll und sicher</h3>
    <p>Der Roller bietet Platz für zwei Personen. Der Fahrer braucht Fahrpraxis und muss vorab eine Proberunde fahren. Ein Helm ist Pflicht. Mitfahrende müssen mindestens 12 Jahre alt sein.</p>
  </section>
  <section>
    <h3>Mietpreise und Hinweise</h3>
    <p><strong>4 Stunden 40 € · 8 Stunden 75 €</strong> pro Lambretta. Eine zweite Person fährt kostenlos mit. Mehrwertsteuer und Kfz-Haftpflichtversicherung sind inklusive.</p>
    <p>Ihr übernehmt den Roller vollgetankt und gebt ihn vollgetankt zurück. Ihr könnt E5 oder E10 tanken.</p>
  </section>`;
    case 7:
      return `<section>
    <h3>Mit der Goccia unterwegs</h3>
    <p>Wegen ihres Retro-Designs wird dieses Elektromoped in Twente auch E-Puch genannt. Es fährt leise und bietet Platz für einen Erwachsenen und eine mitfahrende Person bis etwa 14 Jahre.</p>
  </section>
  <section>
    <h3>Routen rund um Ootmarsum</h3>
    <p>Fahrt etwa nach Denekamp, ins Lutterzand oder zum Stift in Weerselo. Ladet die kostenlose App herunter, steckt das Handy in die Lenkerhalterung und folgt der Route. Die Reichweite beträgt rund 60 km und sinkt mit einer zweiten Person.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Goccia mit Kindern</h3>
    <p>Die Goccia wiegt höchstens 55 kg und ist wendig. Hinten gibt es einen Sitz mit Haltegriff und Fußstützen. Kinder müssen sich selbst festhalten können. Die kleinste Helmgröße ist S.</p>
    <p>Für 11- bis 16-Jährige ohne Führerschein nennt TwenteToer Beachcruiser, Fatbike und Fatmax als Alternativen.</p>
  </section>
  <section>
    <h3>Mietpreise und Hinweise</h3>
    <p><strong>2 Stunden 30 € · 3 Stunden 35 € · 4 Stunden 40 €</strong> pro Goccia. Eine zweite Person fährt kostenlos mit.</p>
    <p>Ein gültiger Führerschein für das Fahrzeug und ein Helm sind Pflicht. Ein Haarnetz ist inklusive. TwenteToer bietet Hilfe unterwegs.</p>
  </section>`;
    case 8:
      return `<section>
    <h3>Roller mieten in Ootmarsum</h3>
    <p>Auf dem Euro-5-Roller fahrt ihr mit 25 km/h über die Landstraßen rund um Ootmarsum. Der Roller hat zwei Plätze. Eine zweite Person fährt kostenlos mit. Helm und Haarnetz sind inklusive.</p>
  </section>
  <section>
    <h3>Rollertour durch Twente</h3>
    <p>Fahrt durch das Zentrum von Ootmarsum oder dreht eine Runde über Denekamp, Singraven und das Lutterzand. Mit vollem Tank sind rund 125 km möglich.</p>
  </section>
  <section>
    <h3>Unterwegs mit Kindern</h3>
    <p>Macht unterwegs an einem Spielplatz oder Bauernhof Halt. Für ältere Kinder kommt das Fatbike infrage. Dafür gilt eine Mindestkörpergröße von 155 cm. Für diesen Roller gibt es keinen Kindersitz. Dafür verweist TwenteToer auf die <a class="textlink" href="/toer/de/voertuigen/?voertuig=7">Goccia E-Puch</a>.</p>
  </section>
  <section>
    <h3>Einen ganzen Tag unterwegs</h3>
    <p>Die Tagesmiete kostet 47,50 €. Abholung ist ab 10 Uhr möglich, auch später am Tag. Gebt den Roller um 17 Uhr mit vollem Tank zurück. Tankt dafür Euro 98.</p>
  </section>
  <section>
    <h3>Mietpreise und Hinweise</h3>
    <p><strong>2 Stunden 30 € · 3 Stunden 35 € · 4 Stunden 40 € · Tagesmiete 47,50 €</strong> pro Roller.</p>
    <p>Ein gültiger Führerschein für das Fahrzeug ist Pflicht. Mehrwertsteuer und Kfz-Haftpflichtversicherung sind inklusive. Bei stundenweiser Miete ist auch der Kraftstoff enthalten.</p>
  </section>`;
    case 9:
      return `<section>
    <h3>Unterwegs mit dem Fatmax E-Kickbike</h3>
    <p>Mit dem elektrischen Tretroller auf breiten Reifen fahrt ihr bis zu 25 km/h durch Ootmarsum und die umliegende Natur. Nach einer Einweisung und einer Proberunde könnt ihr mit Freunden, Familie oder Kollegen losfahren.</p>
  </section>
  <section>
    <h3>Ab 16 Jahren</h3>
    <p>TwenteToer gibt für das Fatmax ein Mindestalter von 16 Jahren an. Ein Führerschein ist nicht nötig. Ihr könnt die Tour mit einem E-Chopper kombinieren. Für Jüngere nennt TwenteToer das Fatbike als Alternative.</p>
  </section>
  <section>
    <h3>Routen in der App</h3>
    <p>Wählt in der kostenlosen TwenteToer-App eine Route passend zur Akkureichweite. Unterwegs könnt ihr in einem Café oder Restaurant einkehren oder etwa das Haus Singraven besichtigen.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Mietpreise und Hinweise</h3>
    <p><strong>1 Stunde 25 € · 2 Stunden 30 € · 3 Stunden 35 €</strong> pro Fatmax. Die Reichweite beträgt bis zu 30 km. Bringt für Gepäck einen Rucksack mit. Mehrwertsteuer und Kfz-Haftpflichtversicherung sind inklusive. Ihr startet in Ootmarsum und bekommt unterwegs Hilfe. Bei schlechtem Wetter ist eine kostenlose Umbuchung möglich.</p>
  </section>
  <section>
    <h3>Die Fahrt kombinieren</h3>
    <p>Fahrt mit einem Guide, nehmt eine gefüllte Provianttasche mit oder rundet die Tour mit Grillen, Buffet oder High Tea ab. TwenteToer bietet auch eine Kombination mit einer Escapebox an.</p>
  </section>`;
    case 10:
      return `<section>
    <h3>Unterwegs mit dem Fatbike</h3>
    <p>Das elektrische Fatbike hat breite Reifen und eine kräftige Tretunterstützung. Fahrt über die Sandwege des Springendals, vorbei an Quellteichen und Heide oder Richtung Singraven und Bad Bentheim. Laut TwenteToer erreicht das Rad rund 24 km/h. Ein Führerschein ist nicht nötig.</p>
  </section>
  <section>
    <h3>Mit Kindern unterwegs</h3>
    <p>Der kleine Rahmen lässt sich einstellen. Laut Mietbedingungen gilt eine Mindestkörpergröße von 155 cm. Jede Person fährt auf einem eigenen Fatbike.</p>
  </section>
  <section>
    <h3>Mietpreise und Hinweise</h3>
    <p><strong>2 Stunden 25 € · 3 Stunden 30 € · 4 Stunden 35 €</strong> pro Fatbike. Die Reichweite beträgt bis zu 50 km und der Motor hat 250 Watt. TwenteToer weist euch eines von zwei Modellen zu. Bei schlechtem Wetter ist eine kostenlose Umbuchung möglich. Kostenlose Routen findet ihr in der App.</p>
    ${routeAppLinks}
  </section>`;
    case 11:
      return `<section>
    <h3>Unterwegs mit dem Beachcruiser</h3>
    <p>Der elektrische Beachcruiser verbindet einen Retrorahmen mit breiten Reifen und Tretunterstützung. Fahrt über Wald- und Sandwege rund um Ootmarsum und Vasse oder Richtung Denekamp und deutsche Grenze.</p>
  </section>
  <section>
    <h3>Auch für Kinder</h3>
    <p>Ein Führerschein ist nicht nötig. Der Beachcruiser eignet sich ab 160 cm Körpergröße. Eltern können die Fahrt etwa mit einem E-Chopper kombinieren. Die kostenlose TwenteToer-App enthält Fahrradrouten.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Mietpreise und Hinweise</h3>
    <p><strong>2 Stunden 30 € · 3 Stunden 35 €</strong> pro Beachcruiser. Die Reichweite beträgt rund 35 km. Das Rad ist für eine Person ausgelegt. Ein Kindersitz ist nicht möglich. Bringt für Gepäck einen Rucksack mit. Abholung und Start sind in Ootmarsum.</p>
  </section>`;
    case 12:
      return `<section>
    <h3>Fahrradverleih in Ootmarsum</h3>
    <p>Erkundet das Springendal zwischen Ootmarsum und Vasse, fahrt nach Singraven bei Denekamp oder über die Grenze Richtung Bad Bentheim. Das gepflegte E-Bike hat eine Handyhalterung am Lenker.</p>
  </section>
  <section>
    <h3>Routen und Hilfe unterwegs</h3>
    <p>Wählt eine kostenlose Route in der TwenteToer-App. Bei einem platten Reifen oder einem technischen Defekt bemüht sich TwenteToer darum, schnell ein Ersatzrad zu bringen.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Mietpreise und Hinweise</h3>
    <p>Geeignet für eine Körpergröße von etwa 1,45 bis 1,90 m. Die Reichweite beträgt rund 80 km.</p>
    ${eBikeRentalInfo}
  </section>`;
    case 13:
      return `<section>
    <h3>E-Bike mit großem Rahmen</h3>
    <p>Fahrt zum Kuiperberg, durch das Springendal oder Richtung Denekamp. Bei klarer Sicht könnt ihr vom Kuiperberg aus Richtung Enschede, Hengelo, Almelo und Lingen blicken.</p>
  </section>
  <section>
    <h3>Routen und Hilfe unterwegs</h3>
    <p>Wählt eine kostenlose Route in der TwenteToer-App oder plant eure eigene Tour entlang der Radknotenpunkte. Bei einer Panne bemüht sich TwenteToer schnell um Ersatz.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Mietpreise und Hinweise</h3>
    <p>Geeignet ab 1,80 m Körpergröße. Die Reichweite beträgt rund 70 km.</p>
    ${eBikeRentalInfo}
  </section>`;
    case 14:
      return `<section>
    <h3>Unterwegs mit dem E-Mountainbike</h3>
    <p>Entdeckt die Natur rund um Ootmarsum auf einem E-Mountainbike mit Mittelmotor und rund 70 km Reichweite. Die Tretunterstützung hilft an Steigungen und auf Sandwegen.</p>
  </section>
  <section>
    <h3>Abseits der Straße in Twente</h3>
    <p>Fahrt durch Wälder und Heide im Springendal oder wählt eine Mountainbikestrecke im deutsch-niederländischen Grenzgebiet. Im Springendal gibt es ausgeschilderte Routen in verschiedenen Längen.</p>
  </section>
  <section>
    <h3>Die passende Route wählen</h3>
    <p>Der Mittelmotor unterstützt Freizeitradler und erfahrene Mountainbiker. In der kostenlosen TwenteToer-App findet ihr weitere Routenvorschläge.</p>
    ${routeAppLinks}
  </section>
  <section>
    <h3>Mietpreis</h3>
    <p>Auf der Fahrzeugseite ist ein Preis von <strong>25 €</strong> angegeben.</p>
  </section>`;
    case 15:
      return `<section>
    <h3>Stadtrad in Ootmarsum</h3>
    <p>Das Stadtrad hat sieben Gänge und wird mit einer Fahrradtasche vermietet. TwenteToer bietet Hilfe unterwegs. Auf der Fahrzeugseite ist ein Preis von <strong>13,50 €</strong> angegeben.</p>
  </section>`;
    case 16:
      return `<section>
    <h3>Unterwegs mit dem elektrischen Lastenrad</h3>
    <p>Fahrt mit den Kindern ins Springendal oder Richtung Singraven bei Denekamp. Die Box bietet auch Platz für Einkäufe. Die Reichweite beträgt rund 50 km. Haustiere dürfen nicht in der Box mitfahren.</p>
  </section>
  <section>
    <h3>Mit Kindern unterwegs</h3>
    <p>Der Mittelmotor unterstützt euch ab dem Anfahren, auch mit voller Box. Das Lastenrad liegt stabil auf der Straße. TwenteToer nennt ein belastbares Gewicht von 220 kg. Der Rest der Familie kann auf normalen E-Bikes mitfahren.</p>
  </section>
  <section>
    <h3>Mietpreise und Hinweise</h3>
    <p><strong>1 Tag 37,50 € · 2 Tage 62,50 € · 3 Tage 90 € · 7 Tage 155 €</strong> pro Lastenrad. Ihr holt das Rad in Ootmarsum ab. TwenteToer bietet Routen in der App und Hilfe unterwegs.</p>
    ${routeAppLinks}
  </section>`;
    default:
      return '';
  }
}

function dafDetails(id) {
  if (id !== 21) return '';
  return `<section>
    <h3>Unterwegs mit dem DAF YA 126</h3>
    <p>Steigt mit Freunden, Familie oder Kollegen hinten in einen originalen niederländischen Militärlastwagen aus den fünfziger Jahren. Rund um Ootmarsum könnt ihr die Fahrt mit einer Orientierungsaufgabe, einem Escape Game oder einer Wanderung verbinden. Auch für Kindergeburtstage und besondere Gruppenwünsche erstellt TwenteToer ein Angebot.</p>
  </section>
  <section>
    <h3>Preise und Hinweise</h3>
    <p><strong>225 € pro Stunde und Fahrzeug, inklusive Mehrwertsteuer</strong>. Der Lastwagen fährt immer mit Fahrer. Die Tour findet rund um Ootmarsum statt und ist für 6 bis 14 Personen pro Fahrzeug gedacht. Die Abfahrtszeit vereinbart ihr mit TwenteToer.</p>
  </section>
  <section>
    <h3 id="daf-gallery-title">Fotos der Militärfahrzeuge</h3>
    <div class="grid vehicle-photo-grid" data-photo-gallery>
      <a class="card" href="/toer/thema/assets/leger-truck-1.jpg"><img class="card-photo" src="/toer/thema/assets/leger-truck-1.jpg" alt="Fotos der Militärfahrzeuge 1" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/leger-truck-2.jpg"><img class="card-photo" src="/toer/thema/assets/leger-truck-2.jpg" alt="Fotos der Militärfahrzeuge 2" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/leger-truck-3.jpg"><img class="card-photo" src="/toer/thema/assets/leger-truck-3.jpg" alt="Fotos der Militärfahrzeuge 3" loading="lazy"></a>
    </div>
    <dialog class="buggy-lightbox" aria-labelledby="daf-gallery-title">
      <form method="dialog"><button class="close" aria-label="Schließen">×</button></form>
      <img alt="">
      <div class="buggy-lightbox-controls">
        <button type="button" data-gallery-step="-1" aria-label="Vorheriges Foto">←</button>
        <span aria-live="polite"></span>
        <button type="button" data-gallery-step="1" aria-label="Nächstes Foto">→</button>
      </div>
    </dialog>
  </section>`;
}

function buggyDetails(id) {
  if (id !== 5) return '';
  return `<section>
    <h3>Eine Stunde Offroad in Ootmarsum</h3>
    <p>Nach der Einweisung startet ihr selbst den Motor und folgt dem Guide auf einer festen Route. Wo es erlaubt ist, geht es über Sandwege durch den Wald. Das Tempo richtet sich nach der Gruppe. Auf halber Strecke könnt ihr den Fahrer wechseln.</p>
    <ul>
      <li>Der Guide fährt voraus. Überholen ist verboten. Auf öffentlichen Straßen gelten die üblichen Verkehrsregeln.</li>
      <li>Tragt Kleidung, die schmutzig werden darf. TwenteToer verleiht Schutzbrillen und empfiehlt eine Staubmaske. Overalls werden nicht gestellt.</li>
    </ul>
  </section>
  <section>
        <h3>Preise und Hinweise</h3><p><strong>60 € pro Person für eine Stunde Fahrt. Für Kinder gilt derselbe Preis.</strong></p>
        <ul><li>Mindestens 6 Teilnehmende oder ein Mindestbetrag von 360 €.</li><li>Höchstens 10 Teilnehmende pro Gruppe.</li><li>Fahrer müssen mindestens 20 Jahre alt sein und einen Pkw-Führerschein haben. Kinder dürfen ab 5 Jahren mitfahren.</li><li>Start in Ootmarsum. TwenteToer liefert die Buggys nicht aus.</li></ul>
      </section>
  <section><h3>Mehr als 10 Personen?</h3><p>Für größere Gruppen bietet TwenteToer eine zweistündige Kombination an. Bei 18 Personen fährt zum Beispiel eine Hälfte zuerst Buggy, die andere E-Chopper. Nach einer Stunde tauscht ihr die Fahrzeuge. Laut Anbieter gilt derselbe Preis pro Person.</p><a class="textlink" href="/toer/de/contact/">Gruppenausflug abstimmen</a></section>
  <section>
    <h3 id="buggy-gallery-title">Fotoimpressionen</h3>
    <div class="grid vehicle-photo-grid" data-photo-gallery>
      <a class="card" href="/toer/thema/assets/buggy-rit-3.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-3.jpg" alt="Buggyfahrt in Ootmarsum, Foto 3" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-1.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-1.jpg" alt="Buggyfahrt in Ootmarsum, Foto 1" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-9.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-9.jpg" alt="Buggyfahrt in Ootmarsum, Foto 9" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-2.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-2.jpg" alt="Buggyfahrt in Ootmarsum, Foto 2" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-10.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-10.jpg" alt="Buggyfahrt in Ootmarsum, Foto 10" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-6.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-6.jpg" alt="Buggyfahrt in Ootmarsum, Foto 6" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-7.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-7.jpg" alt="Buggyfahrt in Ootmarsum, Foto 7" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-5.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-5.jpg" alt="Buggyfahrt in Ootmarsum, Foto 5" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-11.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-11.jpg" alt="Buggyfahrt in Ootmarsum, Foto 11" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-4.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-4.jpg" alt="Buggyfahrt in Ootmarsum, Foto 4" loading="lazy"></a>
      <a class="card" href="/toer/thema/assets/buggy-rit-8.jpg"><img class="card-photo" src="/toer/thema/assets/buggy-rit-8.jpg" alt="Buggyfahrt in Ootmarsum, Foto 8" loading="lazy"></a>
    </div>
    <dialog class="buggy-lightbox" aria-labelledby="buggy-gallery-title">
        <form method="dialog"><button class="close" aria-label="Schließen">×</button></form>
        <img alt="">
        <div class="buggy-lightbox-controls">
          <button type="button" data-gallery-step="-1" aria-label="Vorheriges Foto">←</button>
          <span aria-live="polite"></span>
          <button type="button" data-gallery-step="1" aria-label="Nächstes Foto">→</button>
        </div>
      </dialog>
  </section>
  <section>
    <h3>Die Buggyfahrt kombinieren</h3>
    <ul>
      <li><a class="textlink" href="https://www.twentetoer.nl/voertuigen/buggy_barbecue_ootmarsum/">Buggy und BBQ All-in</a> · Nach der Fahrt gibt es Grillessen, Softeis und 2,5 Stunden Getränke. Ab 110 €.</li>
      <li><a class="textlink" href="https://www.twentetoer.nl/voertuigen/buggy-en-boogschieten/">Buggy und Bogenschießen</a> · Buggyfahrt mit anschließendem Bogenschießen und zwei Getränken. Ab 80 €.</li>
      <li><a class="textlink" href="https://www.twentetoer.nl/voertuigen/vakantie-buggy-toer/">Ferien-Buggytour</a> · Eine Fahrt für Familien an ausgewählten Tagen in den Schulferien. Ab 35 €.</li>
    </ul>
  </section>`;
}

function detail(id){const p=items.find(x=>x.id===id);$('#detail').classList.toggle('drinks-detail',[52,76].includes(id));$('#detail-content').innerHTML=`<img class="detail-img" src="${photo(p)}" alt="${esc(p.name)}"><div class="detail-pad"><div class="eyebrow">${groupLabel[p.group]} · TwenteToer</div><h2>${esc(p.name)}</h2><p>${esc(p.description)}</p>${eChopperDetails(id)}${topolinoDetails(id)}${rentalVehicleDetails(id)}${dafDetails(id)}${buggyDetails(id)}${drinksMenu(id)}${[3, 5, 10, 21].includes(id) ? '' : `<div class="price"><small>${[52,76].includes(id)?"Aufpreis auf die Getränkepauschale":"Indikativer Startpreis gemäß der vorhandenen Website"}</small><b>${p.price===null?"Auf Anfrage":money(p.price)}</b></div>`}<div class="notice">Der genaue Preis, die Dauer, die Mindestteilnehmerzahl, das Alter und die Führerscheinanforderungen werden je Aktivität bestätigt. Diese Testseite prüft nicht die Verfügbarkeit und nimmt keine Reservierungen vor.</div><div class="actions"><button class="cta green" data-add="${p.id}">${chosen.includes(p.id)?"In „Meine Tour“ gespeichert":"Zu „Meine Tour“ hinzufügen"}</button><a class="cta light" href="/toer/de/mijn-toer/#aanbod">Meine Tour ansehen und bezahlen</a><a class="cta light" href="${p.source}" target="_blank" rel="noopener">Details auf aktueller Website</a></div></div>`;bind();if([5,21].includes(id))bindPhotoGallery($('#detail-content'));$('#detail').showModal()}
function named(term){return items.find(p=>(p.catalogOriginalName || p.name).toLowerCase().includes(term.toLowerCase()))||items[0]}
const headerRides=[['Topolino',"DAS DOLCE VITA-GEFÜHL!",'topolino'],['E-Chopper',"ELEKTRISCH UND GENIESSEN!",'e-chopper'],['Buggy',"ABENTEUER IN TWENTE!",'buggy'],['E-Bike',"ERLEBEN SIE ES AUF DEM FAHRRAD!",'e-bike'],['Fatmax',"ELEKTRISCH AUF ABENTEUER!",'fatmax']];
function photoHeader(){return `<section class="original-photo-header" aria-label="Entdecken Sie TwenteToer"><div class="photo-slider" aria-roledescription="carrousel">${headerRides.map(([name,title,term],i)=>`<div class="photo-slide ${i===0?'active':''}" aria-hidden="${i!==0}"><img src="/toer/thema/assets/header-slide-${i+1}.jpg" alt="${name} fährt in Ootmarsum und Umgebung" ${i?'loading="lazy"':'fetchpriority="high"'}><div class="photo-caption"><h2>${title}</h2></div></div>`).join('')}<div class="photo-controls"><div class="photo-dots">${headerRides.map(([name],i)=>`<button data-slide="${i}" aria-label="Foto anzeigen ${name}" aria-pressed="${i===0}"><span></span></button>`).join('')}</div><button class="photo-pause" aria-label="Diashow anhalten">Pause</button></div></div><nav class="vehicle-brush-row" aria-label="Wählen Sie Ihr Fahrzeug">${headerRides.map(([name,title,term],i)=>`<a href="${term==='buggy'?'/toer/de/voertuigen/?voertuig=5':'/toer/de/voertuigen/?voertuig='+named(term).id}"><span class="brush-disc"><img src="/toer/thema/assets/header-icon-${i+1}.png" alt=""></span><strong>${name}</strong></a>`).join('')}</nav></section>`}
function initPhotoHeader(){let index=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches;const slides=[...document.querySelectorAll('.photo-slide')],dots=[...document.querySelectorAll('[data-slide]')],pause=document.querySelector('.photo-pause');const show=i=>{index=i;slides.forEach((s,n)=>{s.classList.toggle('active',n===i);s.setAttribute('aria-hidden',String(n!==i))});dots.forEach((d,n)=>d.setAttribute('aria-pressed',String(n===i)))};dots.forEach(d=>d.onclick=()=>show(Number(d.dataset.slide)));const label=()=>{pause.textContent=paused?"Spielen":"Pause";pause.setAttribute('aria-label',paused?"Diashow abspielen":"Diashow anhalten")};pause.onclick=()=>{paused=!paused;label()};label();setInterval(()=>{if(!paused&&!document.hidden&&!document.querySelector('.photo-slider:hover')&&!document.querySelector('.photo-slider:focus-within'))show((index+1)%slides.length)},6000)}
function home(){const top=named('topolino'),buggy=named('buggy');const portals=[{title:"FAHRZEUGE",image:top,copy:"Wie wollt ihr unterwegs sein? Ob Topolino, Fahrrad oder Armeelaster – ihr habt die Wahl.",url:'/toer/de/voertuigen/',links:[['Buggy Experience','buggy'],["Gemeinsam auf Tour",'samen'],["Roller & E-Chopper",'tweewielers'],["Fahrräder & E-Scooter",'fietsen'],["Mit Fahrer",'chauffeur']]},{title:"AKTIVITÄTEN",image:named('boogschieten'),copy:"Gemeinsam etwas erleben. Aktiv, ein bisschen Wettkampf oder einfach nur in aller Ruhe auf Erkundungstour.",url:'/toer/de/activiteiten/',links:[["Aktiv & Spielen",'actief'],["Suchen & Rätseln",'speuren'],["Probieren und entdecken",'proeven'],["Unterwegs mit einem Guide",'gids']]},{title:"ESSEN & TRINKEN",image:named('barbecue incl'),copy:"Vom ersten Kaffee bis zum gemeinsamen Essen. Beenden Sie Ihren Ausflug.",url:'/toer/de/eten-drinken/',links:[["Zum Ankommen",'ontvangst'],["Mittagessen und unterwegs",'lunch'],["Getränke und Snacks",'borrel'],["Abendessen und gemeinsames Essen",'diner']]}];$('#main').innerHTML=`${photoHeader()}<section class="hero home-hero wrap"><div class="hero-copy"><span class="handwritten home-hero-note">Wohin soll’s gehen?</span><div class="eyebrow">TwenteToer · Ootmarsum</div><h1>EINFACH MAL RAUS.<br><em>GEMEINSAM TWENTE<br>ERLEBEN.</em></h1><p>Eine Tour durch das Tukkerland machen, gemeinsam etwas Schönes unternehmen und eine gute Zeit haben. Staub auf den Schuhen, Wind in den Haaren und danach etwas Leckeres. So machen wir es hier!</p><div class="actions"><a class="cta" href="#ontdek">Entdecken Sie die Möglichkeiten</a><a class="textlink" href="/toer/de/boeken/">Bucht euren Topolino</a></div></div><div class="hero-img"><img src="${photo(top)}" alt="Genießen Sie gemeinsam im elektrischen Topolino's in Twente"><div class="home-stamp"><span>TwenteToer</span><b>Eure Gruppe.<br>Eure Tour.</b></div><div class="hero-label"><strong>Hier beginnt euer Tag.</strong>Von der Fahrt zu zweit bis zum Ausflug mit der ganzen Gruppe.</div></div></section><div class="wrap"><div class="ribbon"><span><strong>Abfahrt von Ootmarsum</strong></span><span>Für Freunde, Familien und Kollegen</span><span>Fahrzeug + Aktivität + gemütliches Essen</span></div><section class="buggy-feature" id="buggy-experience"><div class="buggy-feature-copy"><span class="handwritten">Staub schlucken? Na klar!</span><div class="eyebrow">Für Abenteuerlustige</div><h2>BUGGY<br><em>EXPERIENCE!</em></h2><p>Eine Stunde hinter dem Lenkrad, ab auf unbefestigten Straßen und gemeinsam ein Abenteuer erleben. Erleben Sie das echte Offroad-Feeling rund um Ootmarsum.</p><div class="fun-facts"><span>1 Stunde Fahrt</span><span>Mit Anleitung</span><span>Start ist in Ootmarsum</span></div><div class="actions"><a class="cta" href="/toer/de/voertuigen/?voertuig=5">Ich möchte das erleben</a><a class="textlink" href="/toer/de/voertuigen/?categorie=buggy">Schauen Sie sich die Buggys an</a></div></div><div class="buggy-feature-photo"><span class="mud-stamp">Keine Angst<br>vor ein bisschen<br><b>Schlamm?</b></span><img loading="lazy" src="/toer/thema/assets/buggy-experience.jpg" alt="Blau-schwarzer Offroad-Buggy von TwenteToer, voll sichtbar"></div></section><section class="section" id="ontdek"><div class="section-head"><div><div class="eyebrow">Wählen Sie, wo Sie beginnen möchten</div><h2>WORAUF HABT IHR LUST?</h2></div><p>Beginnen Sie mit dem Fahrzeug, der Aktivität oder der Essenszeit. Sie können sie später in „Meine Tour“ kombinieren.</p></div><div class="portal-grid">${portals.map(p=>`<article class="portal"><a class="portal-image" href="${p.url}"><img loading="lazy" src="${photo(p.image)}" alt="${p.title} bei TwenteToer"></a><div class="portal-body"><div class="eyebrow">${p.title==="FAHRZEUGE"?"01 · SUCHT EUCH EIN FAHRZEUG AUS":p.title==="AKTIVITÄTEN"?"02 · GEMEINSAM ETWAS ERLEBEN":"03 · KOMMT ZU TISCH"}</div><h3><a href="${p.url}">${p.title}</a></h3><p>${p.copy}</p><div class="portal-links">${p.links.map(([label,cat])=>`<a href="${p.url}?categorie=${cat}">${label}</a>`).join('')}</div><a class="cta green" href="${p.url}">${p.title==="ESSEN & TRINKEN"?'Essen & Trinken ansehen':p.title==="FAHRZEUGE"?'Alle Fahrzeuge ansehen':'Alle Aktivitäten ansehen'}</a></div></article>`).join('')}</div></section><section class="section" style="padding-top:0"><div class="split"><img loading="lazy" src="${photo(buggy)}" alt="Buggy-Abenteuer in der Gegend von Ootmarsum"><div class="split-copy"><div class="eyebrow">Bevorzugen Sie eine komplette Kombination?</div><h2>ERST LOSFAHREN.<br><span>DANN GEMEINSAM ESSEN.</span></h2><p>Besichtigung und Mittagessen. Ein Abenteuer und Barbecue. Oder eine Aktivität mit anschließendem Getränk. Sehen Sie sich die Beispiele an und wählen Sie aus, was zu Ihrer Gruppe passt.</p><a class="cta" href="/toer/de/arrangementen/">Pakete ansehen</a></div></div></section><section class="section home-occasion" style="padding-top:0"><div><div class="eyebrow">Mit wem gehst du aus?</div><h2>FÜR JEDE GRUPPE.</h2></div><div class="occasion-links"><a href="/toer/de/arrangementen/"><b>Familie und Freunde</b><span>Ein lustiger Tag mit Ihrem eigenen Club.</span></a><a href="/toer/de/activiteiten/?categorie=groepen"><b>Kollegen und große Gruppen</b><span>Vom Teamausflug bis zum gut organisierten Gruppentag.</span></a><a href="/toer/de/voertuigen/?categorie=samen"><b>Wir beide</b><span>Wählen Sie ein Fahrzeug und erkunden Sie gemeinsam die Gegend.</span></a></div></section><section class="section home-plan" style="padding-top:0"><div class="section-head"><div><div class="eyebrow">Kombinieren Sie selbst</div><h2>So stellen Sie Ihre Tour zusammen.</h2></div><a class="cta green" href="/toer/de/mijn-toer/">Beginnen Sie mit dem Zusammenstellen</a></div><div class="route-steps"><div><b>01</b><h3>Wählen Sie Ihre Favoriten</h3><p>Sehen Sie sich Fahrzeuge, Aktivitäten und Catering an. Fügen Sie die Auswahl zu „Meine Tour“ hinzu.</p></div><div><b>02</b><h3>Sagen Sie Ihre Wünsche</h3><p>Wählen Sie ein gewünschtes Datum, eine Gruppengröße und eventuelle Details.</p></div><div><b>03</b><h3>Sehen Sie sich die Übersicht an</h3><p>Speichert eure Anfrage als Entwurf. Termin, Bedingungen und Preis stimmen wir danach gemeinsam ab.</p></div></div></section><section class="section" style="padding-top:0"><div class="section-head"><div><div class="eyebrow">Einige schöne Ausgangspunkte</div><h2>DAS KÖNNTE EINFACH IHR TAG SEIN.</h2></div></div><div class="grid">${[top,named('outdoor lasergame'),named('stadswandeling'),named('top your pizza')].map(card).join('')}</div></section><section class="section faq" style="padding-top:15px"><div><div class="eyebrow">Nützlich zu wissen</div><h2>GUT ZU WISSEN.</h2><p class="small">Ist Ihre Frage nicht aufgeführt?</p><a class="textlink" href="/toer/de/contact/">Bitte kontaktieren Sie uns</a></div><div>${faq()}</div></section><div style="height:30px"></div></div>`;bind();initPhotoHeader()}

function stoet(){return `<aside class="stoet-link"><div><strong>Nur Lust auf eine frische Parade?</strong><p>Stoet ist eine eigene Bestellumgebung unter dem Namen TwenteToer, getrennt von Vermietungen und Ausflügen.</p></div><a class="cta light" href="/toer/de/stoet/">Zu Stoet</a></aside>`}
function faq(){return [["Brauche ich einen Führerschein?","Dies variiert je nach Fahrzeug. Bitte lesen Sie die Geschäftsbedingungen des von Ihnen gewählten Fahrzeugs durch und lassen Sie sich vor Ihrer Buchung die Alters- und Führerscheinanforderungen bestätigen."],["Kann ich verschiedene Teile kombinieren?","Ja, in Meine Tour können Sie Fahrzeuge, Aktivitäten und Verpflegung speichern. Die tatsächliche Planung und die Möglichkeiten werden von TwenteToer bestätigt."],["Kann ich hier tatsächlich buchen?","Dies ist eine Testversion. Sie können das Angebot einsehen und Ihren Tag planen, es ist jedoch nichts gebucht oder bezahlt. Für eine echte Buchung besuchen Sie die aktuelle Website oder kontaktieren Sie uns."],["Sind die Startpreise die Gesamtkosten?","Nein. Dies sind die Startpreise der aktuellen Website. Preiseinheiten, Mengen, Dauer und Paketkonditionen variieren. Meine Tour berechnet mit ausgewählter Dauer, Mengen und bekannten Preiseinheiten. Teile auf Wunsch bleiben getrennt."],["Wohin gehen wir?","Die Kontaktadresse lautet Denekamperstraat 36, 7631 AC Ootmarsum. Bitte vereinbaren Sie bei der endgültigen Buchung Ihren Abfahrtsort und Ihre Abfahrtszeit."]].map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}
function catalog(){const group={vehicles:'vehicles',activities:'activities',food:'food'}[page],title={vehicles:"WÄHLEN SIE IHR FAHRZEUG.",activities:"Machen Sie es zu einem Erlebnis.",food:"KOMMT ZU TISCH."}[page];$('#main').innerHTML=`<div class="wrap"><div class="page-head"><div class="eyebrow">${groupLabel[group]} · Ootmarsum</div><h1>${title}</h1><p>${group==='vehicles'?"Vom elektrischen Topolino bis zum coolen Buggy. Entdecken Sie die komplette Fahrzeugpalette und wählen Sie, was zu Ihnen passt.":group==='activities'?"Aktiv, kulinarisch oder gemeinsam etwas Neues erleben. Sehen Sie sich alle Aktivitäten an einem Ort an.":"Mittagessen, Getränke oder ausgiebiges Essen während Ihres Ausflugs. Dieses Catering-Angebot ist Teil der Vermietung und der Aktivitäten; Stoet hat eine eigene Abteilung."}</p></div><div class="tools"><input id="search" type="search" aria-label="Durchsuchen Sie das Angebot" placeholder="Suchen Sie beispielsweise nach ${group==='vehicles'?'Topolino':group==='activities'?'wandeling':'barbecue'}"><div class="chips"><button data-sort="default" aria-pressed="true">Nennen Sie A–Z</button><button data-sort="price" aria-pressed="false">Nach Preis aufsteigend</button></div></div><p class="result-count" id="results"></p><div class="grid catalog" id="catalog"></div>${group==='food'?stoet():''}</div>`;let sort='default';function render(){let rows=items.filter(p=>p.group===group&&(p.name+' '+p.description).toLowerCase().includes($('#search').value.toLowerCase()));rows.sort(sort === 'price' ? byPrice : byName);$('#results').textContent=rows.length+" Optionen · indikative Startpreise";$('#catalog').innerHTML=rows.length?rows.map(card).join(''):"<p class=\"empty\">Kein Ergebnis. Versuchen Sie es mit einem anderen Suchbegriff.</p>";bind()}$('#search').oninput=render;document.querySelectorAll('[data-sort]').forEach(b=>b.onclick=()=>{sort=b.dataset.sort;document.querySelectorAll('[data-sort]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});render()}
function foodCatalog(){const groups=[{id:'ontvangst',name:"Zum Ankommen",subtitle:"Erst mal ankommen.",copy:"Kaffee oder Tee mit etwas Leckerem, bevor Sie losfahren.",ids:[53,54,55,56]},{id:'lunch',name:"Mittagessen und unterwegs",subtitle:"Zeit für einen Zwischenstopp.",copy:"Essen Sie gemeinsam zu Mittag, machen Sie ein Picknick oder bringen Sie etwas Leckeres für unterwegs mit.",ids:[51,60,62,58,57,61,63,59]},{id:'borrel',name:"Getränke und Snacks",subtitle:"Bleiben Sie eine Weile gemütlich.",copy:"Ein Getränk und etwas Herzhaftes nach Ihrer Aktivität.",ids:[64,65,67,69,66]},{id:'diner',name:"Abendessen und gemeinsames Essen",subtitle:"Lassen Sie den Tag schön ausklingen.",copy:"Von der Herstellung Ihrer eigenen Pizza bis hin zu einem Barbecue oder Buffet. Sehen Sie sich an, was pro Auswahl enthalten ist.",ids:[49,50,72,70,71,74,75,68,73]},{id:'dranken',name:"Getränke",subtitle:"Was trinken wir dazu?",copy:"Sehen Sie sich das Sortiment und die Getränkepakete an. Die Bedingungen unterscheiden sich je nach Wahl.",ids:[76,52]}];let selected=new URLSearchParams(location.search).get('categorie')||'all';if(!groups.some(g=>g.id===selected))selected='all';$('#main').innerHTML=`<div class="wrap"><div class="page-head food-intro"><div><div class="eyebrow">Essen und Trinken · während Ihres Ausflugs</div><h1>VOM ERSTEN KAFFEE<br>Bis zum letzten Getränk.</h1><p>Machen Sie Ihren Tag komplett. Wählen Sie etwas für den Empfang, eine Pause zwischendurch oder ein gutes Essen danach. Speichern Sie Ihre Favoriten in „Meine Tour“.</p></div><aside class="food-help"><strong>So kombinieren Sie es</strong><p>Wählen Sie Ihre Essenszeit, sehen Sie, was dazugehört, und fügen Sie es Ihrem Tag hinzu.</p><a class="textlink" href="/toer/de/mijn-toer/">„Meine Tour“ ansehen</a></aside></div><div class="food-nav" aria-label="Wählen Sie Ihre Essenszeit"><div class="chips"><button data-food="all" aria-pressed="true">Alle anzeigen</button>${groups.map(g=>`<button data-food="${g.id}" aria-pressed="false">${g.name}</button>`).join('')}</div></div><div class="tools"><input type="search" id="food-search" aria-label="Finden Sie Essen und Getränke" placeholder="Suchen Sie zum Beispiel nach Barbecue, Mittagessen oder Vegetarisch"><div class="chips"><button id="food-sort" aria-pressed="false">Nach Preis aufsteigend</button></div></div><p class="result-count" id="food-count"></p><div id="food-sections"></div><aside class="notice food-note"><b>Gut zu wissen</b><br>Die angezeigten Beträge sind Startpreise der bestehenden Website. Dauer, Mindestteilnehmerzahl, Verpflegungsanforderungen und inbegriffene Getränke werden je nach Wunsch bestätigt. Melden Sie Allergien immer im Voraus. Eine Auswahl in Meine Tour ist noch keine Reservierung.</aside>${stoet()}</div>`;let sorted=false;function render(){let count=0;let html='';const q=$('#food-search').value.toLowerCase().trim();for(const g of groups){if(selected!=='all'&&selected!==g.id)continue;let rows=g.ids.map(id=>items.find(p=>p.id===id)).filter(p=>p&&(p.name+' '+p.description).toLowerCase().includes(q));if(sorted)rows.sort(byPrice);else if(g.id!=='dranken')rows.sort(byName);if(!rows.length)continue;count+=rows.length;html+=`<section class="food-group" id="${g.id}"><div class="section-head"><div><div class="eyebrow">${g.name}</div><h2>${g.subtitle}</h2></div><p>${g.copy}</p></div><div class="grid">${rows.map(card).join('')}</div></section>`}$('#food-sections').innerHTML=html||"<p class=\"empty\">Keine passende Auswahl gefunden. Versuchen Sie es mit einem anderen Suchbegriff oder einer anderen Essenszeit.</p>";$('#food-count').textContent=count+" Möglichkeiten"+(selected!=='all'?' · '+groups.find(g=>g.id===selected).name:" · geteilt durch Essenszeit");bind()}document.querySelectorAll('[data-food]').forEach(b=>b.onclick=()=>{selected=b.dataset.food;document.querySelectorAll('[data-food]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render()});document.querySelectorAll('[data-food]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.food===selected)));$('#food-search').oninput=render;$('#food-sort').onclick=()=>{sorted=!sorted;$('#food-sort').setAttribute('aria-pressed',String(sorted));render()};render()}

function activityCatalog(){const groups=[{id:'actief',name:"Aktiv & Spielen",subtitle:"Nehmen Sie die Herausforderung gemeinsam an.",copy:"Ein bisschen Wettbewerb, ein Abenteuer oder einfach nur Spaß beim gemeinsamen Spielen.",ids:[24,30,28,29,26,27,32]},{id:'speuren',name:"Suchen & Rätseln",subtitle:"Wer findet die Lösung?",copy:"Entdecken Sie die Umgebung mit Aufgaben oder knacken Sie gemeinsam die Escape-Box.",ids:[25,31,33]},{id:'proeven',name:"Probieren und entdecken",subtitle:"Entdecken Sie die Geschichten von Twente.",copy:"Ein Blick hinter die Kulissen, eine Verkostung oder ein gemeinsames Kochen.",ids:[34,38,40,39,35,36,37,41]},{id:'gids',name:"Unterwegs mit einem Guide",subtitle:"Mehr sehen. Erleben Sie mehr.",copy:"Entdecken Sie Ootmarsum und das Springendal mit jemandem, der sich in der Gegend auskennt.",ids:[45,42,43,44,46]},{id:'groepen',name:"Firmen & große Gruppen",subtitle:"Ein Tag für den gesamten Verein.",copy:"Von Meetings mit einer Aktivität bis hin zu einem vollständig organisierten Gruppentag.",ids:[47,48]}];let selected=new URLSearchParams(location.search).get('categorie')||'all',sorted=false;if(!groups.some(g=>g.id===selected))selected='all';$('#main').innerHTML=`<div class="wrap"><div class="page-head food-intro"><div><div class="eyebrow">Aktivitäten · Gemeinsam unterwegs</div><h1>VON NICE ACTIVE<br>GEMEINSAM ENTDECKEN.</h1><p>Wählen Sie, was zu Ihrer Gruppe passt. Nehmen Sie die Herausforderung an, probieren Sie etwas aus Twente oder entdecken Sie die Gegend mit einem Führer. Speichern Sie Ihre Favoriten in „Meine Tour“.</p></div><aside class="food-help"><strong>Machen Sie es zu Ihrem Tag</strong><p>Kombinieren Sie eine Aktivität mit einem Fahrzeug und etwas Leckerem davor oder danach.</p><a class="textlink" href="/toer/de/mijn-toer/">Erstelle meine Tour</a></aside></div><div class="food-nav" aria-label="Wählen Sie eine Aktivitätsart"><div class="chips"><button data-activity="all" aria-pressed="true">Alle anzeigen</button>${groups.map(g=>`<button data-activity="${g.id}" aria-pressed="false">${g.name}</button>`).join('')}</div></div><div class="tools"><input type="search" id="activity-search" aria-label="Finden Sie eine Aktivität" placeholder="Suchen Sie zum Beispiel nach Lasertag, Verkostung oder Spaziergang"><div class="chips"><button id="activity-sort" aria-pressed="false">Nach Preis aufsteigend</button></div></div><p class="result-count" id="activity-count"></p><div id="activity-sections"></div><aside class="notice food-note"><b>Bitte koordinieren Sie sich vor Ihrer Abreise</b><br>Die Optionen hängen von der Gruppengröße, dem Alter, dem Datum und der gewählten Aktivität ab. Dauer, Führung und Endpreise werden mit Ihrer Anfrage bestätigt. Eine Auswahl in Meine Tour ist noch keine Buchung.</aside><div class="hero-small"><h2>Machen Sie Ihren Ausflug komplett.</h2><p>Haben Sie schon etwas gefunden, das Ihnen gefällt? Wählen Sie ein Fahrzeug, Mittag- oder Abendessen und sammeln Sie alles in einer Übersicht.</p><div class="actions"><a class="cta green" href="/toer/de/voertuigen/">Fahrzeuge ansehen</a><a class="cta light" href="/toer/de/eten-drinken/">Wählen Sie Essen und Getränke</a></div></div></div>`;function render(){let count=0,html='';const q=$('#activity-search').value.toLowerCase().trim();for(const g of groups){if(selected!=='all'&&selected!==g.id)continue;let rows=g.ids.map(id=>items.find(p=>p.id===id)).filter(p=>p&&(p.name+' '+p.description).toLowerCase().includes(q));rows.sort(sorted ? byPrice : byName);if(!rows.length)continue;count+=rows.length;html+=`<section class="food-group" id="${g.id}"><div class="section-head"><div><div class="eyebrow">${g.name}</div><h2>${g.subtitle}</h2></div><p>${g.copy}</p></div><div class="grid">${rows.map(card).join('')}</div></section>`}$('#activity-sections').innerHTML=html||"<p class=\"empty\">Keine passende Aktivität gefunden. Versuchen Sie es mit einem anderen Suchbegriff oder einer anderen Kategorie.</p>";$('#activity-count').textContent=count+" Aktivitäten"+(selected==='all'?" · sortiert nach Art des Ausflugs":' · '+groups.find(g=>g.id===selected).name);bind()}document.querySelectorAll('[data-activity]').forEach(b=>b.onclick=()=>{selected=b.dataset.activity;document.querySelectorAll('[data-activity]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render()});document.querySelectorAll('[data-activity]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.activity===selected)));$('#activity-search').oninput=render;$('#activity-sort').onclick=()=>{sorted=!sorted;$('#activity-sort').setAttribute('aria-pressed',String(sorted));render()};render()}

function vehicleCatalog(){const groups=[{id:'buggy',name:'Buggy Experience',subtitle:"Unbefestigte Straßen. Dreck. Großes Grinsen.",copy:"Fahren Sie selbst unter Aufsicht im Gelände. Entdecken Sie alles über das Buggy-Erlebnis.",ids:[5]},{id:'samen',name:"Gemeinsam auf Tour",subtitle:"Einsteigen. Gemeinsam rausgehen.",copy:"Eine Cabriofahrt im Topolino oder eine gemütliche Fahrt im TukTuk.",ids:[3,1]},{id:'tweewielers',name:"Roller & E-Chopper",subtitle:"Ihre Tour durch Tukkerland.",copy:"Wählen Sie Ihren Lieblingsroller oder E-Chopper. Lassen Sie sich den Führerschein und die Altersvoraussetzungen pro Fahrzeug bestätigen.",ids:[2,4,6,7,8]},{id:'fietsen',name:"Fahrräder & E-Scooter",subtitle:"Erkunden Sie aktiv die Gegend.",copy:"Vom Citybike bis zum Elektro-Mountainbike oder Fatmax. Wählen Sie, was zu Ihrer Route passt.",ids:[12,13,15,14,10,11,9,16]},{id:'chauffeur',name:"Mit Fahrer",subtitle:"Mitfahren mit einer Geschichte.",copy:"Unterwegs mit einem charakterstarken Armeelastwagen oder Jeep. Passen Sie die Optionen für Ihre Gruppe an.",ids:[21,22,23]},{id:'evenementen',name:"Events & Foodtrucks",subtitle:"Ein besonderer Hingucker.",copy:"Ein Piaggio Ape als originelle Ergänzung zu einer Veranstaltung oder Party.",ids:[19,20]},{id:'extra',name:"Kindersitze",subtitle:"Bringen Sie auch die Kleinen mit.",copy:"Sehen Sie sich die Sitze an und entscheiden Sie vorab, welche Kombination für Ihr Kind und Ihr Fahrrad geeignet ist.",ids:[17,18]}];let selected=new URLSearchParams(location.search).get('categorie')||'all',sorted=false;if(!groups.some(g=>g.id===selected))selected='all';$('#main').innerHTML=`<div class="wrap"><div class="page-head food-intro"><div><div class="eyebrow">Fahrzeuge · Ootmarsum</div><h1>WÄHLEN SIE IHR FAHRZEUG.<br>ENTDECKEN SIE DAS TUKKERLAND.</h1><p>Gemeinsam im Topolino, im E-Chopper oder auf dem Fahrrad. Sehen Sie sich die Optionen pro Fahrzeugtyp an und speichern Sie Ihre Favoriten unter „Meine Tour“.</p></div><aside class="food-help"><strong>Wählen Sie zuerst</strong><p>Wählen Sie, wie Sie reisen möchten. Dann kombinieren Sie Ihre Fahrt mit einer Aktivität, einem Mittag- oder Abendessen.</p><a class="textlink" href="/toer/de/mijn-toer/">Erstelle meine Tour</a></aside></div><div class="food-nav" aria-label="Wählen Sie einen Fahrzeugtyp"><div class="chips"><button data-vehicle="all" aria-pressed="true">Alle anzeigen</button>${groups.map(g=>`<button data-vehicle="${g.id}" aria-pressed="false">${g.name}</button>`).join('')}</div></div><div class="tools"><input type="search" id="vehicle-search" aria-label="Finden Sie ein Fahrzeug" placeholder="Suchen Sie zum Beispiel nach Topolino, Buggy oder E-Bike"><div class="chips"><button id="vehicle-sort" aria-pressed="false">Nach Preis aufsteigend</button></div></div><p class="result-count" id="vehicle-count"></p><div id="vehicle-sections"></div><aside class="notice food-note"><b>Bitte koordinieren Sie sich vor Ihrer Abreise</b><br>Überprüfen Sie das Alter, den Führerschein, die Anzahl der Sitzplätze, die Route und die Mietdauer pro Fahrzeug. Preise und Verfügbarkeit werden mit Ihrer Anfrage bestätigt. Eine Auswahl in Meine Tour ist noch keine Buchung.</aside><div class="hero-small"><h2>Machen Sie Ihren Ausflug komplett.</h2><p>Fahrzeug gefunden? Wählen Sie eine Aktivität und etwas Leckeres dazu. Sammeln Sie Ihre Wünsche in Meine Tour.</p><div class="actions"><a class="cta green" href="/toer/de/activiteiten/">Wählen Sie eine Aktivität</a><a class="cta light" href="/toer/de/eten-drinken/">Wählen Sie Essen und Getränke</a></div></div></div>`;function render(){let count=0,html='';const q=$('#vehicle-search').value.toLowerCase().trim();for(const g of groups){if(selected!=='all'&&selected!==g.id)continue;let rows=g.ids.map(id=>items.find(p=>p.id===id)).filter(p=>p&&(p.name+' '+p.description).toLowerCase().includes(q));rows.sort(sorted ? byPrice : byName);if(!rows.length)continue;count+=rows.length;html+=`<section class="food-group" id="${g.id}"><div class="section-head"><div><div class="eyebrow">${g.name}</div><h2>${g.subtitle}</h2></div><p>${g.copy}</p></div><div class="grid">${rows.map(card).join('')}</div></section>`}$('#vehicle-sections').innerHTML=html||"<p class=\"empty\">Kein passendes Fahrzeug gefunden. Versuchen Sie es mit einem anderen Suchbegriff oder einer anderen Kategorie.</p>";$('#vehicle-count').textContent=count+" Möglichkeiten"+(selected==='all'?" · nach Fahrzeugtyp klassifiziert":' · '+groups.find(g=>g.id===selected).name);bind()}document.querySelectorAll('[data-vehicle]').forEach(b=>b.onclick=()=>{selected=b.dataset.vehicle;document.querySelectorAll('[data-vehicle]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render()});document.querySelectorAll('[data-vehicle]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.vehicle===selected)));$('#vehicle-search').oninput=render;$('#vehicle-sort').onclick=()=>{sorted=!sorted;$('#vehicle-sort').setAttribute('aria-pressed',String(sorted));render()};render()}

function arrangements(){const combos=[["Dolce Vita & gemütliches Essen",'topolino','lunch'],["Abenteuer & Barbecue",'buggy','barbecue incl'],["Touring & Pizza backen",'e-chopper','top your pizza'],["Aktiv & Getränke",'fatmax','borrel bbq']];$('#main').innerHTML=`<div class="wrap"><div class="page-head"><div class="eyebrow">Gemeinsam unterwegs</div><h1>EUER TAG. EURE KOMBINATION.</h1><p>Inspiration für einen ganzen Tag. Hierbei handelt es sich um Beispielkombinationen bestehender Angebote; Zusammensetzung, Planung und Preis werden auf Anfrage bestätigt.</p></div><div class="grid">${combos.map((combo, i) => ({combo, audience: i % 2 ? "Freunde und Kollegen" : "Familie und Freunde"})).sort((a,b) => compareTitle(a.combo[0], b.combo[0])).map(({combo:[title,v,f],audience})=>`<article class="card"><img class="card-photo" src="${photo(named(v))}" alt="${esc(title)}"><div class="card-body"><span class="tag">Inspiration · ${audience}</span><h3>${title}</h3><p>Kombinieren Sie ${esc(named(v).name)} mit ${esc(named(f).name.toLowerCase())}. Speichern Sie beide Teile und koordinieren Sie den Tag gemeinsam.</p><button class="cta green" data-combo="${named(v).id},${named(f).id}">Wählen Sie diese Kombination</button></div></article>`).join('')}</div><div class="hero-small"><h2>MISCHEN SIE LIEBER SELBST?</h2><p>Wählen Sie aus dem gesamten Sortiment und treffen Sie Ihre eigene Auswahl in „Meine Tour“.</p><a class="cta" href="/toer/de/mijn-toer/">Gestalte meinen Tag</a></div></div>`;document.querySelectorAll('[data-combo]').forEach(b=>b.onclick=()=>{chosen=[...new Set([...chosen,...b.dataset.combo.split(',').map(Number)])];localStorage.setItem('toer-plan',JSON.stringify(chosen));location.href='/toer/de/mijn-toer/'})}
let refreshPlanner;
function plan(){refreshPlanner=initPlanner({items:[...items].sort(byName),chosen,onChange:ids=>{chosen=[...ids];updateCount()}})}
function renderSelection(){refreshPlanner?.()}
function info(){ $('#main').innerHTML=`<div class="wrap"><div class="page-head"><div class="eyebrow">Bevor Sie auf die Straße gehen</div><h1>NÜTZLICH ZU WISSEN.</h1><p>Ein klarer Ausgangspunkt für Ihren Ausflug in Ootmarsum.</p></div><div class="contact-grid"><div class="panel"><h2>GUT VORBEREITET.</h2><ul class="benefits"><li>Bedingungen für jedes ausgewählte Fahrzeug anzeigen.</li><li>Vereinbaren Sie Alter, Führerschein und Gruppengröße.</li><li>Bitte bestätigen Sie Datum und Preis.</li><li>Bitte teilen Sie uns Ihre Ernährungsbedürfnisse im Voraus mit.</li><li>Bitte überprüfen Sie bei der Buchung Ihren Abfahrtsort.</li></ul><a class="textlink" href="/toer/de/contact/">Fragen Sie TwenteToer</a></div><div>${faq()}</div></div><section class="section"><div class="hero-small"><div class="eyebrow">Erfahrungen</div><h2>Neugierig auf andere Ausflüge?</h2><p>Sehen Sie sich vorhandene Erlebnisse über das öffentliche Trustpilot-Profil an. In dieser Testversion zeigen wir keine erfundenen Bewertungen oder Bewertungen an.</p><a class="cta light" href="https://nl.trustpilot.com/review/twentetoer.nl" target="_blank" rel="noopener">Sehen Sie sich Erfahrungen auf Trustpilot an</a></div></section></div>`}
function contact(){ $('#main').innerHTML=`<div class="wrap"><div class="page-head"><div class="eyebrow">Wir denken gerne mit Ihnen mit</div><h1>Beginnen Sie mit einer guten Idee.</h1><p>Eine Frage zu einem Fahrzeug, einem kompletten Gruppentag oder einem konkreten Wunsch? Hier finden Sie die Kontaktdaten von TwenteToer.</p></div><div class="contact-grid"><section class="panel"><div class="eyebrow">TwenteToer · Ootmarsum</div><h2>Nehmen Sie Kontakt auf.</h2><p>Denekamperstraat 36<br>7631 AC Ootmarsum</p><p><a class="textlink" href="tel:+31541296459">0541 – 29 64 59</a><br><a class="textlink" href="mailto:info@twentetoer.nl">info@twentetoer.nl</a></p><div class="actions"><a class="cta green" href="tel:+31541296459">Rufen Sie TwenteToer an</a><a class="cta light" href="mailto:info@twentetoer.nl">E-Mail an TwenteToer</a></div><p class="small">Diese Links öffnen Ihr Telefon- oder E-Mail-Programm. Die Testseite selbst sendet nichts.</p></section><section class="panel"><h2>MÖCHTEN SIE ES ZUERST ZUSAMMENSETZEN?</h2><p>Wählen Sie Ihre Lieblingsfahrzeuge, Aktivitäten und Verpflegung. So haben Sie einen klaren Überblick über Ihre Wünsche.</p><a class="cta" href="/toer/de/mijn-toer/">Erstelle meine Tour</a><div class="notice">Dies ist die Testversion auf kolfoort.com. Für echte Reservierungen und aktuelle Konditionen nutzen Sie die bestehende Website.</div><a class="textlink" href="https://www.twentetoer.nl/mijn-toer/" target="_blank" rel="noopener">Zur aktuellen Buchungsumgebung</a></section></div></div>`}

function bindPhotoGallery(root) {
  let galleryLinks = [];
  const lightbox = root.querySelector('.buggy-lightbox');
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
  vehicles:{label:"Fahrzeuge · Wählen Sie Ihr Fahrzeug",note:"Fenster auf. Wind im Haar.",title:"TRETEN SIE EIN.",accent:"LOS GEHT!",copy:"Leise tuckern Sie im Topolino, auf unbefestigten Straßen mit dem Buggy oder auf zwei Rädern durch Twente. Wo kommst du voran?",photo:3,small:2,stamp:"Eure Fahrt.<br>Euer Tempo.",caption:"Tuckern Sie durch 't Tukkerland",links:[["Gemeinsam auf Tour",'/toer/de/voertuigen/?categorie=samen'],["Auf zwei Rädern",'/toer/de/voertuigen/?categorie=tweewielers'],["Lieber Offroad?",'/toer/de/voertuigen/?voertuig=5']]},
  activities:{label:"Aktivitäten · Gemeinsam erleben",note:"Ein bisschen Mut. Viel Spaß.",title:"TUN SIE ES EINFACH",accent:"GENIESSEN!",copy:"Wer wird schlagen? Wer knackt den Code? Und wer möchte einfach nur erkunden? Wählen Sie etwas, das Ihrem gesamten Club Spaß macht.",photo:24,small:45,stamp:"Gemeinsam raus.<br>Spaß zusammen.",caption:"Gemeinsam schaffen Sie Erinnerungen",links:[["Aktiv & Spielen",'/toer/de/activiteiten/?categorie=actief'],["Suchen & Rätseln",'/toer/de/activiteiten/?categorie=speuren'],["Probieren und entdecken",'/toer/de/activiteiten/?categorie=proeven']]},
  food:{label:"Essen & Trinken · Machen Sie mit",note:"Das ganze Touren macht hungrig.",title:"Gutes Essen.",accent:"LANGE TISCHE.",copy:"Erster Kaffee mit etwas Leckerem. Ein schönes Mittagessen zwischendurch. Und nach der letzten Kurve? Gemeinsam am Tisch. Dafür nehmen wir uns gerne Zeit.",photo:70,small:55,stamp:"Guten Appetit?<br>Gehen Sie rüber!",caption:"Dann noch eines. Es macht Spaß.",links:[["Erster Kaffee",'/toer/de/eten-drinken/?categorie=ontvangst'],["Mittagszeit",'/toer/de/eten-drinken/?categorie=lunch'],["Gemeinsam essen",'/toer/de/eten-drinken/?categorie=diner']]},
  arrangements:{label:"Pakete · Bringen Sie Abwechslung in Ihren Tag",note:"Eine Fahrt. Etwas Schönes. Etwas Leckeres.",title:"ALLES INKLUSIVE.",accent:"DAS IST EIN TAG!",copy:"Touren und Essen, Abenteuer und Grillen oder nach der Fahrt Ihre eigene Pizza backen. Wählen Sie eine Beispielkombination oder kombinieren Sie sie einfach selbst für Ihren Tag.",photo:3,small:49,stamp:"Möchten Sie selbst mischen?<br>Auch erlaubt!",caption:"Von der ersten Fahrt bis zum letzten Drink",links:[["Sehen Sie sich die Kombinationen an",'#aanbod'],["Fassen Sie sich zusammen",'/toer/de/mijn-toer/'],["Etwas Leckeres dazu",'/toer/de/eten-drinken/']]},
  plan:{label:"Meine Tour · Ihr eigener Plan",note:"Sie wählen. Wir denken mit.",title:"DAS WIRD",accent:"EUER TAG.",copy:"Ein Lieblingsfahrzeug, eine lustige Beschäftigung und etwas Leckeres dazu. Sammeln Sie Ihre Ideen und organisieren Sie Ihren Tag. Es handelt sich weiterhin um einen Antragsentwurf.",photo:3,small:49,stamp:"Wählen Sie. Mischen.<br>Erfahrung!",caption:"Ein Tag mit Ihrer eigenen Note",links:[["Wählen Sie Ihre Favoriten",'#aanbod'],["Topolino Testbuchung",'/toer/de/boeken/'],["Lassen Sie uns diskutieren",'/toer/de/contact/']]},
  info:{label:"Nützlich zu wissen · vor der Abreise",note:"Zuerst das hier. Dann geht's los.",title:"GUT ORGANISIERT.",accent:"GLÜCKLICH UNTERWEGS.",copy:"Mit welchem ​​Führerschein darf man fahren? Wohin gehst du? Und können die Kinder mitkommen? Sehen Sie sich die nützlichen Informationen an und vereinbaren Sie vorab Ihre Wünsche.",photo:45,small:3,stamp:"Einfach lesen.<br>Dann erleben Sie es!",caption:"Auf diese Weise beginnen Sie sich zu entspannen",links:[["Häufige Fragen",'#aanbod'],["Fahrzeuge ansehen",'/toer/de/voertuigen/'],["Fragen Sie uns",'/toer/de/contact/']]},
  contact:{label:"Kontakt · TwenteToer Ootmarsum",note:"Eine wilde Idee? Sag mir!",title:"BRING ES AN",accent:"MIT DIESEM PLAN.",copy:"Ein Tag mit der Familie, ein Ausflug mit Kollegen oder einfach nur auf der Suche nach etwas Spaßigem? Rufen Sie TwenteToer an oder senden Sie eine E-Mail und sagen Sie uns, was Sie vorhaben.",photo:3,small:54,stamp:"Bis bald<br>in Twente!",caption:"Es beginnt mit einer guten Idee",links:[["Rufen Sie TwenteToer an",'tel:+31541296459'],["E-Mail an TwenteToer",'mailto:info@twentetoer.nl'],["Erste Inspiration",'/toer/de/arrangementen/']]}
 };
 const t=themes[page],head=$('.page-head');if(!t||!head)return;
 document.body.classList.add('playful-page','mood-'+page);
 head.className='page-head outing-intro';head.innerHTML=`<div class="outing-copy"><div class="eyebrow">${t.label}</div><span class="handwritten">${t.note}</span><h1>${t.title}<br><em>${t.accent}</em></h1><p>${t.copy}</p><div class="outing-links">${t.links.map(([label,url])=>`<a href="${url}">${label}</a>`).join('')}</div></div><div class="outing-scene"><figure class="outing-photo"><img src="${photo(items.find(x=>x.id===t.photo))}" alt="${esc(items.find(x=>x.id===t.photo).name)} bei TwenteToer"><figcaption>${t.caption}</figcaption></figure><figure class="outing-snapshot"><img src="${photo(items.find(x=>x.id===t.small))}" alt="${esc(items.find(x=>x.id===t.small).name)}"><figcaption>${page==='food'?"Beginnen Sie mit etwas Leckerem.":page==='activities'?"Man kann es auch ruhig genießen.":page==='contact'?"Mit etwas Leckerem.":"Gemeinsam ausgehen!"}</figcaption></figure><span class="outing-stamp">${t.stamp}</span><svg class="outing-scribble" viewBox="0 0 130 50" aria-hidden="true"><path d="M4 34C31 2 60 50 90 14M81 12l15-5-3 17" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg></div>`;
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


function season2027(){const bar=document.createElement('a');bar.className='season-ribbon';bar.href='/toer/de/mijn-toer/?datum=2027-03-01#aanbod';bar.innerHTML="<span class=\"season-ticket\">2027</span><span><b>Ein neues Jahr. Viele tolle Pläne!</b><small>Die Agenda ist offen · Ausflüge ab 1. März 2027</small></span><strong>Plant euren Ausflug</strong>";document.querySelector('header').after(bar);if(page==='home'){const section=document.createElement('section');section.className='season-party wrap';section.innerHTML="<div class=\"season-calendar\"><span>MÄRZ</span><b>01</b><small>2027 · es geht wieder los!</small></div><div class=\"season-copy\"><span class=\"handwritten\">Mit einem Termin beginnt die Vorfreude.</span><h2>2027? PLANT EINEN AUSFLUG<br>MIT TWENTETOER!</h2><p>Eine Fahrt mit der Familie, ein Tag voller Spaß mit Kollegen oder einfach nur ein gemeinsamer Ausflug. Die Agenda 2027 ist ab dem 1. März für Ausflüge geöffnet.</p><a class=\"cta green\" href=\"/toer/de/mijn-toer/?datum=2027-03-01#aanbod\">Machen Sie Ihre Pläne für 2027</a></div>";document.querySelector('.home-hero').after(section)}}season2027();

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
