const csv=require('csvtojson');
const axios = require('axios');
const {api, uat} = require('./config/config');
const {buildHeaders, buildUrl} = require("./config/builder");



class Recipe {

    BusinessUnit = 0
    RecipeId
    DepartmentNumber = 265
    RecipeDescription
    Ingredients = []
    ProductionItems = []

    constructor(id) {
        this.RecipeId = parseInt(id)
    }

    setDescription(string) {
        this.RecipeDescription = string
    }

    addIngredient(ingredient) {
        if(! ingredient instanceof Ingredient ) throw "ingredient must be an instance of Ingredient";
        this.Ingredients.push(ingredient)
    }

}

class Ingredient {
    // ActionCode      = "A"
    VendorNumber
    // VendorName      = "Gold Medal"
    VendorItemID
    VendorItemDescription
    CostQuantity
    UnitOfMeasure = "Grams"

    constructor(/*vendorId, */id, /*description, */quantity) {
        // this.VendorNumber = vendorId;
        this.VendorItemID = id;
        // this.VendorItemDescription = description;
        this.CostQuantity = quantity;
    }
}


let getRecipes = async ()=>{

    let ingredients = await csv().fromFile("./input/ingredients.csv")

    
    let recipes = {};

    for(let ingredient of ingredients) {

        let id = parseInt(ingredient["Recipe MIN Code"])

        if(!recipes[id]) {

            recipes[id] = new Recipe(id);
            recipes[id].setDescription(/*ingredient["Recipe MIN Code"]+" : "+*/ingredient['Description'])
        }

        recipes[id].addIngredient(new Ingredient (
            ingredient["Ingredient MIN Code"],
            ingredient["Quantity (g)"]

        ))

        // console.log(recipes[id])
    }

    // console.log(recipes, Object.keys(recipes).length)

    return recipes;
}

let removeDelistedRecipes = (recipes, delisted) => {

    let count = 0;

    for(let recipeId in recipes) {
        
        if(delisted.includes(parseInt(recipeId))) {
            delete recipes[recipeId];
            count++;
            console.log("deleted "+recipeId)
            continue;
        }


    }

    console.log("removed :"+count, "remain :"+Object.keys(recipes).length)

    return recipes

}

let saveRecipes = async (recipes) => {

    let conf = {
        headers : buildHeaders("X7MD", "recipes", true)
    }

    let url = buildUrl("X7MD", "recipes", "ImportRecipe", true)

    console.log(conf.headers, url)

    let response, payload;

    for(let recipeId in recipes) {

        console.log("saving ...."+recipeId)

        payload = [recipes[recipeId]] 

        try{
            response = await axios.post(url, payload, conf)
        } catch(error) {
            console.log("The request was made and the server responded with a status code")
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            throw "HTTP error"
    }

        if(!response.data.isValid){
            console.log(response.data)
            console.log(response.config.data);
            throw "invalid data"
        };

        console.log(response.data.taskDetailsList)
        console.log("success")




        break;
    

    }

}



module.exports = {getRecipes, removeDelistedRecipes, saveRecipes}
