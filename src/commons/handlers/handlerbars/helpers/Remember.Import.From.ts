

import Debug from 'debug';
const debug = Debug("w:cli:meta:generate:handlerbars:helper:remember-import-from");

var Handlebars = require('handlebars');

/**
 * Create an import statement based ont he type of the extended class/interface
 * 
 * @param this 
 * @param value 
 * @param options 
 */
export function helper (this: any, value: any, options: any) { 
  debug(`Get import data from the scopee ${options.name}`)
  
  var data;

  if (options.data) {
      data = Handlebars.createFrame(options.data);
  } else {
      data = {}
  }
  var bag = data['bag']

  var buildIn = isBuiltIn(value);

  
  var path = `'${options.hash.path||'.'}/commons/types'`
  var type = "none"

  if( bag[value] && bag[value]["type"] ) {
    type = bag[value].type;
    if (bag[value].type == "type") {
      path = `'${options.hash.path||'.'}/types'`;
    } else if (bag[value].type == "enum") {
      path = `'${options.hash.path||'.'}/enums'`;
    }
  } else {
    path = `'${options.hash.path||'.'}/commons/types/${value}'`;
  }

  debug(`VALUE: ${JSON.stringify(value)} BAG type: ${JSON.stringify(type)}`);


  if( buildIn ) {
      return options.inverse(this);
  } else if( bag[value] && bag[value]['import'] ) {
    return options.inverse(this);
    //return "";
  } else {
    return path;
  }
  
};

function isBuiltIn(value: any) {
  return  (value=="string" || value =="number")
}


