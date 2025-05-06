import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export function HttpLoaderInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  let loaderService = inject(LoaderService);
  loaderService.show();
  document.getElementById('mainContent')?.classList.add('hide');
  return next(req).pipe(
    finalize(() => {
      loaderService.hide();
      document.getElementById('mainContent')?.classList.remove('hide');
    })
  );
}