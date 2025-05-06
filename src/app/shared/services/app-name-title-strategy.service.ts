import { DestroyRef, inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { LanguageHandlerService } from './language-handler.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AppNameTitleStrategyService extends TitleStrategy {
  private readonly titleService = inject(Title);
  private readonly languageHandlerService = inject(LanguageHandlerService);
  private destroyRef = inject(DestroyRef);
  language$ = toObservable(this.languageHandlerService.langauge);

  override updateTitle(snapshot: RouterStateSnapshot) {
    this.language$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((language: string) => {
        this.titleService.setTitle(
          language === 'fa' ? 'احراز هویت' : 'Authentication'
        );
      });
  }
}
