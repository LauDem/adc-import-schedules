const fs = require('fs')
let payload = require('./output/payload.1634451008681.json')

console.log(payload.length)

let all = []
let double = []
let str = ""
let duplicateItems = {}


for(let schedule of payload) {

    str = schedule.StoreNumber +"-"+schedule.Day+"-"+schedule.StartTime

    all.includes(str) ? double.push(str) : all.push(str)

    let items = []

    for(let item of schedule.Items) {

        

        if (items.includes(item.SKUNum)) {
            if(!duplicateItems[str]) duplicateItems[str] = [] 
            duplicateItems.push(item.SKUNum) 
        }

        items.push(item.SKUNum)
    }

}

console.log(all.length)

let stamp = Date.now();

fs.writeFileSync("./output/verify."+stamp+".json", JSON.stringify({all:all, double:double, duplicateItems: duplicateItems},null,4))

