import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuyPageComponent } from './list-buy-page.component';

describe('ListBuyPageComponent', () => {
  let component: ListBuyPageComponent;
  let fixture: ComponentFixture<ListBuyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBuyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBuyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
