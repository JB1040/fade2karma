import { Component, ElementRef, OnInit } from '@angular/core';
import { Article } from '../article';
import { CanvasService } from '../../core/canvas.service';
import { Http } from '@angular/http';

@Component({
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

    articles: Article[] = [];
    sum = 0;
    displayedArticles = ['All Articles', 'Podcasts', 'Highlights', 'Viewpoints', 'Meta Reports', 'Teams'];
    displayedGames = ['All Games', 'Hearthstone'/*, 'Gwent'*/];
    displayGames = 'All Games';
    displayArticles = 'All Articles';
    articlesOpen = false;
    gamesOpen = false;

    constructor(private canvas: CanvasService, private el: ElementRef, private http: Http) {
    }

    getWidth(text: string) {
        const elementStyle = window.getComputedStyle(this.el.nativeElement.querySelectorAll('h3')[1]);
        return this.canvas.getTextWidht(text, elementStyle.fontWeight, elementStyle.fontSize, elementStyle.fontFamily);
    }

    ngOnInit() {
        let articles = this.displayArticles;
        if (articles === 'All Articles') {
            articles = '';
        }
        this.loadArticles(this.sum, 30, articles.replace(/ /g, '_').toUpperCase());
        this.sum += 30;
    }

    onScrollDown() {
        let articles = this.displayArticles;
        if (articles === 'All Articles') {
            articles = '';
        }
        this.loadArticles(this.sum, 20, articles.replace(/ /g, '_').toUpperCase());
        this.sum += 20;
    }

    changeArticles(articlesType) {
        this.sum = 0;
        this.articles = [];
        if (articlesType === 'All Articles') {
            articlesType = '';
        }
        this.loadArticles(this.sum, 30, articlesType.replace(/ /g, '_').toUpperCase());
        this.sum += 30;
    }

    loadArticles(offset: number, amount: number, type: string) { // TODO move in service, handle errors in case they take place...
        this.http.get(`/api/articles?amount=${amount}&offset=${offset}&type=${type}`).subscribe(res => {
            this.articles = this.articles.concat(res.json());
        });
    }
}
