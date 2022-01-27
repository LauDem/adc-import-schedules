const api = {
    items :     {
        keys : "dbe82269c642465ea1e101bdeaf68ea8",
        endpoint : {
            GetItemsByDepartment :      "https://freshiq.azure-api.net/ItemMasterData/v2/items/getbydepartment",

        }
    },
    recipes:    {
        keys : "508a4a1b6d85431493c77789c406b907",
        endpoint : {

        }
    },
    production: {
        keys : "6839b67960e14761a38d8b538c6af92b",
        endpoint : {
            ImportProductionSchedule :  "https://freshiq.azure-api.net/production/v2/productionschedule/import"
        }
    },
    stores :    {
        keys : "94bcff1901314bd68eb6726d4a392d64",
        endpoint : {

        }
    }
}

const uat = {
    items :     {
        keys : "92ae9878ccf441d581158a3b6e4ad868",
        endpoint : {
            GetItemsByDepartment :      "https://freshiq.azure-api.net/ItemMasterData-uat/v2/items/getbydepartment",

        }
    },
    recipes:    {
        keys : "c6ca3a599f7147c1a41d2c91e2b8e98d",
        endpoint : {
            ImportRecipe : "https://freshiq.azure-api.net/recipes-uat/v2/recipe/import"

        }
    },
    production: {
        keys : "131ca315f1dd43ccb52e824a6f6e6dca",
        endpoint : {
            ImportProductionSchedule :  "https://freshiq.azure-api.net/production-uat/v2/productionschedule/import"
        }
    },
    stores :    {
        keys : "de6805ba8cec4baaa52423956a9c7911",
        endpoint : {

        }
    }
}




module.exports = {api, uat};