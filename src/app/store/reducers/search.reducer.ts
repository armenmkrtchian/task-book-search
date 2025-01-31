import { createReducer, on } from '@ngrx/store';
import * as SearchActions from '../actions/search.actions';
import { Book } from '../../interfaces/book.interface';

export interface SearchState {
  results: Book[];
  pastQueries: string[];
  loading: boolean;
}

const initialState: SearchState = {
  results: [],
  pastQueries: [],
  loading: false,
};

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.search, (state) => ({
    ...state,
    loading: true,
  })),
  on(SearchActions.searchSuccess, (state, { results }) => ({
    ...state,
    results,
    loading: false,
  })),
  on(SearchActions.searchFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(SearchActions.saveQuery, (state, { query }) => ({
    ...state,
    pastQueries: [...new Set([...state.pastQueries, query])],
  }))
);
