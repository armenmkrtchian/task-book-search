import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../reducers/search.reducer';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectSearchResults = createSelector(
  selectSearchState,
  (state: SearchState) => state.results
);

export const selectPastQueries = createSelector(
  selectSearchState,
  (state: SearchState) => state.pastQueries
);

export const selectSearchLoading = createSelector(
  selectSearchState,
  (state: SearchState) => state.loading
);

export const selectMatchingQueries = (input: string) =>
  createSelector(selectPastQueries, (pastQueries) =>
    pastQueries.filter((query) =>
      query.toLowerCase().includes(input.toLowerCase())
    )
  );
