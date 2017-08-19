import { Component, ElementRef, OnInit } from '@angular/core';
import { Article } from '../article';
import { CanvasService } from '../../core/canvas.service';
import { Http } from '@angular/http';
import { BASE_URL } from '../../core/globals';

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
    loading = false;
    allArticlesLoaded = false;

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
        this.loading = false;
        this.allArticlesLoaded = false;
        if (articlesType === 'All Articles') {
            articlesType = '';
        }
        this.loadArticles(this.sum, 30, articlesType.replace(/ /g, '_').toUpperCase());
        this.sum += 30;
    }

    loadArticles(offset: number, amount: number, type: string) { // TODO move in service, handle errors in case they take place...
        if (this.loading || this.allArticlesLoaded) {
            return;
        }
        this.loading = true;
        this.http.get(`${BASE_URL}/api/articles/list?amount=${amount}&offset=${offset}&type=${type}`).subscribe(res => {
            const articles = res.json();
            this.articles = this.articles.concat(articles);
            if (articles.length < amount) {
                this.allArticlesLoaded = true;
            }
            this.loading = false;
        });
    }
}
