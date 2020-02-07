import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemodalComponent } from './updatemodal.component';

describe('UpdatemodalComponent', () => {
  let component: UpdatemodalComponent;
  let fixture: ComponentFixture<UpdatemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
