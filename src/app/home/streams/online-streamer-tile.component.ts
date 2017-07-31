import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';
import { Streamer } from './streamer';

@Component({
    selector: 'f2kOnlineStreamerTile',
    templateUrl: './online-streamer-tile.component.html',
    styleUrls: ['./online-streamer-tile.component.css']
})
export class OnlineStreamerTileComponent implements OnChanges {
    @Input() streamer: Streamer;
    @Input() moved: number;
    @Input() index: number;
    @Input() containerWidth: number;
    @Input() itemsCount: number;
    marginRight: number;
    marginLeft: number;
    spaceBetweenTiles = 10;

    @Output() currentStreamer = new EventEmitter<Streamer>();

    @HostListener('transitionend') transitioned() {
        this.setMargins();
        if (parseInt(this.el.nativeElement.style.left, 10) < 0) {
            const compStyle = window.getComputedStyle(this.el.nativeElement);
            const width = parseInt(compStyle.width, 10);
            this.el.nativeElement.style.transition = 'none';
            let position = (this.itemsCount - 1) * (width + this.spaceBetweenTiles) + this.marginLeft;
            if (position >= (this.containerWidth - this.marginRight) && this.containerWidth >= 768 && this.containerWidth >= 768) {
                position += 15;
            }
            this.el.nativeElement.style.left = position + 'px';
        }
    }

    constructor(private el: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.setMargins();
        this.setPostition();
    }

    setMargins() {
        if (this.containerWidth === 1220) {
            this.marginLeft = 20;
            this.marginRight = 10;
        } else if (this.containerWidth === 768) {
            this.marginLeft = 25;
            this.marginRight = 15;
        } else {
            this.marginLeft = 15;
            this.marginRight = 0;
        }
    }

    setPostition() {
        const compStyle = window.getComputedStyle(this.el.nativeElement);
        const width = parseInt(compStyle.width, 10) + this.spaceBetweenTiles;
        console.log(this.containerWidth);
        if (this.containerWidth && this.itemsCount > (this.containerWidth - this.marginLeft - this.marginRight) / width) {
            let position = ((this.index * width) - (this.moved * width)) % (this.itemsCount * width);
            this.el.nativeElement.style.left = position + 'px';
            if (position < -width) {
                position += this.itemsCount * width;
            }
            this.el.nativeElement.style.opacity = 1;
            position += position % width * 10;
            position += this.marginLeft;
            if (position < 0) {
                this.currentStreamer.emit(this.streamer);
            }
            if (position > 700) {
                console.log(position);
            }
            if (position >= (this.containerWidth - this.marginRight)) {
                position += 15;
            }
            this.el.nativeElement.style.transition = 'left 600ms linear';
            this.el.nativeElement.style.left = position + 'px';
        } else {
            this.el.nativeElement.style.opacity = 1;
            let position = this.index * width + this.marginLeft;
            if (position >= (this.containerWidth - this.marginRight) && this.containerWidth >= 768) {
                position += 15;
            }
            this.el.nativeElement.style.left = position + 'px';
        }
    }
}
