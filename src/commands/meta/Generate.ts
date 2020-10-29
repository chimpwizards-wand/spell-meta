import Debug from 'debug';
import { Command } from  '@chimpwizards/wand'
import { Config } from '@chimpwizards/wand'
import { CommandDefinition, CommandParameter, CommandArgument } from '@chimpwizards/wand/commons/command/'

import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';  

const chalk = require('chalk');
const debug = Debug("w:cli:meta:generate");
import { Parser } from '../../commons/parsers/Parser'
import { Handler } from '../../commons/handlers/Handler'

@CommandDefinition({ 
    description: 'Code generator',
    alias: 'g',
    parent: 'meta',  
    examples: [
        [`w meta generate --model helloworld.wml --template-path templates`, `Generate code based on a template`],
    ]
})
export class Generate extends Command  { 

    @CommandArgument({ description: 'Model to generale', name: 'model-file'})
    @CommandParameter({ description: 'Model to generale', alias: 'm',})
    model: string = "";

    @CommandParameter({ description: 'Template path', alias: 't',})
    templates: string = "";

    @CommandParameter({ description: 'Template engine. Currently supported: ejs and  hbs', alias: 'l'})
    engine: string|undefined = undefined;

    @CommandParameter({ description: 'Output path', alias: 'o'})
    output: string = process.cwd();   

    execute(yargs: any): void {
        debug(`THIS ${JSON.stringify(this)}`)
        debug(`YARGS ${JSON.stringify(yargs)}`)

        let parser = new Parser();
        var mapping = parser.parse(this.model);

        debug(`OUTPUT: ${this.output}`)
        fs.mkdirSync(this.output,{ recursive: true });

        this.generateMany(mapping, this.templates, this.templates)
        
    }

    generateMany(mapping: any, templates: string, folder: string) {
        debug(`Processing directory: ${folder}`)
        if ( fs.lstatSync(folder).isDirectory() ) {
            fs.readdirSync(folder).forEach((file) => {
                let fileName = path.join(
                    folder,
                    file
                )
                if ( fs.lstatSync(fileName).isDirectory() ) {
                    this.generateMany(mapping, templates, fileName)
                } else {
                    this.generateOne(mapping, templates, fileName)
                }
            });
        } else {
            this.generateOne(mapping, templates, folder)
        }
    }

    generateOne(mapping: any, templates: string, fileName: string) {
        debug(`Processing file: ${fileName}`)

        let fullPath = fileName.replace(templates,"");
        let code = fs.readFileSync(fileName, "utf8");

        let handler = Handler.newInstance({template: fileName, engine: this.engine})
        if (handler) {
            //If handelr/engine found then replace code for the processed code
            code = handler.generate(mapping)
            fullPath = fullPath.replace(`.${handler.engineKey}`,"");
        } else {
            console.log(chalk.red(`Template engine not found for ${fileName}`));
        }

        let outputPath = path.join(
            this.output,
            fullPath
        )
        var rootFolder = path.dirname(outputPath);
        fs.mkdirSync(rootFolder,{ recursive: true });
        fs.writeFileSync(outputPath, code);
        console.log(`[${outputPath}] Created`)

    }

}

export function register ():any {
    debug(`Registering....`)
    let command = new Generate();
    debug(`INIT: ${JSON.stringify(Object.getOwnPropertyNames(command))}`)

    return command.build()
}

