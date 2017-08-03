import { Component, OnInit, Renderer2, Input } from '@angular/core';

@Component({
    selector: 'f2k-rating-box',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
    @Input() rating: number;
    @Input() liked: boolean;

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
        const ratingAngle = this.renderer.selectRootElement(".rating-angle");
        if(!this.liked) {
            this.renderer.addClass(ratingAngle, 'leaveup');
            setTimeout(() => {
                this.renderer.addClass(ratingAngle, 'hide');
                this.renderer.removeClass(ratingAngle, 'leaveup');
            }, 300);
            setTimeout(() => {
                this.renderer.removeClass(ratingAngle, 'hide');
                this.rating += 1;
            }, 600);
        } else {
            this.rating -= 1;
        }

        this.liked = !this.liked;
    }
}
