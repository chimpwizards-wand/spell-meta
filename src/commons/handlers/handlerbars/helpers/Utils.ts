

import Debug from 'debug';
const debug = Debug("w:cli:meta:generate:handlerbars:helper:utils");

export default class Helper {
  static isNumber(n: any) { 
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}
