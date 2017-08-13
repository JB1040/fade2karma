import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Article } from '../articles/article';
import { TimeTransfer } from '../core/time-transfer';
import { Deck } from '../decks/deck';
import { Router } from '@angular/router';

@Component({
    selector: 'f2kRecommendedTile',
    templateUrl: './teased-tile.component.html',
    styleUrls: ['./teased-tile.component.css']
})
export class RecommendedTileComponent implements OnInit {

    @Input() teasedItem: Article | Deck;
    @Input() type: string;
    date: string;

    @Output() width = new EventEmitter<number>();

    @HostListener('click') onClick() {
        if (this.type = 'deck') {
            this.router.navigate([`/decks/${this.teasedItem.title.replace(/ /g, '_').toLowerCase()}_${this.teasedItem.id}`]);
        } else {
            this.router.navigate([`/articles/${this.teasedItem.title.replace(/ /g, '_').toLowerCase()}_${this.teasedItem.id}`]);
        }
    }
    constructor(private el: ElementRef, private router: Router) {
    }

    ngOnInit() {
        this.width.emit(this.el.nativeElement.clientWidth);
        this.date = TimeTransfer.getTime(this.teasedItem.date);
    }
}
