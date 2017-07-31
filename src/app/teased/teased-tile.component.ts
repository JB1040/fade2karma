import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from '../articles/article';
import { TimeTransfer } from '../core/time-transfer';
import { DeckHs } from '../decks/deck';

@Component({
    selector: 'f2kRecommendedTile',
    templateUrl: './teased-tile.component.html',
    styleUrls: ['./teased-tile.component.css']
})
export class RecommendedTileComponent implements OnInit {
    @Input() teasedItem: Article | DeckHs;
    date: string;

    @Output() width = new EventEmitter<number>();

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.width.emit(this.el.nativeElement.clientWidth);
        this.date = TimeTransfer.getTime(this.teasedItem.date);
    }
}
