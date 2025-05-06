import {
  Component,
  computed,
  DestroyRef,
  effect,
  Inject,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { LanguageHandlerService } from './shared/services/language-handler.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ThemesService } from './shared/services/themes.service';
import { DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoaderService } from './shared/services/loader.service';
import { LoadingLineComponent } from './shared/components/loading-line-component/loading-line.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, MatButtonToggleModule,MatIconModule,MatButtonModule, MatTooltipModule, LoadingLineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'chaapaarInterviewTest';
  private _languageHandlerService = inject(LanguageHandlerService);
  private _themesService = inject(ThemesService);
  private _loaderService = inject(LoaderService);
  private destroyRef = inject(DestroyRef);
  fontSize = signal(100);
  isLoadingVisible$ = toObservable(this._loaderService.isLoadingVisible);
  showLoader =signal(false);

  constructor(@Inject(DOCUMENT) private _document: any) {
    effect(() => {
      this.updateScheme(this._themesService.isDarkMode());
    });
  }

  ngOnInit(): void {
    this.isLoadingVisible$.pipe(delay(0),takeUntilDestroyed(this.destroyRef)).subscribe((isVisible: boolean) => {
        this.showLoader.set(isVisible);
    });
  }

  languageChanged(event: any) {
    this._languageHandlerService.changeLanguage(event.value);

    document.getElementById('mainContent')?.classList.toggle('persian');
    document.getElementById('navBar')?.classList.toggle('topRight');
  }

  get isPersian() {
    return this._languageHandlerService.langauge() === 'fa';
  }

  darkModeToggled(event: MatSlideToggleChange) {
    this._themesService.toggleDarkMode();
  }

  updateScheme(isDarkMode: boolean) {
    this._document.body.setAttribute(
      'data-layout-color',
      isDarkMode ? 'dark' : 'light'
    );
  }

  increaseTextSize(){
    if(this.fontSize()==150) return;
    this.fontSize.update(current => current+5);
    document.body.style.fontSize =  this.fontSize()+'%';
  }

  decreaseTextSize(){
    if(this.fontSize()==50) return;
    this.fontSize.update(current => current-5);
    document.body.style.fontSize =  this.fontSize()+'%';
  }
}
