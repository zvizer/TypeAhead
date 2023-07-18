import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { YoutubeService } from '../api/youtube.service';
import { SearchService } from '../services/search.service';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  of,
  skip,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { addSuggestion } from '../state/search.actions';

const autocomplete = (time, selector) => (source$) =>
  source$.pipe(
    debounceTime(time),
    switchMap((...args: any[]) =>
      selector(...args).pipe(takeUntil(source$.pipe(skip(1))))
    )
  );

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit, OnDestroy {
  private allSuggestions: string[] = [];
  public suggestions: string[] = [];
  public frmControl = new FormControl('');
  private subscriptions = [];
  private searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private searchResults$: Observable<string[]> = this.searchTerm$.pipe(
    autocomplete(1000, (term) => this.getSuggestions(term))
  );
  private suggestions$ = this.store.select(
    (state) => state.searchAddSuggestionReducer.suggestions
  );

  constructor(
    private youtubeApiService: YoutubeService,
    private searchService: SearchService,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.searchResults$.subscribe(),
      this.suggestions$.subscribe((suggestions) => {
        this.allSuggestions = suggestions;
        this.suggestions = suggestions.filter((suggest) =>
          suggest.startsWith(this.frmControl.value)
        );
      })
    );
  }

  onSearchInputChange(search: any) {
    this.searchTerm$.next(this.frmControl.value || '');
  }

  getSuggestions(term: string): Observable<any> {
    if (term === '') {
      this.suggestions = [];
      this.searchService.searchResults$.next([]);
      return of();
    }
    if (this.allSuggestions.some((suggest) => term === suggest)) {
      this.suggestions = this.allSuggestions.filter((suggest) =>
        suggest.startsWith(term)
      );
    } else {
      this.store.dispatch(
        addSuggestion({ suggestions: [...this.allSuggestions, term] })
      );
    }

    this.fetch(term);
    return of();
  }

  fetch(term: string) {
    this.youtubeApiService
      .searchVideos(term)
      .pipe(take(1))
      .subscribe((response) => {
        this.searchService.searchResults$.next(response);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
