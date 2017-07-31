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

    constructor(private canvas: CanvasService, private el: ElementRef) {}

    ngOnInit() {
        this.tiers = [this.items.slice(0, 4), this.items.slice(4)];

        const elementStyle = window.getComputedStyle(this.el.nativeElement.querySelector('h5'));
        console.log(this.canvas.getTextWidht(this.title, elementStyle.fontWeight, elementStyle.fontSize, elementStyle.fontFamily), this.el.nativeElement.clientWidth);
        // const split = this.canvas.getTextWidht(this.title, elementStyle.fontWeight, elementStyle.fontSize, elementStyle.fontFamily) / this.el.nativeElement.clientWidth * 100; // TODO
        const split = this.canvas.getTextWidht(this.title, elementStyle.fontWeight, elementStyle.fontSize, elementStyle.fontFamily) / 340 * 100;
        this.el.nativeElement.style.backgroundImage = `linear-gradient(to right, #ef3418 0%, #ef3418 ${split}%, #333333 ${split}%, #333333 100%)`;
    }
}
