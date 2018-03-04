import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class CopyDeckCodeService {

    constructor(@Inject(DOCUMENT) private docEl: Document) { }

    copyDeckCode(deckCode: string): void {
        if (document.execCommand('copy')) {
            const textArea = this.docEl.createElement('textarea');
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            this.docEl.body.appendChild(textArea);
            textArea.value = deckCode;
            textArea.select();
            this.docEl.execCommand('copy');
            textArea.remove();
        } else {
            prompt('Deck code could not be automatically copied\nto your clipboard, but you can manually copy it.', deckCode);
        }
    }

    initDeckCodeCopy(containerElement: HTMLElement): void {
        const deckCodeButtons = containerElement.querySelectorAll<HTMLSpanElement>('.f2kDeckCode');
        for (let i = 0; i < deckCodeButtons.length; i++) {
            const deckCodeButton = deckCodeButtons[i];
            const innerHtml = deckCodeButton.innerHTML;
            deckCodeButton.addEventListener('click', () => {
                this.copyDeckCode(deckCodeButton.getAttribute('title'));
                deckCodeButton.innerHTML = '✔ ' + innerHtml;
                setTimeout(() => { deckCodeButton.innerHTML = innerHtml; }, 5000);
            });
        }
    }
}
