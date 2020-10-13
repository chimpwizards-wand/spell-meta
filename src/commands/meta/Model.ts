import Debug from 'debug';
import { Command } from  '@chimpwizards/wand'
import { Config } from '@chimpwizards/wand'
import { CommandDefinition, CommandParameter, CommandArgument } from '@chimpwizards/wand/commons/command/'

import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';  

const chalk = require('chalk');
const debug = Debug("w:cli:meta:model");

@CommandDefinition({ 
    description: 'Model management',
    alias: 'm',
    parent: 'meta',  
    examples: [
        [`w meta model helloworld.wml --format json --outout helloworld.json`, `Export model as json file`],
        [`w meta model helloworld.wml --format yaml --outout helloworld.yaml`, `Export model as yaml file`],
    ]
})
export class Model extends Command  { 

    @CommandArgument({ description: 'Model to generale', name: 'model-file'})
    @CommandParameter({ description: 'Model to generale', alias: 'm',})
    model: string = "";

    @CommandParameter({ description: 'Export format', alias: 'f', defaults: 'yaml'})
    format: string = "yaml";    

    @CommandParameter({ description: 'File name where the output will get stored', alias: 'o'})
    outout: string = "";    

    execute(yargs: any): void {
        debug(`THIS ${JSON.stringify(this)}`)
        debug(`YARGS ${JSON.stringify(yargs)}`)


    }

    

}

export function register ():any {
    debug(`Registering....`)
    let command = new Model();
    debug(`INIT: ${JSON.stringify(Object.getOwnPropertyNames(command))}`)

    return command.build()
}

