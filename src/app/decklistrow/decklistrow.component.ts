import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { TimeTransfer } from '../core/time-transfer';
import { Deck, TopLegendDeck } from '../decks/deck';

@Component({
    selector: 'f2kDeckListRow',
    templateUrl: './decklistrow.component.html',
    styleUrls: ['../app.component.css', './rank-cell.scss', './decklistrow.component.scss']
})
export class DeckListRowComponent implements OnInit {

    @Input() deck: Deck | TopLegendDeck | any;
    @Input() displayedProperties: Array<string> = ['resource', 'date', 'title', 'difficulty', 'tier'];
    @Input() lgCollapsed = true;
    @Input() odd: boolean;
    @Input() even: boolean;

    dustCost: number;
    url: string;
    displayDate: string;

    @HostBinding('class') class = `clearfix${this.lgCollapsed ? ' lg-collapsed' : ''}`;

    constructor() {}

    ngOnInit() {
        this.url = `./${this.deck.title.replace(/ /g, '_').replace(/[:<>;,+*()'$!-.~?/]/g, '').toLowerCase()}_${this.deck.id}`;
        if (this.displayedProperties.indexOf('date') !== -1) {
            this.displayDate = TimeTransfer.getTime(this.deck.editDate || this.deck.date);
        }
        if (this.displayedProperties.indexOf('resource') !== -1) {
            this.dustCost = ('deck' in this.deck ? this.deck.deck : this.deck.decks[0]).dust;
        }
        this.class = `clearfix${this.lgCollapsed ? ' lg-collapsed' : ''}${this.even ? ' even' : this.odd ? ' odd' : ''}`;
    }

    isDisplayed(property: string): boolean {
        return this.displayedProperties.indexOf(property) !== -1;
    }
}
