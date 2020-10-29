import Debug from 'debug';
const debug = Debug("w:cli:meta:generate:handlerbars");
const _ = require('lodash');

import { BaseHandler } from "../BaseHandler";
var fs = require("fs");
var Handlebars = require('handlebars');


export class HandlerbarsHandler extends  BaseHandler { 

    generate(model: any, rootContext?: any): any {
        debug(`Generating code using template : ${this.template}`)
        var context = {
            model: model
        };

        _.merge(context,rootContext || {});

        var source = fs.readFileSync(this.template, "utf8");

        Object.keys(rootContext).forEach( (key) => {
            Handlebars.registerHelper(key, rootContext[key]);
        })

        Handlebars.registerHelper('utils', require('./helpers/Utils').helper);
        Handlebars.registerHelper('remember-scope', require('./helpers/Remember.Scope').helper);
        Handlebars.registerHelper('remember-import-from', require('./helpers/Remember.Import.From').helper);
        Handlebars.registerHelper('remember-import-check', require('./helpers/Remember.Import.Check').helper);
        Handlebars.registerHelper('typeof', require('./helpers/TypeOf').helper);
        Handlebars.registerHelper("raw", function(options: any) {
            return options.fn();
        });

        //Override lodash helper functionality
        Handlebars.registerHelper("_", function() {
            var options: any = [].pop.call(arguments);
            var func: any = [].shift.call(arguments);
            return _[func].apply(_, arguments);
        });

        Handlebars.registerHelper('remember-add', require('./helpers/Remember.Add').helper);
        Handlebars.registerHelper('data-random', require('./helpers/Data.Random').helper);
        //Handlebars.registerHelper('chain', require('./helpers/Chain').helper);
        Handlebars.registerHelper('repeat', require('handlebars-helper-repeat'));
        var helpers = require('handlebars-helpers')({
            handlebars: Handlebars
        });

        var compiledTemplate = Handlebars.compile(source);
        var result = compiledTemplate(context);

        return result;
    }
}


/**
 * REFERENCE:
 * - https://www.npmjs.com/package/handlebars-helpers
 * - https://handlebarsjs.com/guide/block-helpers.html
 * - https://handlebarsjs.com/guide/block-helpers.html#raw-blocks
 * - https://gist.github.com/palanik/25ef563812ecbdabe3d2e70bc8dc92b5
 */