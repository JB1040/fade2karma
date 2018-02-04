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

    ngAfterViewInit() {
        console.log(window.adsbygoogle);
        (window.adsbygoogle || []).push({});
    }
}
