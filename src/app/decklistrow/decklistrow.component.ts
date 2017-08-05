import { Component, Input, OnInit } from '@angular/core';
import { TimeTransfer } from '../core/time-transfer';

@Component({
    selector: 'f2kDeckListRow',
    templateUrl: './decklistrow.component.html',
    styleUrls: ['../app.component.css', './decklistrow.component.scss']
})
export class DeckListRowComponent implements OnInit {

    @Input() protected deck: any; // TODO deck type
    @Input() protected odd: Boolean;
    @Input() protected even: Boolean;
    @Input() protected index: Number;

    displayDate: string;

    ngOnInit() {
        if ((Date.now() - this.deck.date) < 1000 * 60 * 60 * 24 * 7) { // if less then 1 week
            this.displayDate = TimeTransfer.getTime(this.deck.date);
        }
    }
}
