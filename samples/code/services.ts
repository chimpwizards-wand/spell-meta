import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule , HttpClient, HttpHeaders } from '@angular/common/http';
import { IService } from './commons/types/IService';

import { Book } from './model';
import { Author } from './model';

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

@Injectable({
  providedIn: 'root'
})
export class AuthorService extends IService<Author> {

  private serviceUrl = 'api/authors';  // URL to web api

  constructor( private http: HttpClient) {
    super();
  }

  findAll(): Observable<Author[]> {
    return this.http.get<Author[]>(this.serviceUrl);
  }

  findByCriteria(criteria): Observable<Author[]> {
    return this.http.get<Author[]>(this.serviceUrl + '?' + criteria);
  }

}

