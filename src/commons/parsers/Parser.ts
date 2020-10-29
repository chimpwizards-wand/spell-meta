
import Debug from 'debug';
const debug = Debug("w:cli:meta:utils:parser");
const JISON = require("jison").Parser;
import * as fs from 'fs';
import * as path from 'path';

export class Parser  { 

    parse(model: string) {
        const grammarPath = path.join(
            __dirname,
            `.`,
            path.extname(model).substr(1),
            `grammar.jison`
        );
        debug(`Gramar File: ${grammarPath}`)
        var grammar = fs.readFileSync(grammarPath, "utf8");

        var parser = new JISON(grammar);
        var parserSource = parser.generate();
        debug(`MODEL: ${model}`)

        // returns true
        var model = fs.readFileSync(model, "utf8");
        var mapping = parser.parse(model);
        
        return mapping;
    }
}
