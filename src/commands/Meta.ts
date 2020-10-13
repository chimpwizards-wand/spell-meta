import Debug from 'debug';
import { Command } from '@chimpwizards/wand';
import { CommandDefinition } from '@chimpwizards/wand/commons/command/index';
import { Execute } from  '@chimpwizards/wand'

const chalk = require('chalk');
const debug = Debug("w:cli:meta");

@CommandDefinition({ 
    alias: 'm',
    description: 'Meta-generator'
})
export class Meta extends Command  { 

    execute(yargs: any): void {
        debug(`Do Nothing`)
        const executer = new Execute();
        let cmd = `w meta --help`;
        executer.run({cmd: cmd, showLog: false})
    } 

}

export function register ():any {
    debug(`Registering....`)
    let command = new Meta();
    debug(`INIT: ${JSON.stringify(Object.getOwnPropertyNames(command))}`)

    return command.build()
}

