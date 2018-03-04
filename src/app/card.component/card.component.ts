import { Component, HostBinding, Input } from '@angular/core';
import Card from '../card';
import { Games } from '../decks/deck';
import { GetImageSrc } from '../core/globals';

@Component({
    selector: 'f2kCardComponent',
    templateUrl: './card.component.html',
    styleUrls: ['../app.component.css', './card.component.css']
})

export class CardComponent {
    @Input() card: Card;
    @Input() cardId: string;
    @Input() game: Games;

    @HostBinding('class') class = 'f2kHoverCard';

    getImageSrc = GetImageSrc;
}
