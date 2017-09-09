import { Component } from '@angular/core';

@Component({
    templateUrl: './dmca.component.html',
    styles: [`
    :host {
        display: block;
        padding: 30px 0;
    }
    p {
        white-space: pre-line;
    }
    h1 {
        margin-bottom: 20px;
    }
    h3 {
        margin: 1em 0;
    }
    ol > li:not(:last-child) {
        padding-bottom: 10px;
    }
  `],
})
export class DmcaComponent {}
