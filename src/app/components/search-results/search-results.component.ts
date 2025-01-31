import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map, Observable } from 'rxjs';

import {
  selectSearchResults,
  selectSearchLoading,
} from '../../store/selectors/search.selector';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, ScrollingModule, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.books$ = this.store
      .select(selectSearchResults)
      .pipe(map((results) => results ?? []));

    this.loading$ = this.store.select(selectSearchLoading); 
  }
}
