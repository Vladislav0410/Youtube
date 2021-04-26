import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnChanges {
  @Input() query: string;
  @Input() order: string;
  @Input() duration: string;
  @Input() maxResults: number;
  searchQuery: string;
  searchOrder: string;
  searchDuration: string;
  searchMaxResults: number;
  videos = [];
  private _subscription: Subscription

  constructor(
    private _localStorageService: LocalStorageService,
    private _youtube: ApiService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    let {query, order, duration, maxResults} = changes;
    if (changes){
    if (query) {
      this.searchQuery = query.currentValue
    }
    if (order) {
      this.searchOrder = order.currentValue
    }
    if (duration) {
      this.searchDuration = duration.currentValue
    }
    if (maxResults) {
      this.searchMaxResults = maxResults.currentValue
    }
    this.getResult()
  }
  }

  getResult(){
    this._subscription = this._youtube
      .search(this.searchQuery, this.searchOrder, this.searchDuration, this.searchMaxResults)
      .subscribe((res) => {
        this.videos = res.map((res) => res[0]);
      });
  }

  bookmark(result) {
    console.log(result);
    let bookmarkArr = this._localStorageService.get();
    bookmarkArr.push(result);
    bookmarkArr = bookmarkArr.filter(
      (thing, index, self) =>
        index ===
        self.findIndex((t) => t.url === thing.url && t.title === thing.title)
    );
    this._localStorageService.set(bookmarkArr);
  }
  ngOnDestroy(){
     this._subscription.unsubscribe()
  }
}
