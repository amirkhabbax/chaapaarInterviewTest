import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoadingVisible = signal(false);
  constructor() {}
}
