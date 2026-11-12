export const categories = [
 ['kaas',"Käse"],['vleeswaren',"Fleischprodukte"],['salades',"Salate"],
 ['speciaal',"Spezielle Sandwiches"],['warm',"Heiße Sandwiches"],['erbij',"Schön zu haben"]
];
const rows = [
 ['kaas',"Reifer Käse",405,545,"Cremiger reifer Käse auf einem knusprigen Brötchen."],
 ['kaas',"Bauernkäse gereift",430,595,"Voller Geschmack, mit Charakter."],
 ['kaas','Brie (Fleur de pré 60+)',480,645,"Weich und cremig. Ein echter Mittagsfavorit."],
 ['kaas','Camembert (Rustique)',480,645,"Ein Klassiker für den Käseliebhaber."],
 ['vleeswaren',"Schinken",430,595,"Zarter Schinken, köstlich großzügig belegt."],
 ['vleeswaren','Chorizo',430,595,"Ein herzhaftes Mittagessen mit einer würzigen Note."],
 ['vleeswaren','Ei',425,585,"Einfach köstlich mit geschnittenem Ei."],
 ['vleeswaren','Filet Americain',430,595,"Der bewährte Favorit auf frischem Brot."],
 ['salades',"Eiersalat",430,595,"Cremiger Eiersalat, frisch für Sie zubereitet."],
 ['salades',"Hähnchen-Curry-Salat",430,595,"Weiches Hähnchenfleisch mit Currygeschmack."],
 ['salades',"Hähnchen-Curry-Salat scharf",430,595,"Hühnchen-Curry mit etwas zusätzlicher Würze."],
 ['salades',"Krabbensalat",505,670,"Ein frischer Salat für Ihr Mittagssandwich."],
 ['speciaal',"Gesund mit Schinken/Käse",530,695,"Schinken, Käse und eine frische Kombination."],
 ['speciaal',"Gesund mit Schinken / Käse / Ei",580,740,"Der gesunde Klassiker mit dem Extra-Ei."],
 ['speciaal',"Gesund mit Schinken / gereiftem Käse",580,740,"Schön kräftig mit altem Käse."],
 ['speciaal',"Gesund mit Schinken / gereiftem Käse / Ei",630,795,"Großzügig bestückt für einen herzhaften Appetit."],
 ['warm',"Heißer Schinken",430,595,"Warm und herzhaft, für ein leckeres Mittagessen."],
 ['warm',"Gegrilltes Hähnchen",600,750,"Saftiges gegrilltes Hähnchen auf frischem Brot."],
 ['warm',"Fleischbällchen",650,650,"Ein Sandwich mit einem echten Lunch-Klassiker."],
 ['warm',"Fleischbällchen mit Saté-Sauce",700,700,"Ein herzhaftes Fleischbällchen mit Saté-Sauce."],
 ['erbij',"Croissant (Schokolade)",125,null,"Etwas Süßes dazu."],
 ['erbij',"Wurstbrötchen",275,null,"Herzhafter Blätterteig, lecker für zwischendurch."],
 ['erbij',"Käsebrötchen",275,null,"Ein herzhafter Leckerbissen mit Käse."],
 ['erbij',"Kaffeebrötchen",150,null,"Beenden Sie Ihr Mittagessen süß."]
];
export const products = rows.map((r,i)=>({id:i+1,category:r[0],name:r[1],description:r[4],photo:i,variants:[{id:`${i+1}-p`,label:r[0]==='erbij'?"Pro Stück":'Pistolet',price:r[2]},...(r[3]===null?[]:[{id:`${i+1}-s`,label:"½ Stock",price:r[3]}])]}));
export const extras=[{id:'ei',name:"Extra Ei",p:50,s:50},{id:'beleg',name:"Zusätzliche Toppings",p:100,s:150},{id:'luxe',name:"Extra luxuriöse Toppings",p:150,s:200},{id:'groenten',name:"Salat, Tomate und Gurke",p:75,s:50}];
export const allergens=['Ei',"Glutenhaltiges Getreide",'Lupine',"Milch","Senf","Nüsse","Erdnüsse","Krebstiere","Sellerie","Sesamsamen","Fisch",'Soja',"Schwefeldioxid und Sulfite","Weichtiere"];
export const money=n=>new Intl.NumberFormat("de-DE",{style:'currency',currency:'EUR'}).format(n/100);

export const sauces=[['geen',"Ohne Soße"],['andalus','Andalus'],['curry','Curry'],['dille',"Dill"],['honing',"Schatz"],['honing-mosterd',"Honigsenf"],['ketjap','Ketjap'],['ketchup','Ketchup'],['mayonaise',"Mayonnaise"],['mosterd',"Senf"],['piri-piri',"Piri Piri"],['sate',"Satay-Sauce"],['sambal','Sambal'],['truffelmayonaise',"Trüffelmayonnaise"]].map(([id,name])=>({id,name}));
