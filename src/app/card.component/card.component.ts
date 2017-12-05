import { Component, Input } from '@angular/core';
import Card from '../card';
import { Games } from '../decks/deck';
import { GetImageSrc } from '../decks/new-deck-hub/new-deck-hub.component';

@Component({
    selector: 'f2kCardComponent',
    templateUrl: './card.component.html',
    styleUrls: ['../app.component.css', './card.component.css']
})

export class CardComponent {
    @Input() card: Card;
    @Input() game: Games;

    getImageSrc = GetImageSrc;
}
