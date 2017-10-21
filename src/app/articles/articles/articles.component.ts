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
    displayedArticles = ['All Articles', 'Announcements', 'Podcasts', 'Highlights', 'Viewpoints', 'Meta Reports', 'Teams', 'Card Reveals'];
    displayedGames = ['All Games', 'Hearthstone', 'Gwent'];
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
        this.loadNewArticles(30);
    }

    onScrollDown() {
        this.loadNewArticles(20);
    }

    onDisplayParamChange() {
        this.resetLoadData();
        this.loadNewArticles(30);
    }

    private resetLoadData() {
        this.sum = 0;
        this.articles = [];
        this.loading = false;
        this.allArticlesLoaded = false;
    }

    loadNewArticles(amount) {
        this.loadArticles(this.sum, amount);
        this.sum += amount;
    }

    loadArticles(offset: number, amount: number) { // TODO move in service, handle errors in case they take place...
        let gameString = '';
        let articleString = '';

        if (this.loading || this.allArticlesLoaded) {
            return;
        }
        if (this.displayArticles !== 'All Articles') {
            articleString = '&type=' + (this.displayArticles === 'Meta Reports' ? 'METAREPORTS' : this.displayArticles).replace(/ /g, '_').toUpperCase();
        }
        if (this.displayGames !== 'All Games') {
            gameString = '&game=' + this.displayGames.toUpperCase();
        }
        this.loading = true;
        this.http.get(`${BASE_URL}/api/articles/list?amount=${amount}&offset=${offset}${articleString}${gameString}`).subscribe(res => {
            const articles = res.json();
            this.articles = this.articles.concat(articles);
            if (articles.length < amount) {
                this.allArticlesLoaded = true;
            }
            this.loading = false;
        });
    }
}
