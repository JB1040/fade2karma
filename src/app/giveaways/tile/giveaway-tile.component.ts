import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Article } from '../../articles/article';

@Component({
    selector: 'f2kGiveawayTile',
    templateUrl: './giveaway-tile.component.html',
    styleUrls: ['./giveaway-tile.component.css'],
})
export class GiveawayTileComponent implements OnInit {
    @Input() giveaway: Article;

    constructor(private el: ElementRef) {};

    ngOnInit(): void {
        const fragment = document.createRange().createContextualFragment(this.giveaway.content);
        this.el.nativeElement.appendChild(fragment);
    }
}
