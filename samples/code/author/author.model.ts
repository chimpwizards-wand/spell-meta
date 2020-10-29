
import { IEntity } from '../commons/types/IEntity' ;

import { Status } from '../enums' ;
import { Address } from '../types' ;

export class Author extends IEntity {
    name: string;
    email: string;
    address: Address;
}
