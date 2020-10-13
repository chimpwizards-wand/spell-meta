import Debug from 'debug';
import { Command } from  '@chimpwizards/wand'
import { Config } from '@chimpwizards/wand'
import { CommandDefinition, CommandParameter, CommandArgument } from '@chimpwizards/wand/commons/command/'

import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';  

const chalk = require('chalk');
const debug = Debug("w:cli:meta:model");
import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';

@CommandDefinition({ 
    description: 'Model management',
    alias: 'm',
    parent: 'meta',  
    examples: [
        [`w meta model`, `Performa operations agains a model`],
    ]
})
export class Model extends Command  { 

    @CommandParameter({ description: 'Workspace name', alias: 'n',})
    name: string = "";



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

