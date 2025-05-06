import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppNameTitleStrategyService } from './shared/services/app-name-title-strategy.service';
import { HttpLoaderInterceptor } from './shared/functions/HttpLoaderInterceptor';
import { GlobalErrorHandlerComponent } from './shared/components/global-error-handler/global-error-handler.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([HttpLoaderInterceptor])),
    { provide: TitleStrategy, useClass: AppNameTitleStrategyService },
    {provide: ErrorHandler , useClass: GlobalErrorHandlerComponent}
  ],
};
