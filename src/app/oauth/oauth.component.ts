import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-oauth',
  imports: [RouterOutlet],
  templateUrl: './oauth.component.html',
  styleUrl: './oauth.component.scss'
})
export class OauthComponent {
  private _loaderService = inject(LoaderService);
  hideMainContent = computed(() => {return this._loaderService.isLoadingVisible()});
}
