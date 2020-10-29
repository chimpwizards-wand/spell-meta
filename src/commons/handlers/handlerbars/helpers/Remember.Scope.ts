
import Debug from 'debug';
const debug = Debug("w:cli:meta:generate:handlerbars:helper:remember-import-scope");

var Handlebars = require('handlebars');

/**
 * Creates a data scope that can be use to remembed seeing values during template processing
 * 
 * @param this 
 * @param value 
 * @param options 
 */
export function helper (this: any, options: any) {
    debug(`Create a scope ${options.name}`)

    var data;

    if (options.data) {
        data = Handlebars.createFrame(options.data);
    }

    var bag = {}

    data['bag'] = bag;

    return options.fn(this, { data: data })
};
  

/**
 * REFERENCE:
 * - https://handlebarsjs.com/api-reference/utilities.html#handlebars-createframe-data
 */