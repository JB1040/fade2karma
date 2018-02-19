import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Article } from '../../articles/article';
import { Deck } from '../../decks/deck';

@Component({
    selector: 'f2kTierListComponent',
    templateUrl: './tier-list.component.html',
    styleUrls: ['./tier-list.component.css']
})
export class TierListComponent implements OnChanges {
    @Input() tierOne: Article[] | Deck[];
    @Input() title: string;
    @Input() type: string;
    tiers: (Article[] | Deck[])[];

    constructor() {
    }

    ngOnChanges(change: SimpleChanges) {
        if (change.tierOne || change.tierTwo) {
            this.tiers = [this.tierOne];
        }
    }
}

