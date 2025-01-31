import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SearchResultsComponent } from './search-results.component';
import {
  selectSearchResults,
  selectSearchLoading,
} from '../../store/selectors/search.selector';
import { Book } from '../../interfaces/book.interface';

describe('SearchResultsComponent', () => {
  let fixture: ComponentFixture<SearchResultsComponent>;
  let component: SearchResultsComponent;
  let store: MockStore;

  const mockBooks: Book[] = [
    {
      key: '1',
      title: 'Book One',
      author_name: ['Author One'],
      first_publish_year: 2000,
      author_key: '',
      cover_edition_key: '',
      cover_i: 0,
      edition_count: 0,
      has_fulltext: false,
      ia: '',
      ia_collection_s: '',
      language: '',
      lending_edition_s: '',
      lending_identifier_s: '',
      public_scan_b: false,
    },
    {
      key: '2',
      title: 'Book Two',
      author_name: ['Author Two'],
      first_publish_year: 2010,
      author_key: '',
      cover_edition_key: '',
      cover_i: 0,
      edition_count: 0,
      has_fulltext: false,
      ia: '',
      ia_collection_s: '',
      language: '',
      lending_edition_s: '',
      lending_identifier_s: '',
      public_scan_b: false,
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ScrollingModule,
        AsyncPipe,
        MatProgressSpinnerModule,
        SearchResultsComponent,
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectSearchResults, value: mockBooks },
            { selector: selectSearchLoading, value: false },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the search results', () => {
    const bookElements = fixture.nativeElement.querySelectorAll('.book-item');
    expect(bookElements.length).toBe(mockBooks.length);

    bookElements.forEach((element: HTMLElement, index: number) => {
      const book = mockBooks[index];
      const text = element.textContent?.replace(/\s+/g, ' ').trim() ?? '';

      expect(text).toContain(`Title: ${book.title}`);
      expect(text).toContain(`Author(s): ${book.author_name.join(', ')}`);
      expect(text).toContain(`First Published: ${book.first_publish_year}`);
    });
  });

  it('should display the loading spinner when loading is true', () => {
    store.overrideSelector(selectSearchLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const spinnerElement = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinnerElement).toBeTruthy();
  });

  it('should not display the loading spinner when loading is false', () => {
    store.overrideSelector(selectSearchLoading, false);
    store.refreshState();
    fixture.detectChanges();

    const spinnerElement = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinnerElement).toBeFalsy();
  });

  it('should display "No books found" when there are no search results', () => {
    store.overrideSelector(selectSearchResults, []);
    store.refreshState();
    fixture.detectChanges();

    const noResultsElement = fixture.nativeElement.querySelector('.no-results');
    expect(noResultsElement).toBeTruthy();
    expect(noResultsElement.textContent).toContain('No books found');
  });
});
