import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { HtmlHovererComponent } from '../html-hoverer/html-hoverer.component';

@Injectable()
export class HoverService {
    private hoveredCardSource = new Subject<string | void>();
    private openedWithClick: boolean;
    private clickOnHoverableElement: MouseEvent;
    private htmlHover: HtmlHovererComponent;

    hoveredCard = this.hoveredCardSource.asObservable();

    constructor(@Inject(DOCUMENT) private doc: Document) {
        document.addEventListener('click', $event => this.onDocumentClick($event));
    }

    // TODO html hover should only have input and if that input is there then display it, else not, and don't do it with function calls, but *ngIf="inputString"
    setHtmlHover(htmlHover: HtmlHovererComponent): void {
        this.htmlHover = htmlHover;
    }

    private onDocumentClick($event: MouseEvent): void {
        if (this.openedWithClick && $event.button !== 2 && $event !== this.clickOnHoverableElement) {
            this.openedWithClick = false;
            this.htmlHover.close();
        }
    }

    initTextCardHover(containerElement: HTMLElement, selector = '.f2kHoverCard'): void {
        const hoverableElements = containerElement.querySelectorAll<HTMLSpanElement>(selector);
        this.makeElementsHoverable(hoverableElements);
    }

    private makeElementsHoverable(hoverableElements: NodeListOf<HTMLElement>): void {
        for (let i = 0; i < hoverableElements.length; i++) {
            const hoverableElement = hoverableElements[i];
            const cardId = hoverableElement.getAttribute('data-id') || hoverableElement.getAttribute('ng-reflect-card-id');
            if (cardId) {
                hoverableElement.addEventListener('click', $event => {
                    this.clickOnHoverableElement = $event;
                    this.hoveredCardSource.next(`<img src="${encodeURI(`assets/images/static/hearthstone/${cardId}.png`)}">`);
                    this.openHover($event, true);
                });

                hoverableElement.addEventListener('mouseenter', $event => {
                    this.hoveredCardSource.next(`<img src="${encodeURI(`assets/images/static/hearthstone/${cardId}.png`)}">`);
                    this.openHover($event);
                });

                hoverableElement.addEventListener('mousemove', $event => {
                    this.htmlHover.positionRelativeToMouse($event);
                });

                hoverableElement.addEventListener('mouseleave', $event => {
                    this.closeHover();
                });
            }
        }
    }

    // on mobile if only click based events to show cards if screen size is to small for hover to work properly
    private openHover($event: MouseEvent, clickOpen?: boolean): void {
        if (clickOpen) {
            this.openedWithClick = true;
            this.htmlHover.open($event);
        } else if (window.innerWidth > 600 || window.innerHeight > 800) {
            this.htmlHover.open($event);
        }
    }

    private closeHover(): void {
        if (!this.openedWithClick && (window.innerWidth > 600 || window.innerHeight > 800)) {
            this.htmlHover.close();
        }
    }
}
