import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Duration, Sort, MaxResults } from '../../models/models'
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  @Output() searchOrder = new EventEmitter<string>();
  @Output() searchDuration = new EventEmitter<string>();
  @Output() searchMaxResults = new EventEmitter<number>();
  eSortOrder: Array<string> = Object.keys(Sort).filter(key => isNaN(+key));
  eSortDuration: Array<string> = Object.keys(Duration).filter(key => isNaN(+key));
  eSortMaxResults: Array<string> = Object.keys(MaxResults).filter(key => isNaN(+key));
  private _subscription: Subscription;
  formFilter: FormGroup;
  constructor(private _formService: FormService) {}

  ngOnInit() {
    this.formFilter = this._formService.form.controls.filterForm as FormGroup;
    this._subscription = this.formFilter.valueChanges.subscribe(val => this._formService.form.controls.filterForm.patchValue(val,{emitEvent: false}))
  }
  selectedOrder(event: MatSelectChange) {
    let order = event.value;
    this.searchOrder.emit(order);
  }
  selectedDuration(event: MatSelectChange) {
    let duration = event.value;
    this.searchDuration.emit(duration);
  }
   selectedMaxResults(event: MatSelectChange) {
     let maxResults = event.value;
     switch (maxResults) {
      case 'ten':
        maxResults = 10;
        break;
      case 'twenty':
        maxResults = 20;
        break;
      case 'thirdty':
        maxResults = 30;
        break;
      case 'fourty':
        maxResults = 40;
        break;
        case 'fifty':
          maxResults = 50;
          break;
    }
     this.searchMaxResults.emit(maxResults);
   }
   ngOnDestroy(){
    this._subscription.unsubscribe();
 }
}
