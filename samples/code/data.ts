import { Book } from './model';
import { Author } from './model';

export const Books: Book[] = [
        {
            id: 0,
            title: '',
            pages: 5277,
            status: null
        },        {
            id: 1,
            title: '',
            pages: 92371,
            status: null
        },        {
            id: 2,
            title: '',
            pages: 49926,
            status: null
        },        {
            id: 3,
            title: '',
            pages: 52165,
            status: null
        },        {
            id: 4,
            title: '',
            pages: 60477,
            status: null
        },        {
            id: 5,
            title: '',
            pages: 27353,
            status: null
        },        {
            id: 6,
            title: '',
            pages: 32638,
            status: null
        },        {
            id: 7,
            title: '',
            pages: 50461,
            status: null
        },        {
            id: 8,
            title: '',
            pages: 69174,
            status: null
        },        {
            id: 9,
            title: '',
            pages: 16206,
            status: null
        }
];

export const Authors: Author[] = [
        {
            id: 0,
            name: 'Winston Balistreri',
            email: 'Shanel.Lockman93@gmail.com',
            address: null
        },        {
            id: 1,
            name: 'Gerardo Kris',
            email: 'Ross_Runolfsson70@yahoo.com',
            address: null
        },        {
            id: 2,
            name: 'Marta Ortiz',
            email: 'Jaqueline_Brakus@hotmail.com',
            address: null
        },        {
            id: 3,
            name: 'Micheal Dibbert',
            email: 'Allie_Christiansen@hotmail.com',
            address: null
        },        {
            id: 4,
            name: 'Geoffrey Schuster',
            email: 'Lessie96@yahoo.com',
            address: null
        },        {
            id: 5,
            name: 'Gilberto Douglas',
            email: 'Tad50@hotmail.com',
            address: null
        },        {
            id: 6,
            name: 'Angel Marks',
            email: 'Cory.Franecki@yahoo.com',
            address: null
        },        {
            id: 7,
            name: 'Julie Lakin',
            email: 'Freeman58@hotmail.com',
            address: null
        },        {
            id: 8,
            name: 'Lula McDermott',
            email: 'Evans.Rempel31@yahoo.com',
            address: null
        },        {
            id: 9,
            name: 'Kelli Roberts',
            email: 'Vallie6@gmail.com',
            address: null
        }
];



import { InMemoryDbService, ParsedRequestUrl, RequestInfoUtilities } from 'angular-in-memory-web-api';
import { IEntity } from '../commons/types/IEntity';
export class InMemoryDB implements InMemoryDbService {

    createDb() {
        return {
            'books': Books,
            'authors': Authors        };
    }

    genId(rows: IEntity[]): number {
        return rows.length > 0 ? Math.max(...rows.map(row => row.id)) + 1 : 11;
    }
}
