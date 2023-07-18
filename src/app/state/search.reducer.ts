import { createReducer, on } from '@ngrx/store';
import { addSuggestion } from './search.actions';
import { SearchState } from '../models';

export const initialSearchState: SearchState = {
  suggestions: [],
};

export const addSuggestionReducer = createReducer(
  initialSearchState,
  on(addSuggestion, (state, suggestions) => ({
    ...state.suggestions,
    ...suggestions,
  }))
);
