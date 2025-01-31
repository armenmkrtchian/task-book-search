import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import * as SearchActions from '../actions/search.actions';

@Injectable()
export class SearchEffects {
  actions$ = inject(Actions);
  searchService = inject(SearchService);

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.search),
      switchMap(({ term }) =>
        this.searchService.searchBooks(term).pipe(
          map((results) => {
            return SearchActions.searchSuccess({ results, query: term });
          }),
          catchError((error) => of(SearchActions.searchFailure({ error })))
        )
      )
    )
  );

  saveQuery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchSuccess),
      map(({ query }) => {
        if (query) {
          return SearchActions.saveQuery({ query });
        }
        return { type: 'NO_ACTION' };
      })
    )
  );
}
