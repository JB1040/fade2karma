import { Component, HostListener, Input, OnInit } from '@angular/core';
import { TimeTransfer } from '../core/time-transfer';
import { Deck } from '../decks/deck';
import { DustCalculationService } from '../core/dust-calculation.service';
import { Router } from '@angular/router';

@Component({
    selector: 'f2kDeckListRow',
    templateUrl: './decklistrow.component.html',
    styleUrls: ['../app.component.css', './decklistrow.component.scss']
})
export class DeckListRowComponent implements OnInit {

    @Input() protected deck: Deck; // TODO deck type
    @Input() protected odd: Boolean;
    @Input() protected even: Boolean;
    @Input() protected index: Number;
    @Input() protected mode: string; // 'STANDARD' / 'WILD' / 'ARENA' when there is 3 images for each more use to set image
    dustCost: number;

    displayDate: string;

    @HostListener('click') onClick() {
        this.router.navigate([`/tier_list/${this.deck.title.replace(/ /g, '_').replace(/[^a-zA-Z0-9;,+*()\'$!-._~?/]/g, '').toLowerCase()}_${this.deck.id}`]);
    }

    constructor(private router: Router) {}

    ngOnInit() {
        if ((Date.now() - (this.deck.changeDate || this.deck.date)) < 1000 * 60 * 60 * 24 * 7) { // if less then 1 week
            this.displayDate = TimeTransfer.getTime(this.deck.changeDate || this.deck.date);
        }
        this.dustCost = DustCalculationService.getDustCost(this.deck.cards);
    }
}
