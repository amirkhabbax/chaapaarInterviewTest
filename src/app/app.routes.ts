import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'ouath', pathMatch: 'full' },
  {
    path: 'ouath',
    loadChildren: () => import('./oauth/oauth.routes'),
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './shared/components/page-not-found/page-not-found.component'
      ).then((c) => c.PageNotFoundComponent),
  },
];
