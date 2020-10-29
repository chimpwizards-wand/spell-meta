import Debug from 'debug';
const debug = Debug("w:cli:meta:generate:handlerbars:helper:remember-add");


var Handlebars = require('handlebars');

/**
 * Add an obkect in the scope.
 * 
 * @param this 
 * @param value 
 * @param options 
 */
export function helper (this: any, value: any, options: any) {
    var type = options.hash.type;
    var key = options.hash.key;
    debug(`Remember [${value}] as [${type}] and store in the existing scope ${options.name}`)


    var data;

    //Create scope if doesnt exists
    if (options.data) {
        data = Handlebars.createFrame(options.data);
    } else {
        data = {}
    }
    var bag = data['bag']

    if (!bag[value]) {
        bag[value] = {};
    }

    if (!key) {
        key=type;
    }
    bag[value][key]=type;
    // bag[value]={
    //     type:type
    // }

    //data['bag'] = bag;

    //console.log("BAG: %s", JSON.stringify(bag));


};
  