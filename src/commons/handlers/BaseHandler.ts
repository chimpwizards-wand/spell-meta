
export enum HandlerTypes {
    Handlebars,
    EJS
  }

export abstract class BaseHandler { 

    public engine: HandlerTypes|undefined = undefined;
    public engineKey: string|undefined = undefined;

    constructor(protected template: string) {
    }

    abstract generate(model: any, rootContext?: any): any;
}