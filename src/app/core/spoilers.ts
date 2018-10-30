import { Injectable } from '@angular/core';
import { HoverService } from './hover.service';
import { CopyDeckCodeService } from './copy-deck-code.service';

const COLLAPSED_CLASS = 'collapsed';
const EXPANDED_CLASS = 'expanded';

@Injectable()
export class SpoilerService {
    constructor(private hoverService: HoverService, private copyDeckCodeService: CopyDeckCodeService) {}

    initSpoilers(containerElement: HTMLElement): void {
        const spoilerElements = containerElement.querySelectorAll<HTMLSpanElement>('.f2kSpoiler');
        for (let i = 0; i < spoilerElements.length; i++) {
            const clickEl = document.createElement('span');

            const spoilerElement = spoilerElements[i];
            const content = spoilerElement.innerHTML;
            this.toggleSpoiler(spoilerElement, clickEl, content);

            clickEl.addEventListener('click', () => {
                this.toggleSpoiler(spoilerElement, clickEl, content);
            });
        }
    }

    toggleSpoiler(el: HTMLSpanElement, clickEl: HTMLSpanElement, initialContent: string): void {
        if (el.classList.contains(COLLAPSED_CLASS)) {
            el.classList.add(EXPANDED_CLASS);
            el.classList.remove(COLLAPSED_CLASS);
            el.innerHTML = initialContent;
            clickEl.innerHTML = '[-]';
            this.hoverService.initTextCardHover(el);
            this.copyDeckCodeService.initDeckCodeCopy(el);
        } else {
            el.classList.add(COLLAPSED_CLASS);
            el.classList.remove(EXPANDED_CLASS);
            el.innerHTML = '';
            clickEl.innerHTML = '[+]';
        }
        el.insertBefore(clickEl, el.childNodes[0]);
    }
}
