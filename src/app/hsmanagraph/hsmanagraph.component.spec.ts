import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearthstoneManaGraphComponent } from './hsmanagraph.component';

describe('HearthstoneManaGraphComponent', () => {
  let component: HearthstoneManaGraphComponent;
  let fixture: ComponentFixture<HearthstoneManaGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearthstoneManaGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearthstoneManaGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
