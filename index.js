let {missingItems} = require("./missingItems");
let {buildPayload} = require('./buildPayload');
let {getRecipes, removeDelistedRecipes, saveRecipes} = require('./recipes')
const fs = require('fs');

(async () => {

    let recipes = await getRecipes()

    console.log(Object.keys(recipes).length)

    let items = await missingItems();


    let delisted = items.delisted;

    recipes = removeDelistedRecipes(recipes, delisted)
    
    fs.writeFileSync("delisted.json", JSON.stringify(delisted, null, 4))

    // await saveRecipes(recipes)




    return;

let mi = await missingItems();

let payload = await buildPayload(mi.simplifiedItems);

let stamp = Date.now();
let filename = "payload."+stamp+".json"

Json = JSON.stringify(payload, null, 4)
let callback = () => console.log("result written to file "+filename);
// let callback = buildModel(app, "./Model", fs).then(console.log("model folders built"))

fs.writeFile("./output/"+filename, Json, 'utf8', callback);


return;


})()
