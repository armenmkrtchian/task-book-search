import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  startWith,
  switchMap,
} from 'rxjs/operators';

import * as SearchActions from '../../store/actions/search.actions';
import { selectMatchingQueries } from '../../store/selectors/search.selector';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnDestroy {
  searchControl = new FormControl('');
  destroy$ = new Subject<void>();
  matchingQueries$: Observable<string[]>;

  constructor(private store: Store) {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((term) => {
        if (term !== null) {
          this.store.dispatch(SearchActions.search({ term }));
        }
      });

    this.matchingQueries$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      switchMap((input) =>
        this.store.select(selectMatchingQueries(input || ''))
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
