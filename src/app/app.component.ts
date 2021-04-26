import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchKeyword: string;
  searchOrder: string;
  searchDuration: string;
  searchMaxResults: number;
  tab: boolean = false;

  selectPage(key: string) {
    this.tab = key == 'bookmark';
  }

  updateSearch(keyword: string) {
    this.searchKeyword = keyword;
  }
  updateOrder(keyword: string) {
    this.searchOrder = keyword;
  }
  updateDuration(keyword: string) {
    this.searchDuration = keyword;
  }
  updateMaxResults(keyword: number) {
    this.searchMaxResults = keyword;
  }
}
