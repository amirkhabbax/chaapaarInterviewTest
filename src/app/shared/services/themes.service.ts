import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  constructor() {}

  private _isDarkMode = signal(false);
  toggleDarkMode() {
    this._isDarkMode.update((current) => !current);
  }

  get isDarkMode() {
    return this._isDarkMode;
  }
}
