import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBuyPageComponent } from './register-buy-page.component';

describe('RegisterBuyPageComponent', () => {
  let component: RegisterBuyPageComponent;
  let fixture: ComponentFixture<RegisterBuyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterBuyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBuyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
