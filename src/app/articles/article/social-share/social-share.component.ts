import { Component, Input, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'f2k-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.css']
})
export class SocialShareComponent {
  @Input() url: string;
  @Input() text: string;

  constructor(@Inject(DOCUMENT) private docEl: Document) { }

  copyToClipboard(): void {
    let textArea = this.docEl.createElement("textarea");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    this.docEl.body.appendChild(textArea);
    textArea.value = this.url;
    textArea.select();
    this.docEl.execCommand("copy");
    textArea.remove();
  }

}
