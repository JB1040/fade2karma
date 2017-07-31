import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Streamer } from './streamer';

@Component({
    selector: 'f2kOnlineSteamerScroll',
    templateUrl: './online-streamer-scroll.component.html',
    styleUrls: ['./online-streamer-scroll.component.css']
})
export class OnlineStreamerScrollComponent implements OnDestroy, OnInit {
    @Input() onlineStreamers: any;
    containerWidth: number;
    moved = 0;
    timeoutScroll: any;

    @HostListener('window:resize') resized() {
        this.containerWidth = parseInt(window.getComputedStyle(this.el.nativeElement).width, 10);
    }

    constructor(private el: ElementRef) {
        this.timeoutScroll = Observable.interval(5000).subscribe(() => {
            this.moved++;
            this.containerWidth = parseInt(window.getComputedStyle(this.el.nativeElement).width, 10);
        });
    }

    ngOnInit() {
        this.containerWidth = parseInt(window.getComputedStyle(this.el.nativeElement).width, 10);
    }

    ngOnDestroy() {
        this.timeoutScroll.unsubscribe();
    }
}
