import { Component, inject } from '@angular/core';
import { LanguageHandlerService } from '../../services/language-handler.service';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  private languageHandlerService = inject(LanguageHandlerService);

  get isPersian() {
    return this.languageHandlerService.langauge() == 'fa';
  }
}
