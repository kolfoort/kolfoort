export const categories=[['bol','Good Bolletjes'],['pistolet','Pistoletjes'],['koffie','Goeie koffie'],['erbij','Lekker erbij']];
const rows=[
 ['bol','Een Good Bolletje',595,'Witte bol met boter. De eigen vleescombinatie en het sausje werken we nog uit. Conceptprijs.',4],
 ['bol','Bolletje Ham',395,'Witte bol met boter en dun gesneden ham. Saus naar keuze is nog een voorstel.',4],
 ['bol','Bolletje Fricandeau',445,'Witte bol met boter en dun gesneden fricandeau. Eenvoudig en goed belegd.',16],
 ['bol','Bolletje Lever',395,'Witte bol met boter en dun gesneden lever. Een klassieke combinatie.',4],
 ['bol','Bolletje Pekelvlees',495,'Witte bol met boter en dun gesneden pekelvlees. Het sausje bepalen we nog.',4],
 ['bol','Bolletje Rosbief',495,'Witte bol met boter en dun gesneden rosbief. Naar wens straks met een passend sausje.',12],
 ['pistolet','Pistoletje Préparé',595,'Voorstel: filet americain, fijngesneden ui, kappertjes en augurk. Eventueel met ei; de receptuur werken we nog uit.',7],
 ['pistolet','Pistoletje Oude Kaas',495,'Voorstel: oude kaas, rucola, komkommer en een zachte mosterdmayonaise.',1],
 ['pistolet','Pistoletje Brie',545,'Voorstel: brie, rucola, walnoot en een beetje honing. Nog af te stemmen.',2],
 ['koffie','Espresso',280,'Voorgestelde koffiekaart: klein en krachtig. Bonen en bereiding nog te bepalen.',-1],
 ['koffie','Cappuccino',350,'Voorgestelde koffiekaart: espresso met warme melk en melkschuim.',-1],
 ['koffie','Flat White',380,'Voorgestelde koffiekaart: een volle koffiesmaak met fijne melktextuur.',-1],
 ['koffie','Filterkoffie',300,'Voorgestelde koffiekaart: rustig genieten van een vers gezette kop.',-1],
 ['erbij','Iets Zoets',325,'Een zoet moment bij de koffie. De keuze van gebak of pastry werken we nog uit.',20],
 ['erbij','Roombotercroissant',250,'Voorstel voor de ochtend: een croissant voor bij je koffie.',20]
];
export const products=rows.map((r,i)=>({id:i+1,category:r[0],name:r[1],description:r[3],photo:r[4],variants:[{id:`${i+1}-p`,label:r[0]==='bol'?'Witte bol':r[0]==='pistolet'?'Pistolet':r[0]==='koffie'?'Per kop':'Per stuk',price:r[2]}]}));
export const extras=[{id:'ei',name:'Extra eitje',p:50,s:50},{id:'beleg',name:'Extra beleg',p:100,s:150},{id:'luxe',name:'Extra luxe beleg',p:150,s:200},{id:'groenten',name:'Sla, tomaat en komkommer',p:75,s:50}];
export const allergens=['Ei','Glutenbevattende granen','Lupine','Melk','Mosterd','Noten','Pinda’s','Schaaldieren','Selderij','Sesamzaad','Vis','Soja','Zwaveldioxide en sulfieten','Weekdieren'];
export const money=n=>new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR'}).format(n/100);

export const sauces=[['geen','Zonder saus'],['andalus','Andalus'],['curry','Curry'],['dille','Dille'],['honing','Honing'],['honing-mosterd','Honing-mosterd'],['ketjap','Ketjap'],['ketchup','Ketchup'],['mayonaise','Mayonaise'],['mosterd','Mosterd'],['piri-piri','Piri piri'],['sate','Satésaus'],['sambal','Sambal'],['truffelmayonaise','Truffelmayonaise']].map(([id,name])=>({id,name}));
