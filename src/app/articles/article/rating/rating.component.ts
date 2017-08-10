import { Component, OnInit, Renderer2, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'f2k-rating-box',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
    @Input() rating: number;
    @Input() liked: boolean;
    @ViewChild('upAngle') ratingAngle;

    constructor(private renderer: Renderer2) { }

    ngOnInit() {
        // TODO: This is just for testing
        if(this.rating === undefined) {
            this.rating = 0;
        }
        if(this.liked === undefined) {
            this.liked = false;
        }
    }

    changeRating(): void {
        if(!this.liked) {
            this.renderer.addClass(this.ratingAngle.nativeElement, 'leaveup');
            setTimeout(() => {
                this.renderer.addClass(this.ratingAngle.nativeElement, 'hide');
                this.renderer.removeClass(this.ratingAngle.nativeElement, 'leaveup');
            }, 300);
            setTimeout(() => {
                this.renderer.removeClass(this.ratingAngle.nativeElement, 'hide');
                this.rating += 1;
            }, 400);
        } else {
            this.rating -= 1;
        }

        this.liked = !this.liked;
    }
}
