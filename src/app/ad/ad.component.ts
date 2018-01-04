import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'f2k-ad',
    templateUrl: './ad.component.html',
    styles: [`
        :host {
            display: block;
        }
    `]
})
export class AdComponent implements AfterViewInit {
    @Input() adStyle?: any;
    @Input() adFormat = '';
    @Input() adLayout = '';
    @Input() adLayoutKey = '';
    @Input() adSlot: string;

    adClient: 'ca-pub-5126766313804047';

    ngAfterViewInit() {
        (window.adsbygoogle || []).push({});
    }
}
