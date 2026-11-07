export const categories = [
 ['kaas','Kaas'],['vleeswaren','Vleeswaren'],['salades','Salades'],
 ['speciaal','Speciale broodjes'],['warm','Warme broodjes'],['erbij','Lekker erbij']
];
const rows = [
 ['kaas','Belegen kaas',405,545,'Romige belegen kaas op een knapperig broodje.'],
 ['kaas','Boerenkaas belegen',430,595,'Vol van smaak, met karakter.'],
 ['kaas','Brie (Fleur de pré 60+)',480,645,'Zacht en romig. Een echte lunchfavoriet.'],
 ['kaas','Camembert (Rustique)',480,645,'Een klassieker voor de kaasliefhebber.'],
 ['vleeswaren','Achterham',430,595,'Malse achterham, lekker royaal belegd.'],
 ['vleeswaren','Chorizo',430,595,'Een hartige lunch met een pittig randje.'],
 ['vleeswaren','Ei',425,585,'Eenvoudig lekker met gesneden ei.'],
 ['vleeswaren','Filet Americain',430,595,'De vertrouwde favoriet op vers brood.'],
 ['salades','Eiersalade',430,595,'Romige eiersalade, vers voor je belegd.'],
 ['salades','Kip kerrie salade',430,595,'Zachte kip met de smaak van kerrie.'],
 ['salades','Kip kerrie salade pittig',430,595,'Kip kerrie met wat extra pit.'],
 ['salades','Krabsalade',505,670,'Een frisse salade voor op je lunchbroodje.'],
 ['speciaal','Gezond met ham / kaas',530,695,'Ham, kaas en een frisse combinatie.'],
 ['speciaal','Gezond met ham / kaas / ei',580,740,'De gezonde klassieker met een extra eitje.'],
 ['speciaal','Gezond met ham / oude kaas',580,740,'Lekker krachtig met oude kaas.'],
 ['speciaal','Gezond met ham / oude kaas / ei',630,795,'Royaal belegd voor de stevige trek.'],
 ['warm','Beenham warm',430,595,'Warm en hartig, voor een lekkere lunch.'],
 ['warm','Gegrilde kip',600,750,'Sappige gegrilde kip op vers brood.'],
 ['warm','Gehaktbal',650,650,'Een broodje met een echte lunchklassieker.'],
 ['warm','Gehaktbal met satésaus',700,700,'Een hartige gehaktbal met satésaus.'],
 ['erbij','Croissant (Chocolate)',125,null,'Iets zoets voor erbij.'],
 ['erbij','Saucijzenbroodje',275,null,'Hartig bladerdeeg, lekker tussendoor.'],
 ['erbij','Kaasbroodje',275,null,'Een hartige traktatie met kaas.'],
 ['erbij','Koffiebroodje',150,null,'Maak je lunch zoet af.']
];
export const products = rows.map((r,i)=>({id:i+1,category:r[0],name:r[1],description:r[4],photo:i,variants:[{id:`${i+1}-p`,label:r[0]==='erbij'?'Per stuk':'Pistolet',price:r[2]},...(r[3]===null?[]:[{id:`${i+1}-s`,label:'½ stok',price:r[3]}])]}));
export const extras=[{id:'ei',name:'Extra eitje',p:50,s:50},{id:'beleg',name:'Extra beleg',p:100,s:150},{id:'luxe',name:'Extra luxe beleg',p:150,s:200},{id:'groenten',name:'Sla, tomaat en komkommer',p:75,s:50}];
export const allergens=['Ei','Glutenbevattende granen','Lupine','Melk','Mosterd','Noten','Pinda’s','Schaaldieren','Selderij','Sesamzaad','Vis','Soja','Zwaveldioxide en sulfieten','Weekdieren'];
export const money=n=>new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR'}).format(n/100);
