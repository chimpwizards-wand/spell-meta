import { BaseHandler, HandlerTypes } from "./BaseHandler";
import { EJSHandler } from "./ejs/EJSHandler";
import { HandlerbarsHandler } from "./handlerbars/HandlebarsHandler";
import * as path from 'path';


interface HandlerOptions {
    template: string, 
    engine?: string
}

export class Handler { 

    static newInstance(options: HandlerOptions ): BaseHandler | undefined {
        let engine = options.engine || path.extname(options.template).substr(1);
        let handler = undefined;
        if (engine == "hbs") {
            handler =  new HandlerbarsHandler(options.template);
            handler.engine = HandlerTypes.Handlebars;
            handler.engineKey = engine;
        } else if (engine == "ejs") {
            handler =  new EJSHandler(options.template);
            handler.engine = HandlerTypes.EJS;
            handler.engineKey = engine;
        } 

        //Default
        return handler;
    }

}

