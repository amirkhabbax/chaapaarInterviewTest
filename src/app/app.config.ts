import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppNameTitleStrategyService } from './shared/services/app-name-title-strategy.service';
import { HttpLoaderInterceptor } from './shared/functions/HttpLoaderInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([HttpLoaderInterceptor])),
    { provide: TitleStrategy, useClass: AppNameTitleStrategyService },
  ],
};
