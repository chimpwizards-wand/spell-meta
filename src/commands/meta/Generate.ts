import Debug from 'debug';
import { Command } from  '@chimpwizards/wand'
import { Config } from '@chimpwizards/wand'
import { CommandDefinition, CommandParameter, CommandArgument } from '@chimpwizards/wand/commons/command/'

import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';  

const chalk = require('chalk');
const debug = Debug("w:cli:meta:generate");

@CommandDefinition({ 
    description: 'Code generator',
    alias: 'g',
    parent: 'meta',  
    examples: [
        [`w meta generate --model helloworld.wml --template-path templates`, `Generate code based on a template`],
    ]
})
export class Generate extends Command  { 

    @CommandParameter({ description: 'Workspace name', alias: 'n',})
    name: string = "";

    execute(yargs: any): void {
        debug(`THIS ${JSON.stringify(this)}`)
        debug(`YARGS ${JSON.stringify(yargs)}`)

    }

    

}

export function register ():any {
    debug(`Registering....`)
    let command = new Generate();
    debug(`INIT: ${JSON.stringify(Object.getOwnPropertyNames(command))}`)

    return command.build()
}

