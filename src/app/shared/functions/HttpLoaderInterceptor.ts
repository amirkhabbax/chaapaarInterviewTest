import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export function HttpLoaderInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  let loaderService = inject(LoaderService);
  loaderService.isLoadingVisible.set(true);
  return next(req).pipe(
    finalize(() => {
      setTimeout(() => {
        loaderService.isLoadingVisible.set(false);
      }, 1);
    })
  );
}
