import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageHandlerService {
  private _langauge = signal('fa');
  constructor() {}

  changeLanguage(newLanguage: string) {
    this._langauge.set(newLanguage);
  }

  get langauge() {
    return this._langauge;
  }
}
