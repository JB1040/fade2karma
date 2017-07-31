import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManatableComponent } from './manatable.component';

describe('ManatableComponent', () => {
  let component: ManatableComponent;
  let fixture: ComponentFixture<ManatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
