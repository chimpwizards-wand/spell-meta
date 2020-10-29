

import Debug from 'debug';
const debug = Debug("w:cli:meta:generate:handlerbars:helper:typeof");

export function helper (this: any, value: any, options: any) {
    debug(`VALUE: ${JSON.stringify(value)}`);
    debug(`this: ${JSON.stringify(options)}`);
    var type = options.hash.type;
    var vEval = value;
    try {
        vEval=eval(value);
    } catch(e) {}

    debug(`TYPE: ${type}`);
    debug(`TYPEOF: ${typeof(vEval)}`);



    if( typeof(vEval) != type ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
};
  