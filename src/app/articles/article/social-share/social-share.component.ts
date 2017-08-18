import { Component, Input, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BASE_URL } from '../../../core/globals';

@Component({
    selector: 'f2k-social-share',
    templateUrl: './social-share.component.html',
    styleUrls: ['./social-share.component.css']
})
export class SocialShareComponent {
    @Input() text: string;
    routerSubscription: any;

    constructor(@Inject(DOCUMENT) private docEl: Document, public router: Router) {
    }

    getEncodedUrl(): string {
      return encodeURIComponent(this.docEl.location.href);
    }

    copyToClipboard(): void {
        const textArea = this.docEl.createElement('textarea');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        this.docEl.body.appendChild(textArea);
        textArea.value = this.docEl.location.href;
        textArea.select();
        this.docEl.execCommand('copy');
        textArea.remove();
    }
}
