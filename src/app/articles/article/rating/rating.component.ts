import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'f2k-article-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
    /* TODO: Dynamic functionality */
    public score: number = 12;
    public liked: boolean = false;

    constructor() { }

    ngOnInit() {
    }

}
