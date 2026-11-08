export const categories=[['bol','Good Bolletjes'],['pistolet','Pistoletjes'],['koffie','Goeie koffie'],['erbij','Lekker erbij']];
const rows=[
 ['bol','Een Good Bolletje',595,'Eén witte melkbun met dun gesneden rosbief, pekelvlees, ham, lever en fricandeau, met boter. Vijf soorten samen op één bolletje. Conceptprijs.',4],
 ['pistolet','Pistolet Huisgemaakte Filet Americain',695,'Belgische Filet Américain Préparé van zelfgedraaide runderachtermuis, met Dijonmosterd, kappertjes en sjalot. Op een krokant pistoletje; garnering en commerciële uitvoering nog te valideren.',7],
 ['pistolet','Pistoletje Oude Kaas',495,'Voorstel: oude kaas, rucola, komkommer en een zachte mosterdmayonaise.',1],
 ['pistolet','Pistoletje Brie',545,'Voorstel: brie, rucola, walnoot en een beetje honing. Nog af te stemmen.',2],
 ['koffie','Espresso',280,'Voorgestelde koffiekaart: klein en krachtig. Bonen en bereiding nog te bepalen.',-1],
 ['koffie','Cappuccino',350,'Voorgestelde koffiekaart: espresso met warme melk en melkschuim.',-1],
 ['koffie','Flat White',380,'Voorgestelde koffiekaart: een volle koffiesmaak met fijne melktextuur.',-1],
 ['koffie','Filterkoffie',300,'Voorgestelde koffiekaart: rustig genieten van een vers gezette kop.',-1],
 ['erbij','Iets Zoets',325,'Een zoet moment bij de koffie. De keuze van gebak of pastry werken we nog uit.',20],
 ['erbij','Roombotercroissant',250,'Voorstel voor de ochtend: een croissant voor bij je koffie.',20]
];
rows.push(...[["pistolet", "Schiacciata Mortadella", 895, "Krokante schiacciata met warm gebakken mortadella, gesmolten provolone, Dijonmosterd en mayonaise. Conceptprijs.", 4], ["koffie", "Americano", 300, "Espresso met heet water. Conceptprijs.", -1], ["koffie", "Latte Macchiato", 400, "Warme melk, espresso en zacht melkschuim. Conceptprijs.", -1], ["koffie", "Doppio", 350, "Dubbele espresso. Conceptprijs.", -1], ["koffie", "Lungo", 300, "Een langer doorgelopen espresso. Conceptprijs.", -1], ["koffie", "Espresso Macchiato", 310, "Espresso met een beetje zacht melkschuim. Conceptprijs.", -1], ["koffie", "Caffè Latte", 390, "Espresso met veel warme melk. Conceptprijs.", -1], ["koffie", "Iced Latte", 450, "Espresso, koude melk en ijs. Conceptprijs.", -1]]);
export const products=rows.map((r,i)=>({id:i+1,category:r[0],name:r[1],description:r[3],photo:r[4],variants:[{id:`${i+1}-p`,label:r[1]==='Schiacciata Mortadella'?'Schiacciata':r[0]==='bol'?'Witte melkbun':r[0]==='pistolet'?'Pistolet':r[0]==='koffie'?'Per kop':'Per stuk',price:r[2]}]}));
export const extras=[{id:'ei',name:'Extra eitje',p:50,s:50},{id:'beleg',name:'Extra beleg',p:100,s:150},{id:'luxe',name:'Extra luxe beleg',p:150,s:200},{id:'groenten',name:'Sla, tomaat en komkommer',p:75,s:50}];
export const allergens=['Ei','Glutenbevattende granen','Lupine','Melk','Mosterd','Noten','Pinda’s','Schaaldieren','Selderij','Sesamzaad','Vis','Soja','Zwaveldioxide en sulfieten','Weekdieren'];
export const money=n=>new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR'}).format(n/100);

export const sauces=[['geen','Zonder saus'],['andalus','Andalus'],['curry','Curry'],['dille','Dille'],['honing','Honing'],['honing-mosterd','Honing-mosterd'],['ketjap','Ketjap'],['ketchup','Ketchup'],['mayonaise','Mayonaise'],['mosterd','Mosterd'],['piri-piri','Piri piri'],['sate','Satésaus'],['sambal','Sambal'],['truffelmayonaise','Truffelmayonaise']].map(([id,name])=>({id,name}));
