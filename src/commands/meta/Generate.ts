import Debug from 'debug';
import { Command } from  '@chimpwizards/wand'
import { Config } from '@chimpwizards/wand'
import { CommandDefinition, CommandParameter, CommandArgument } from '@chimpwizards/wand/commons/command/'

import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';  
const pluralize = require('pluralize');
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
        var model = parser.parse(this.model);

        debug(`OUTPUT: ${this.output}`)
        fs.mkdirSync(this.output,{ recursive: true });

        this.generateMany(model, this.templates, this.templates)
        
    }

    //Recursively process all files/folders
    generateMany(model: any, templates: string, folder: string) {
        debug(`Processing directory: ${folder}`)
        if ( fs.lstatSync(folder).isDirectory() ) {
            fs.readdirSync(folder).forEach((file) => {
                let fileName = path.join(
                    folder,
                    file
                )
                if ( fs.lstatSync(fileName).isDirectory() ) {
                    this.generateMany(model, templates, fileName)
                } else {
                    this.generateExpand(model, templates, fileName)
                }
            });
        } else {
            this.generateExpand(model, templates, folder)
        }
    }

    //Verify if metadata is present in the fileName and expand
    generateExpand(model: any, templates: string, fileName: string) {
        debug(`Expand filename if interpolationis required`)
        let matches = fileName.match(/{\s*[\w\.]+\s*}/g)

        if ( fileName.includes("{")) {
            debug(`FOUND`)
        }

        if(matches && matches.length>0) {
            matches.forEach( (token) => {
                let key = token.replace("{","").replace("}","")
                let keys = pluralize(key)
                debug(`Processing match: ${key} or ${keys}`)
                let value: any = model[key] || this.getCommonContext()[key]
                if (value) { 
                    if ( typeof value !== "object" ) {
                        debug(`Value found`)
                        let newFileName = fileName.replace(`{${key}}`,""+value)
                        this.generateOne(model, templates, fileName, newFileName)
                    } else {
                        debug(`Value is an object`)
                    }
                } else {
                    debug(`Value is a collection`)
                    let rows = model[keys];
                    let t = typeof rows;
                    if ( typeof rows === "object") {
                        Object.keys(rows).forEach( (id: any) => {
                            let newModel: any = {}
                            newModel[key]=rows[id];
                            _.merge(newModel,model)
                            let regexpr = new RegExp(`{${key}}`,'g')
                            let newFileName = fileName.replace(regexpr,""+_.toLower(id))

                            this.generateOne(newModel, templates, fileName, newFileName)  //TODO: change for expand again to cover {entity}/{enum}
                        });
                    }
                }

                
            })
        } else {
            this.generateOne(model, templates, fileName)
        }


        //var chunk  = fileName.match(/(-chunk)(.*)(chunk)/g);
        //if (chunk) {/

        
    }

    //Process one file
    generateOne(model: any, templates: string, fileName: string, newFileName?: string) {
        debug(`Processing file: ${fileName}`)

        let fullPath = (newFileName||fileName).replace(templates,"");
                
        let code = fs.readFileSync(fileName, "utf8");

        let handler = Handler.newInstance({template: fileName, engine: this.engine, context: this.getCommonContext()})
        if (handler) {
            //If handelr/engine found then replace code for the processed code
            code = handler.generate(model, this.getCommonContext())
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

    private getCommonContext(): any {
        let context = {
            _: _, 
            pluralize: pluralize,
            dot: '.'
        }
        return context;
    }

}

export function register ():any {
    debug(`Registering....`)
    let command = new Generate();
    debug(`INIT: ${JSON.stringify(Object.getOwnPropertyNames(command))}`)

    return command.build()
}

