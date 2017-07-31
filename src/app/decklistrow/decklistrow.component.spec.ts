import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckListRowComponent } from './decklistrow.component';

describe('DeckListRowComponent', () => {
  let component: DeckListRowComponent;
  let fixture: ComponentFixture<DeckListRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckListRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
