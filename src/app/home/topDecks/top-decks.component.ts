import { Component, Input } from '@angular/core';
import { Article } from '../../articles/article';
import { Deck } from '../../decks/deck';

@Component({
    selector: 'f2kTopDecks',
    templateUrl: './top-decks.component.html',
    styleUrls: ['./top-decks.component.css']
})
export class TopDecksComponent {
    @Input() itemArr: Deck[][];
    @Input() title: string;
}
