import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-search-video',
  templateUrl: './search-video.component.html',
  styleUrls: ['./search-video.component.scss'],
})
export class SearchImagesComponent implements OnInit {
  @Output() searchKeyword = new EventEmitter<string>();
  private _subscription: Subscription;
  formInput: FormGroup;

  constructor(private _formService: FormService) {}

  ngOnInit() {
    this.formInput = this._formService.form.controls.inputForm as FormGroup;
    this._subscription = this.formInput.valueChanges.subscribe(val => this._formService.form.controls.inputForm.patchValue(val,{emitEvent: false}))
  }

  search(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    if (element.value && element.value.length > 1) {
      this.searchKeyword.emit(element.value);
    }
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
 }
}
