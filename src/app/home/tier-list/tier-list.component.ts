import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../articles/article';
import { Deck } from '../../decks/deck';

@Component({
    selector: 'f2kTierListComponent',
    templateUrl: './tier-list.component.html',
    styleUrls: ['./tier-list.component.css']
})
export class TierListComponent implements OnInit {
    @Input() tierOne: Article[] | Deck[];
    @Input() tierTwo: Article[] | Deck[];
    @Input() title: string;
    @Input() type: string;
    tiers: (Article[] | Deck[])[];

    constructor() {
    }

    ngOnInit() {
        this.tiers = [this.tierOne, this.tierTwo];
    }
}

