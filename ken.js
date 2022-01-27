const http = require('axios');

let payload = [{
    // "ActionCode": "A",
    "StoreNumber": 842,
    "ProductionAreaNumber": 15,
    // "Day": 0,
    "StartTime": "08:00",
    "Description": "All Items Plan",
    "Active": true,
    "ShowInventoryOnHand": true,
    "Items": [
        {
        // "ActionCode": "A",
        "SKUNum": 1234567890
        }
    ]}]

let url = "https://freshiq.azure-api.net/production-uat/v2/productionschedule/import";

let conf = {
    headers : {
        'X-Tenant': "YMMB",
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': "0c06bb8dc58944328c8d962bc83047c5"
    }
};


http.post(url, payload,conf)
    .then(r => {
        console.log(r.data.taskDetailsList, Object.keys(r))
    }) 
    .catch(e => {
        console.log(e.config, e.response.data, e, Object.keys(e))
    }) 