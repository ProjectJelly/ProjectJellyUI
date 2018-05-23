export let JELLY_PROPERTIES: any;

// let API_CONFIG = require('./api.config');
let PROPERTIES: any = {
}

// Extend common properties
//PROPERTIES = extend(PROPERTIES, API_CONFIG);
JELLY_PROPERTIES = PROPERTIES;

function extend(obj, src) {
    for (let key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}
