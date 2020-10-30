import Debug from 'debug';
import { Command } from  '@chimpwizards/wand'
import { Config } from '@chimpwizards/wand'
import { CommandDefinition, CommandParameter, CommandArgument } from '@chimpwizards/wand/commons/command/'

import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';  

const chalk = require('chalk');
const debug = Debug("w:cli:meta:model");
import { Parser } from '../../commons/parsers/Parser'
import * as yaml from 'js-yaml'

@CommandDefinition({ 
    description: 'Model management',
    alias: 'm',
    parent: 'meta',  
    examples: [
        [`w meta model helloworld.m3 --format json --outout helloworld.json`, `Export model as json file`],
        [`w meta model helloworld.m3 --format yaml --outout helloworld.yaml`, `Export model as yaml file`],
    ]
})
export class Model extends Command  { 

    @CommandArgument({ description: 'Model to generate. Currently supported: m3 and  nomnoml models', name: 'model-file'})
    @CommandParameter({ description: 'Model to generate. Currently supported: m3 and  nomnoml models', alias: 'm',})
    model: string = "";

    @CommandParameter({ description: 'Export format. yaml or json', alias: 'f', defaults: 'yaml'})
    format: string = "yaml";    

    @CommandParameter({ description: 'File name where the output will get stored', alias: 'o'})
    outout: string = "";    

    execute(yargs: any): void {
        debug(`THIS ${JSON.stringify(this)}`)
        debug(`YARGS ${JSON.stringify(yargs)}`)
        let parser = new Parser();
        var mapping = parser.parse(this.model);
        
        let outputPath = this.outout || this.model.replace(".m3",`.${this.format}`)
        debug(`OUTPUT: ${outputPath}`)

        var yml = yaml.dump(mapping);
        var rootFolder = path.dirname(outputPath);
        fs.mkdirSync(rootFolder,{ recursive: true });
        fs.writeFileSync(outputPath, this.format=="yaml"?yml:JSON.stringify(mapping));

        console.log(`Model [${chalk.green(this.model)}] created @ [${outputPath}]`)

    }

    

}

export function register ():any {
    debug(`Registering....`)
    let command = new Model();
    debug(`INIT: ${JSON.stringify(Object.getOwnPropertyNames(command))}`)

    return command.build()
}

