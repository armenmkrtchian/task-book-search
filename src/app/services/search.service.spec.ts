import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SearchService } from './search.service';
import { Book } from '../interfaces/book.interface';
import { SearchResponse } from '../interfaces/search-response.interface';
import { API_URL } from './api-url.const';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch books based on query', () => {
    const mockResponse: SearchResponse = {
      docs: [
        { title: 'Book 1', author_name: ['Author 1'] } as Book,
        { title: 'Book 2', author_name: ['Author 2'] } as Book,
      ],
      numFound: 2,
      numFoundExact: true,
      num_found: 2,
      start: 0,
      q: 'angular',
      offset: null,
      documentation_url: API_URL,
    };

    const query = 'angular';
    service.searchBooks(query).subscribe((books) => {
      expect(books.length).toBe(2);
      expect(books[0].title).toBe('Book 1');
      expect(books[1].title).toBe('Book 2');
    });

    const req = httpMock.expectOne(`${API_URL}?q=${query}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
