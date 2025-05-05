import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageHandlerService {
  public langauge = signal('fa');
  constructor() {}

  changeLanguage(newLanguage: string) {
    this.langauge.set(newLanguage);
  }
}
