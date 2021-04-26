import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  form: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      inputForm: this._formBuilder.group({
        keyword: ['', Validators.minLength(2)],
      }),
      filterForm: this._formBuilder.group({
        order: ['relevance'],
        duration: ['any'],
        maxResults: ['ten'],
      }),
    });
  }
}
