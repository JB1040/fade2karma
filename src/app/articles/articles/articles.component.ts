import { Component, ElementRef, OnInit } from '@angular/core';
import { Article } from '../article';
import { CanvasService } from '../../core/canvas.service';

@Component({
    selector: 'f2kArticles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

    articles: Article[];
    sum = 40;
    displayedArticles = [ 'All Articles', 'Podcasts', 'Highlights', 'Viewpoints', 'Meta Reports', 'Teams' ];
    displayedGames = [ 'All Games', 'Hearthstone', 'Gwent' ];
    displayGames = 'All Games';
    displayArticles = 'All Articles';
    articlesOpen: boolean = false;
    gamesOpen: boolean = false;
    article = {
        name: 'blue',
        title: 'Vararanis: Cosmoc Crown Showdown BreakDown',
        image: 'cipher.jpg',
        type: 'PODCAST',
        author: 'Chris Kohler',
        contentType: 'article',
        date: 1498302349012,
        description: 'Lorem ipsum dolor sit amet, pro te volumus maluisset, no qui aperiri signiferumque, epicurei petentium no his. Cu natum abhorreant voluptatum ',
        video: true
    };

    constructor(private canvas: CanvasService, private el: ElementRef) {}

    getWidth(text: string) {
        const elementStyle = window.getComputedStyle(this.el.nativeElement.querySelectorAll('h3')[1]);
        return this.canvas.getTextWidht(text, elementStyle.fontWeight, elementStyle.fontSize, elementStyle.fontFamily);
    }

    ngOnInit() {
        this.articles = [];
        for (let i = 0; i < this.sum; ++i) {
            this.articles.push(this.article);
        }
    }
    onScrollDown () {
        console.log('scrolled!!');

        // add another 20 items
        const start = this.sum;
        this.sum += 20;
        for (let i = start; i < this.sum; ++i) {
            this.articles.push(this.article);
        }
    }
}
