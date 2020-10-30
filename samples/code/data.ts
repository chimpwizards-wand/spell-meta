import { InMemoryDbService, ParsedRequestUrl, RequestInfoUtilities } from 'angular-in-memory-web-api';
import { IEntity } from './commons/types/IEntity';
import { Books } from './Book/Book.data';
import { Authors } from './Author/Author.data';
// ##include: data.import.{entity}.partial.ts


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
