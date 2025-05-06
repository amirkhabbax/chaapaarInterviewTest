import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthComponent } from './oauth.component';
import { LoaderService } from '../shared/services/loader.service';

describe('OauthComponent', () => {
  let component: OauthComponent;
  let fixture: ComponentFixture<OauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OauthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should get the loader' visibility from the service", () => {
    const fixture = TestBed.createComponent(OauthComponent);
    const app = fixture.componentInstance;
    let loaderService = fixture.debugElement.injector.get(LoaderService);
    fixture.detectChanges();
    let isVisible = loaderService.isLoadingVisible();
    expect(app.hideMainContent()).toEqual(isVisible);
  });
});
