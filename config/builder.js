const {api, uat} = require('./config');

let buildHeaders = (tenant = 'X7MD', module, test=false) => {

    return {
        'X-Tenant': tenant,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': test ? uat[module].keys : api[module].keys
    }

}

let buildUrl = (tenant = 'X7MD', module, key, test=false) => {
    
    return test ? uat[module].endpoint[key] : api[module].endpoint[key]
}

module.exports = {buildHeaders, buildUrl}