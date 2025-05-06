import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { LanguageHandlerService } from '../../services/language-handler.service';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should get the loader' visibility from the service", () => {
    const fixture = TestBed.createComponent(PageNotFoundComponent);
    const app = fixture.componentInstance;
    let languageHandlerService = fixture.debugElement.injector.get(
      LanguageHandlerService
    );
    fixture.detectChanges();
    let isPersian = languageHandlerService.langauge() == 'fa';
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toEqual(
      isPersian ? '404 صفحه مورد نظر یافت نشد!' : '404 Page Not Found!'
    );
  });
});
