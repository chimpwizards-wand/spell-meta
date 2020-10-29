import Debug from 'debug';
const debug = Debug("w:cli:meta:generate:handlerbars:helper:data-random");
const faker = require('faker')

/**
 * Generate fake/random data for a type
 * 
 * @param this 
 * @param value 
 * @param options 
 */
export function helper (this: any, value: any, options: any) {
    debug(`Generating fake data for ${options.name}`)
    var type = options.hash.type;
    var name = options.hash.name;
    debug(`FAKE NAME: ${name} TYPE: ${type}`);
 
    var fake = "null";
    var random = ""
   
    if (type == "string") {
        if (name == "email") {
            random = faker.internet.email()
        } else if (name == "name") {
            random = faker.name.findName()
        }
        fake = "'"+ random.replace("'","''") + "'";
    } if (type == "number") {
        fake = faker.random.number();
    }
    return fake;

};
