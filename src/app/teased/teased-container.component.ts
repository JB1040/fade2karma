import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Article } from '../articles/article';
import { DeckHs } from '../decks/deck';
import { CanvasService } from '../core/canvas.service';

@Component({
    selector: 'f2kRecommendedContainer',
    templateUrl: './teased-container.component.html',
    styleUrls: ['./teased-container.component.css']
})
export class RecommendedContainerComponent {
    @Input() items: Article[] | DeckHs[];
    @Input() title: string;
    width: number;

    @HostListener('window:resize') resized() {
        const elementStyle = window.getComputedStyle(this.el.nativeElement.querySelector('h5'));
        const split = this.canvas.getTextWidht(this.title, elementStyle.fontWeight, elementStyle.fontSize, elementStyle.fontFamily) / parseInt(elementStyle.width, 10) * 100;
        this.el.nativeElement.style.backgroundImage = `linear-gradient(to right, #ef3418 0%, #ef3418 ${split}%, #333333 ${split}%, #333333 100%)`;
    }

    constructor(private canvas: CanvasService, private el: ElementRef) {}

    setBorder(event: number) {
        const elementStyle = window.getComputedStyle(this.el.nativeElement.querySelector('h5'));
        const split = this.canvas.getTextWidht(this.title, elementStyle.fontWeight, elementStyle.fontSize, elementStyle.fontFamily) / event * 100;
        this.el.nativeElement.style.backgroundImage = `linear-gradient(to right, #ef3418 0%, #ef3418 ${split}%, #333333 ${split}%, #333333 100%)`;
    }
}
