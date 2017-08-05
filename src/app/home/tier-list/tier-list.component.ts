import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Article } from '../../articles/article';
import { DeckHs } from '../../decks/deck';
import { CanvasService } from 'app/core/canvas.service';

@Component({
    selector: 'f2kTierListComponent',
    templateUrl: './tier-list.component.html',
    styleUrls: ['./tier-list.component.css']
})
export class TierListComponent implements OnInit {
    @Input() items: Article[] | DeckHs[];
    @Input() title: string;
    tiers: (Article[] | DeckHs[])[];

    constructor(private canvas: CanvasService, private el: ElementRef) {
    }

    ngOnInit() {
        this.tiers = [this.items.slice(0, 4), this.items.slice(4)];
    }
}

