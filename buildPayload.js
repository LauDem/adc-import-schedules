// const csv=require('csvtojson')
const fs = require('fs')
const {Item, Schedule} = require('./model');

const scratch1 = [114,122,171,258,691]
const scratch2 = [500]
const scot = [171,500]

const days =  {
    0:"Sunday",
    1:"Monday",
    2:"Tuesday",
    3:"Wednesday",
    4:"Thursday",
    5:"Friday",
    6:"Saturday"
}

const plans = {
    "08:00"  :"8am - 10am",
    "10:00" :"10am - 2pm",
    "14:00" :"2pm - 6pm"
}

const UkSundayPlans  = {
    "08:00"  :"8am - 10am",
    "10:00" :"10am - 2pm",
    "14:00" :"2pm - 4pm"
}


let payload = [];
let schedule;

let buildPayload = async (items) => {
for(let store of [...scratch1, ...scratch2]) {

    for(let key in days){

        key = parseInt(key)
        
        if(key == 0 && !scot.includes(store)) {

            for(let time in UkSundayPlans) {

                schedule = new Schedule(store, key, time, "Cake Sunday "+UkSundayPlans[time])

                for(let item of items) {
                    if(item.scratch1&&scratch1.includes(store)||item.scratch2&&scratch2.includes(store)) {
                        if(item[time]){
                            schedule.addItem(new Item(item.sku, item.minimum))
                        }
                    }
                }

                if(schedule.hasItem()) {payload.push(schedule)}

            }
    

            continue;
        }

        for(let time in plans) {

            schedule = new Schedule(store, key, time, "Cake "+days[key]+" "+plans[time])

            for(let item of items) {
                if(item.scratch1&&scratch1.includes(store)||item.scratch2&&scratch2.includes(store)) {
                    if(item[time]){
                        schedule.addItem(new Item(item.sku, item.minimum))
                    }
                }
            }


            if(schedule.hasItem()) {payload.push(schedule)}


        }

        
    }
}
return payload;
}

// console.log(payload)

module.exports = {buildPayload};

/*
async function fromCSV(csvFilePath) {
    return await csv().fromFile(csvFilePath)
}




let itemsList = await fromCSV("./input/items.csv");
let ingredientsList = await fromCSV("./input/ingredients.csv");

for(let item of itemList){

}

*/