import Debug from 'debug';
const debug = Debug("w:cli:meta:generate:ejs");
const _ = require('lodash');
import { BaseHandler } from "../BaseHandler";
var fs = require("fs");
var EJS = require('ejs');

export class EJSHandler extends  BaseHandler { 

    generate(model: any, rootContext?: any): any {
        debug(`Generating code using template : ${this.template}`)
        var context = {
            model: model
        };
        _.merge(context,rootContext || {});
        var source = fs.readFileSync(this.template, "utf8");

        var compiledTemplate = EJS.compile(source, {client: true});
        var result = compiledTemplate(context);
        return result;
    }
}

/**
 * REFERENCE:
 * - https://ejs.co/#features
 */