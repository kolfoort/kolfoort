// Tariefeenheden gecontroleerd op de openbare productpagina's, 9 november 2026.
// Ontbrekende prijseenheden blijven op aanvraag; bedragen worden in centen berekend.
const person=(price,extra={})=>({unit:'personen',capacity:1,variants:[['Standaard',price]],...extra});
const vehicle=(variants,capacity=1,extra={})=>({unit:'voertuigen',capacity,variants,...extra});
export const rates={
1:vehicle([['1 uur',50],['2 uur',75]],3),2:vehicle([['2 uur',30],['3 uur',35],['4 uur',40],['5 uur',45],['Hele dag',50]]),3:vehicle([['2 uur',70],['3 uur',90],['4 uur',110]],2),
5:person(60,{variants:[['1 uur',60]],minimum:6,note:'Minimumbedrag € 360. Maximaal 10 deelnemers per groep; grotere groepen in overleg.'}),
6:vehicle([['4 uur',40],['8 uur',75]],1,{note:'Een eventuele passagier rijdt gratis mee. Pas het aantal scooters hierop aan.'}),7:vehicle([['2 uur',30],['3 uur',35],['4 uur',40]],1,{note:'Een eventuele passagier rijdt gratis mee. Pas het aantal voertuigen hierop aan.'}),8:vehicle([['2 uur',30],['3 uur',35],['4 uur',40],['Hele dag',50]],1,{note:'Een eventuele passagier rijdt gratis mee. Pas het aantal scooters hierop aan.'}),9:vehicle([['1 uur',25],['2 uur',30],['3 uur',35]]),10:vehicle([['2 uur',30],['3 uur',35],['4 uur',40]]),11:vehicle([['2 uur',30],['3 uur',35]]),
12:vehicle([['1 dag',25],['2 dagen',45],['3 dagen',60],['4 dagen',75],['5 dagen',90],['6 dagen',100],['7 dagen',110]]),13:vehicle([['1 dag',25],['2 dagen',45],['3 dagen',60],['4 dagen',75],['5 dagen',90],['6 dagen',100],['7 dagen',110]]),16:vehicle([['1 dag',37.5],['2 dagen',62.5],['3 dagen',90],['7 dagen',155]]),17:vehicle([['Per dag',1]],1,{unit:'zitjes',defaultQuantity:1}),18:vehicle([['Per dag',1]],1,{unit:'zitjes',defaultQuantity:1}),19:vehicle([['1 dag',175]]),21:vehicle([['1 uur',225],['2 uur',450],['3 uur',675]],14),22:vehicle([['3 uur',500]],12,{note:'Inclusief chauffeur, tapas en drankjes.'}),
24:person(20,{minimum:5}),25:person(39.95,{note:'Minimaal 5 en maximaal 8 deelnemers per escapebox. Groepsindeling te bevestigen.'}),26:person(17.5,{requiresVehicle:true,note:'Alleen met minimaal 3 uur voertuigverhuur; voertuig niet inbegrepen.'}),27:{unit:'karren',capacity:10,variants:[['2,5 uur · maximaal 10 personen per kar',140]]},28:person(25,{minimum:10}),29:person(20,{minimum:5}),30:person(55,{variants:[['Met E-chopper',55],['Met Topolino',65]],package:true,note:'Compleet pakket inclusief voertuig. Vanaf 8 deelnemers.'}),31:person(5,{requiresVehicle:true,note:'Alleen in combinatie met minimaal 2 uur voertuigverhuur.'}),32:person(25),33:person(10,{note:'Vanaf 2 personen; een wandelactiviteit.'}),34:person(19),36:person(8,{variants:[['Zonder rondleider',8],['Met rondleider · + € 30 per groep',8]],groupExtra:30}),38:person(17.5,{note:'Vanaf 6 deelnemers.'}),39:person(15,{requiresVehicle:true,note:'Alleen met minimaal 2 uur voertuigverhuur; voertuig niet inbegrepen.'}),41:person(75,{minimum:25}),42:person(12.5,{requiresVehicle:true,note:'Alleen met minimaal 2 uur voertuigverhuur; voertuig niet inbegrepen.'}),43:person(35,{package:true,note:'Inclusief E-chopper, Fatmax of Fatbike. Vanaf 5 deelnemers.'}),44:person(12.5,{note:'Vanaf 10 deelnemers; kleinere groep op aanvraag.'}),45:person(12.5,{minimum:10}),46:person(37.5,{package:true,note:'Inclusief E-chopper. Vanaf 8 deelnemers; toeslag kleinere groep op aanvraag.'}),47:person(72.5,{package:true,note:'Compleet arrangement; inhoud en groepsgrootte afstemmen.'}),48:person(110,{package:true,note:'Compleet dagarrangement vanaf 35 personen; kleinere groep op aanvraag.'}),
49:person(45,{minimum:10,allIn:true}),50:person(52.5,{variants:[['Twente · 2,5 uur',52.5],['Othmar · 2,5 uur',60],['Twente · 3,5 uur',62.5],['Othmar · 3,5 uur',70]],allIn:true}),52:person(12,{upgrade:true,note:'Upgrade bij een all-in drankarrangement, geen los drankarrangement.'}),53:person(6),54:person(7),55:person(7.5),56:person(7.5),57:person(9,{variants:[['Naturel',9],['Spek',10],['Appel',10],['Kaas',10],['Spek & kaas',11]]}),58:person(12.5,{unit:'tassen'}),59:person(57.5,{variants:[['Met Fatbike, Fatmax of E-chopper',57.5],['Met Topolino',67.5]],package:true,note:'Inclusief voertuig; een compleet arrangement van 3,5 uur.'}),60:person(16.5,{requiresVehicle:true,note:'Vanaf 10 personen, met minimaal 3 uur voertuigverhuur.'}),61:person(8,{note:'Voertuigverhuur niet inbegrepen.'}),62:person(15,{requiresVehicle:true,note:'Met minimaal 2 uur voertuigverhuur.'}),63:person(6,{note:'Seizoensaanbod: oktober tot en met maart.'}),67:person(12.5,{note:'Vanaf 10 personen.'}),68:person(37.5,{allIn:true}),69:{unit:'planken',capacity:5,variants:[['Plank voor circa 5 personen',30],['Plank voor circa 10 personen',55]],capacities:[5,10]},70:person(57.5,{minimum:16,variants:[['2,5 uur',57.5],['3,5 uur',67.5]],allIn:true}),71:person(50,{minimum:16,allIn:true}),72:person(49.5,{allIn:true}),73:person(30,{allIn:true}),75:person(50,{allIn:true,note:'Seizoensaanbod: oktober tot en met maart.'}),76:{unit:'arrangement',capacity:1,variants:[['Inbegrepen bij all-in',0]],included:true,note:'Alleen inbegrepen bij een gekozen all-in arrangement. Geen los gratis drankarrangement.'}
};
export function calculate(ids,options={},people=6){
 const n=Math.max(1,Math.min(500,Math.floor(Number(people)||1)));
 const hasVehicle=ids.some(id=>id<=23||rates[id]?.package),hasAllIn=ids.some(id=>rates[id]?.allIn);
 const lines=ids.map(id=>{
  const r=rates[id],o=options[id]||{};
  if(!r)return {id,pending:true,total:0,quantity:n,note:'Exact tarief en prijseenheid nog te bevestigen.'};
  const variant=Math.max(0,Math.min(r.variants.length-1,Math.floor(Number(o.variant)||0)));
  const capacity=r.capacities?.[variant]||r.capacity;
  const quantity=Math.max(1,Math.min(500,Math.floor(Number(o.quantity)||r.defaultQuantity||Math.ceil(n/capacity))));
  const billed=Math.max(quantity,r.minimum||0),price=Math.round(r.variants[variant][1]*100);
  const pending=!!((r.upgrade||r.included)&&!hasAllIn);
  const warnings=[];
  if(r.package&&ids.some(x=>x<=23))warnings.push('Dit pakket bevat al een voertuig. Los gekozen voertuigen worden als extra verhuur meegeteld.');
  if(r.requiresVehicle&&!hasVehicle)warnings.push('Kies ook voertuigverhuur om deze combinatie compleet te maken.');
  if(r.minimum&&quantity<r.minimum)warnings.push(`Minimumafname: ${r.minimum} personen wordt berekend.`);
  if([44,60,67].includes(id)&&quantity<10)warnings.push('Kleinere groep dan het aangegeven minimum; bevestiging nodig.');
  if(id===25&&quantity<5)warnings.push('Minimaal 5 deelnemers per escapebox; bevestiging nodig.');
  if([30,46].includes(id)&&quantity<8)warnings.push('Vanaf 8 deelnemers; eventuele toeslag nog te bevestigen.');
  if(id===48&&quantity<35)warnings.push('Kleinere groep: definitieve offerte nodig.');
  if(pending)warnings.push('Kies eerst een all-in arrangement; dit onderdeel is nog niet geprijsd.');
  return {id,quantity,billed,variant,label:r.variants[variant][0],unit:r.unit,price,total:pending?0:billed*price+(r.groupExtra&&variant===1?r.groupExtra*100:0),pending,warnings,note:r.note||'',minimum:r.minimum};
 });
 return {lines,total:lines.reduce((s,l)=>s+l.total,0),people:n,pending:lines.filter(l=>l.pending).length};
}
