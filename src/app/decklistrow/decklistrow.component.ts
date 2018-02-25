import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { TimeTransfer } from '../core/time-transfer';
import { Deck } from '../decks/deck';
import { Router } from '@angular/router';

@Component({
    selector: 'f2kDeckListRow',
    templateUrl: './decklistrow.component.html',
    styleUrls: ['../app.component.css', './decklistrow.component.scss']
})
export class DeckListRowComponent implements OnInit {

    @Input() deck: Deck;
    @Input() odd: Boolean;
    @Input() even: Boolean;
    @Input() index: Number;
    @Input() mode: string; // 'STANDARD' / 'WILD' / 'ARENA' when there is 3 images for each more use to set image
    @Input() showTier = true;
    dustCost: number;
    url: string;
    color = '';

    displayDate: string;

    @HostBinding('class') class = 'clearfix';

    constructor(private router: Router) {}

    ngOnInit() {
        this.url = `${this.router.url}/${this.deck.title.replace(/ /g, '_').replace(/[:<>;,+*()'$!-.~?/]/g, '').toLowerCase()}_${this.deck.id}`;
        this.displayDate = TimeTransfer.getTime(this.deck.editDate || this.deck.date);
        this.dustCost = this.deck.decks[0].dust;
    }
}
