import { Routes } from '@angular/router';
import { OauthComponent } from './oauth.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export default [
  {
    path: '',
    component: OauthComponent,
    children: [
      { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
      { path: 'sign-up', component: SignUpComponent },
    ],
  },
] as Routes;
