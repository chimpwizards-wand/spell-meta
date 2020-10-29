
import { IEntity } from '../commons/types/IEntity' ;

import { Status } from '../enums' ;
import { Address } from '../types' ;

export class Book extends IEntity {
    title: string;
    pages: number;
    status: Status;
}
