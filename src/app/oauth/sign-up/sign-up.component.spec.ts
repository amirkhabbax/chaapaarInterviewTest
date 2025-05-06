import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { GetFormService } from './get-form.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
      providers: [HttpClient, provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should fetch the form's title from the service", () => {
    const fixture = TestBed.createComponent(SignUpComponent);
    const app = fixture.componentInstance;
    let getFormService = fixture.debugElement.injector.get(GetFormService);
    fixture.detectChanges();
    let title = getFormService.fetchedValues.value()?.title;
    expect(app.form().title).toEqual(title ?? '');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SignUpComponent);
    const app = fixture.componentInstance;
    let getFormService = fixture.debugElement.injector.get(GetFormService);
    fixture.detectChanges();
    let title = getFormService.fetchedValues.value()?.title;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toEqual(title ?? '');
  });
});
