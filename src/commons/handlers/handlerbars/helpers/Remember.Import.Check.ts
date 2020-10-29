
import Debug from 'debug';
const debug = Debug("w:cli:meta:generate:handlerbars:helper:remember-import-check");

var Handlebars = require('handlebars');

/**
 * Check if the class/interface the current class extend from was already imported
 * if-not then it will create animport statement, if-does then skip
 * @param this 
 * @param value 
 * @param options 
 */
export function helper (this: any, value: any, options: any) {
  debug(`Get import data from the scopee ${options.name}`)
  debug(`VALUE: ${JSON.stringify(value)}`);
 
  var type = options.hash.type;
  var name = options.hash.name;

  var data;

  if (options.data) {
      data = Handlebars.createFrame(options.data);
  } else {
      data = {}
  }
  var bag = data['bag']

  var buildIn = isBuiltIn(value);

  if( buildIn ) {
      return options.inverse(this);
  } else {
    if( bag[value] && bag[value]['import'] ) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  }
};

function isBuiltIn(value: any) {
  return  (value=="string" || value =="number")
}

/**
 * REFERENCE:
 * - http://javascriptissexy.com/handlebars-js-tutorial-learn-everything-about-handlebars-js-javascript-templating/
 */