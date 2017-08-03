import { Component, OnInit, Renderer2} from '@angular/core';

@Component({
    selector: 'f2k-rating-box',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
    /* TODO: Dynamic functionality */
    public score: number = 12;
    public liked: boolean = false;

    constructor(private renderer: Renderer2) { }

    ngOnInit() {
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
                this.score += 1;
            }, 600);
        } else {
            this.score -= 1;
        }

        this.liked = !this.liked;
    }

}
