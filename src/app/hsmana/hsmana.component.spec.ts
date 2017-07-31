import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearthstoneManaComponent } from './hsmana.component';

describe('HearthstoneManaComponent', () => {
  let component: HearthstoneManaComponent;
  let fixture: ComponentFixture<HearthstoneManaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearthstoneManaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearthstoneManaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
