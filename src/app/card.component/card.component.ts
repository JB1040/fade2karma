import { Component, Input } from '@angular/core';
import Card from '../card';

@Component({
    selector: 'f2kCardComponent',
    templateUrl: './card.component.html',
    styleUrls: ['../app.component.css', './card.component.scss']
})

export class CardComponent {
    @Input() card: Card;
}
