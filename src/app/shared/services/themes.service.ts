import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  constructor() {}

  isDarkMode = signal(false);
  toggleDarkMode() {
    this.isDarkMode.update((current) => !current);
  }
}
