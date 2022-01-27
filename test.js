const axios = require('axios');
const {buildHeaders, buildUrl} = require("./config/builder");


let pld2 = require('./output/payload.1634451008681.json')
console.log(pld2[0])
console.log(pld2.length)

let pastries = [
    110249860,
    110270191,
    111200136,
    107391540,
    104738325,
    109706912,
    105775591
]

for(let plan of pld2) {

    plan.Items = []

    for(let pas of pastries) {

        plan.Items.push({
            SKUNum: pas
        })
    
    }
    
}

console.log(pld2[0])



let setSchedules = async (jsonPayload = pld2, uat = true) => {

    let conf = {
        headers : buildHeaders("X7MD", "production", uat)
    }

    let url = buildUrl("X7MD", "production","ImportProductionSchedule", true);



    for(let [i, schedule] of jsonPayload.entries()) {

        console.log("start setting schedule "+i+' : store '+schedule.StoreNumber+' - '+schedule.Description)

        let response;

        try {
            response = await axios.post(url, [schedule], conf)
        } catch(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("The request was made and the server responded with a status code")
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);

                throw "HTTP error"
            }
        
        }

        if(!response.data.isValid){
            console.log(response.data)
            console.log(response.config.data);
            throw "invalid data"
        };
    

        console.log("schedule "+i+" completed")
    }

    console.log("schedules successfully set", conf, url)


}

// setSchedules()


