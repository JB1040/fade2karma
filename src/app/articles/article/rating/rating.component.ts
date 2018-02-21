import { Component, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BASE_URL } from '../../../core/globals';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'f2k-rating-box',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnDestroy {

    @Input() rating: number;
    @Input() liked: boolean;
    @Input() itemId: number;
    @Input() itemType: string; // article / deck
    @ViewChild('upAngle') ratingAngle;

    subscriptions: Array<Subscription> = [];

    constructor(private renderer: Renderer2, private http: HttpClient) {
    }

    ngOnInit() {
        // TODO: This is just for testing
        if (this.rating === undefined) {
            this.rating = 0;
        }
        if (this.liked === undefined) {
            this.liked = false;
        }
    }

    changeRating(): void {
        if (this.liked) { // if already liked exit, at the moment after you like, it stays...
            return;
        }

        this.renderer.addClass(this.ratingAngle.nativeElement, 'leaveup');
        setTimeout(() => {
            this.renderer.addClass(this.ratingAngle.nativeElement, 'hide');
            this.renderer.removeClass(this.ratingAngle.nativeElement, 'leaveup');
        }, 300);
        setTimeout(() => {
            this.renderer.removeClass(this.ratingAngle.nativeElement, 'hide');
            this.rating += 1;
        }, 400);

        this.liked = true;

        if (this.itemType === 'article') {
            this.subscriptions.push(this.http.get(`${BASE_URL}/api/articles/upvote/${this.itemId}`).subscribe(() => {
            }));
        }
        if (this.itemType === 'deck') {
            this.subscriptions.push(this.http.get(`${BASE_URL}/api/decks/upvote/${this.itemId}`).subscribe(() => {
            }));
        }

    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
