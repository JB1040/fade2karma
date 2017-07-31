import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwentFilterComponent } from './gwfilter.component';

describe('GwentFilterComponent', () => {
  let component: GwentFilterComponent;
  let fixture: ComponentFixture<GwentFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwentFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
