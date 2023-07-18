import { createAction, props } from '@ngrx/store';

export const addSuggestion = createAction(
  '[Autocomplete] Add Suggestion',
  props<{ suggestions: string[] }>()
);
