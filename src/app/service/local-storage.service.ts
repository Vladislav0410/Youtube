import { Injectable } from '@angular/core';
import { VideoDetail } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _localStorage: Storage;
  private _key: string = 'store';

  constructor() {
    this._localStorage = window.localStorage;
  }

  get() {
    let data = this._localStorage.getItem(this._key);
    return data ? JSON.parse(data) : [];
  }

  set(value: VideoDetail) {
    this._localStorage.setItem(this._key, JSON.stringify(value));
  }

  remove() {
    this._localStorage.removeItem(this._key);
  }
}
