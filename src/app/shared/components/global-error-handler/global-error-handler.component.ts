import { HttpErrorResponse } from '@angular/common/http';
import { Component, ErrorHandler, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { LanguageHandlerService } from '../../services/language-handler.service';
import { ThemesService } from '../../services/themes.service';
@Component({
  selector: 'app-global-error-handler',
  imports: [],
  templateUrl: './global-error-handler.component.html',
  styleUrl: './global-error-handler.component.scss',
})
export class GlobalErrorHandlerComponent extends ErrorHandler {
  private languageHandlerService = inject(LanguageHandlerService);
  private themesService = inject(ThemesService);
  override handleError(error: any): void {
    // if (!(error instanceof HttpErrorResponse)) {
    //   error = error.rejction;
    // }

    let errorMessage: string =
      error?.message ??
      (this.languageHandlerService.langauge() == 'fa'
        ? 'خطای ناشناخته'
        : 'Undefined error!');
    let errorFooterMessage: string = `${error?.status} ${error?.statusText}`;

    Swal.fire({
      icon: 'error',
      title:
        this.languageHandlerService.langauge() == 'fa' ? 'خطا...' : 'Oops...',
      theme: this.themesService.isDarkMode() ? 'dark' : 'light',
      text: errorMessage,
      footer:
        errorFooterMessage ?? (this.languageHandlerService.langauge() == 'fa'
          ? 'وضعیت خطای ناشناخته'
          : 'Undefinded error status'),
    });
  }
}