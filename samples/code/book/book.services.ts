import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule , HttpClient, HttpHeaders } from '@angular/common/http';
import { IService } from '../commons/types/IService';

import { Book } from '../model';
@Injectable({
  providedIn: 'root'
})
export class BookService extends IService<Book> {

  private serviceUrl = 'api/books';  // URL to web api

  constructor( private http: HttpClient) {
    super();
  }

  findAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.serviceUrl);
  }

  findByCriteria(criteria): Observable<Book[]> {
    return this.http.get<Book[]>(this.serviceUrl + '?' + criteria);
  }

}

