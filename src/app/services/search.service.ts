import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Book } from '../interfaces/book.interface';
import { SearchResponse } from '../interfaces/search-response.interface';
import { API_URL } from './api-url.const';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<Book[]> {
    return this.http
      .get<SearchResponse>(`${API_URL}?q=${query}`)
      .pipe(map((response: SearchResponse) => response.docs));
  }
}
