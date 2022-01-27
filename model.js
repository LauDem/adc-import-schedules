class Item {

    SKUNum = 105713314

    constructor(sku, min) {
        if(min) this.Minimum = min;
        this.SKUNum = sku;
    }

}

class Schedule {

    StoreNumber = 9313
    ProductionAreaNumber = 265
    Day = 1
    StartTime = "06:40"
    Description = "Cake shop test day 1"
    Active = true
    ShowInventoryOnHand = true
    Items = []

    constructor(store, day, time, description) {

        this.StoreNumber = store;
        this.Day = day;
        this.StartTime = time;
        this.Description = description;

    }

    addItem(item){
        if(! item instanceof Item ) throw "item must be an instance of Item"
        this.Items.push(item)
    }

    hasItem(){
        return this.Items.length >0;
    }
}

module.exports = {Item, Schedule}