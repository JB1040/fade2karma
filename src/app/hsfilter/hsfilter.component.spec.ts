import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearthstoneFilterComponent } from './hsfilter.component';

describe('HearthstoneFilterComponent', () => {
  let component: HearthstoneFilterComponent;
  let fixture: ComponentFixture<HearthstoneFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearthstoneFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearthstoneFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
