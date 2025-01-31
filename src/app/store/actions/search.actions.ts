import { createAction, props } from '@ngrx/store';
import { Book } from '../../interfaces/book.interface';

export const search = createAction(
  '[Search] Search',
  props<{ term: string }>()
);

export const searchSuccess = createAction(
  '[Search] Search Success',
  props<{ results: Book[]; query: string }>()
);

export const searchFailure = createAction(
  '[Search] Search Failure',
  props<{ error: any }>()
);

export const saveQuery = createAction(
  '[Search] Save Query',
  props<{ query: string }>()
);
