import { createSelector } from '@ngrx/store';
import { IAppState, SearchState } from '../models';

export const selectSearch = (state: IAppState) => state.search;

export const selectSuggestions = createSelector(
  selectSearch,
  (state: SearchState) => state.suggestions
);
