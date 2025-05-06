import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _isLoadingVisible = signal(false);
  constructor() {}

  get isLoadingVisible(){
    return this._isLoadingVisible;
  }

  hide(){
    this._isLoadingVisible.set(false);
  }

  show(){
    this._isLoadingVisible.set(true);
  }
}
