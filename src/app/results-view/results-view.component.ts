import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss'],
})
export class ResultsViewComponent implements OnInit {
  videoResults: string[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.searchResults$.subscribe((results) => {
      this.videoResults = results;
    });
  }
  ngAfterViewInit(): void {
    //  this.viewport.renderedRangeStream.subscribe((range) => {
    // Fetch more items for the next range/batch of virtual scrolling
    // Example: Fetch additional items starting from range.end
    //     this.fetchItems(range.end);
    //   });
  }

  fetchItems(startIndex: number): void {
    // Make an API request or retrieve data from your source
    // Example: Fetch the next batch of items starting from the provided index
    // You can use your own service or data source to fetch the items
    // For demonstration purposes, let's simulate the API response
    //   setTimeout(() => {
    //     const newItems = [];
    //     for (let i = startIndex; i < startIndex + 10; i++) {
    //       newItems.push(`Item ${i}`);
    //     }
    //     // Append the fetched items to your existing array or update your data source
    //     this.items = [...this.items, ...newItems];
    //   }, 1000);
  }
}
