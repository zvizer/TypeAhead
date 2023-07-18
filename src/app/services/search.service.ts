import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public searchResults$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >(null);
  constructor() {}
}
