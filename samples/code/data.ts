import { Book } from './model';
import { Author } from './model';

export const Books: Book[] = [
        {
            id: 0,
            title: '',
            pages: 42896,
            status: null
        },        {
            id: 1,
            title: '',
            pages: 12026,
            status: null
        },        {
            id: 2,
            title: '',
            pages: 80900,
            status: null
        },        {
            id: 3,
            title: '',
            pages: 97113,
            status: null
        },        {
            id: 4,
            title: '',
            pages: 58651,
            status: null
        },        {
            id: 5,
            title: '',
            pages: 70086,
            status: null
        },        {
            id: 6,
            title: '',
            pages: 81425,
            status: null
        },        {
            id: 7,
            title: '',
            pages: 96245,
            status: null
        },        {
            id: 8,
            title: '',
            pages: 23786,
            status: null
        },        {
            id: 9,
            title: '',
            pages: 45939,
            status: null
        }
];

export const Authors: Author[] = [
        {
            id: 0,
            name: 'Miss Jan Emmerich',
            email: 'Irving.Dooley94@yahoo.com',
            address: null
        },        {
            id: 1,
            name: 'Bernadette Kuvalis',
            email: 'Hyman.Jerde@hotmail.com',
            address: null
        },        {
            id: 2,
            name: 'Ralph Rice',
            email: 'Kayley_Reichert24@gmail.com',
            address: null
        },        {
            id: 3,
            name: 'Alberta Hagenes DDS',
            email: 'Alexane.Stoltenberg85@yahoo.com',
            address: null
        },        {
            id: 4,
            name: 'Robert Yost',
            email: 'Joey_Christiansen@hotmail.com',
            address: null
        },        {
            id: 5,
            name: 'Milton Mann',
            email: 'Rashawn_Hamill@hotmail.com',
            address: null
        },        {
            id: 6,
            name: 'Darrell Miller',
            email: 'Izaiah48@yahoo.com',
            address: null
        },        {
            id: 7,
            name: 'Heidi Satterfield',
            email: 'Marshall_Roob@yahoo.com',
            address: null
        },        {
            id: 8,
            name: 'Edwin Stokes DDS',
            email: 'Jayce_Hammes@yahoo.com',
            address: null
        },        {
            id: 9,
            name: 'Gerard Hayes',
            email: 'Jordan13@yahoo.com',
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
