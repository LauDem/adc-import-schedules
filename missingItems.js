const axios = require('axios');
const {api, uat} = require('./config/config');
const {buildHeaders} = require("./config/builder");
const csv=require('csvtojson')

async function fromCSV(csvFilePath) {
    return await csv().fromFile(csvFilePath)
}


let missingItems = async () => {
    let conf = {
        headers : buildHeaders("X7MD", "items", true)
    }


    let apiItems = await axios.post(
        // api.items.endpoint.GetItemsByDepartment,
        uat.items.endpoint.GetItemsByDepartment,

        {
            "DepartmentNumber": 265
        },
        conf
    )

    let itemNums = []

    let simplifiedItem = {};

    let delisted = [];


    for(let i=0; i< apiItems.data.length; i++) {
        itemNums.push(apiItems.data[i].itemNumber)
    }

    console.log(itemNums.includes(111207565))


    let itemsList = await fromCSV("./input/items.csv")
    // console.log(itemsList)

    let missingItems = [], simplifiedItems = [], count =0;

    for(let i=0; i<itemsList.length; i++) {

        simplifiedItem = {};
        
        let sku = parseInt(itemsList[i]["SKU Item Nbr"]);

        // console.log(itemsList[i]);

        if(isNaN(sku)) break;

        if(sku == 111092403) continue;
        
        if(itemsList[i].delisted) {
            delisted.push(sku);
            continue;
        }

        

        simplifiedItem.sku = sku;
        simplifiedItem["08:00"] = itemsList[i]["8am - 10am"] == "Y" ? true : false;
        simplifiedItem["10:00"] = itemsList[i]["10am - 2pm"] == "Y" ? true : false;
        simplifiedItem["14:00"] = itemsList[i]["2pm - 6pm"] == "Y" ? true : false;
        simplifiedItem.minimum = itemsList[i]["Minimum Fill Qty"] ? parseInt(itemsList[i]["Minimum Fill Qty"]) : itemsList[i]["Minimum Fill Qty"];
        simplifiedItem.scratch1 = itemsList[i]["Scratch 1"] == "Y" ? true : false;
        simplifiedItem.scratch2 = itemsList[i]["Scratch 2"] == "Y" ? true : false;

        if([111813725,111813741,112121835,111040591,111040558,111040574,106779278].includes(sku)) {
            simplifiedItem['10:00'] = true;
            simplifiedItem['14:00'] = true;
            simplifiedItem.scratch1 = true;
            simplifiedItem.scratch2 = false;
        }

        simplifiedItems.push(simplifiedItem)

        let bool = itemNums.includes(parseInt(itemsList[i]["SKU Item Nbr"]))

        

        // if(bool == false) {
        //     count ++; 
        //     if(count>2){break;}
        //     // console.log(i, bool, parseInt(itemsList[i]["SKU Item Nbr"]))
        // }

        if(itemNums.includes(parseInt(itemsList[i]["SKU Item Nbr"]))) continue;

        missingItems.push(parseInt(itemsList[i]["SKU Item Nbr"]))

    }

    console.log("missingItems :", missingItems)
    return {missingItems, simplifiedItems, delisted};
}

module.exports = {missingItems}
