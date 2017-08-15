import { Component, OnInit } from '@angular/core';
import { Article } from '../articles/article';
import { Http } from '@angular/http';
import { Deck } from '../decks/deck';
import { Author } from '../articles/article/author/author';
import { BASE_URL } from '../core/globals';

@Component({
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    featuredArticles: Article[] = [];
    tierOne: Deck[] = [];
    tierTwo: Deck[] = [];
    decksArr: Deck[][] = [];
    firstTilesColumn: Article[] = [];
    secondTilesColumn: Article[] = [];
    onlineStreamers: Author[] = [];

    constructor(private http: Http) {
    }

    ngOnInit() {
        this.setFeatured();
        this.setArticles();
        this.setDecks();
        this.setTierListDecks();
        this.setOnlineStreamers();
    }

    setFeatured(): void { // TODO move in service, handle errors in case they take place...
        this.http.get(`${BASE_URL}/api/articles/featured`).subscribe(res => {
            const articles = res.json();
            if (articles.length > 1) {
                this.featuredArticles = articles;
                this.firstTilesColumn.unshift(this.featuredArticles[1]);
                if (this.firstTilesColumn.length > 6) {
                    this.secondTilesColumn.unshift(this.firstTilesColumn.pop());
                    this.secondTilesColumn.pop();
                }
            } else {
                this.featuredArticles = articles.concat(this.featuredArticles);
            }
        });
    }

    setArticles(): void { // TODO move in service, handle errors in case they take place...
        this.http.get(`${BASE_URL}/api/articles/list?amount=12&offset=0`).subscribe(res => {
            const articles = res.json();
            if (this.firstTilesColumn.length > 1) {
                this.firstTilesColumn = this.firstTilesColumn.concat(articles.slice(0, 5));
                this.secondTilesColumn = this.secondTilesColumn.concat(articles.slice(5, 11));
            } else {
                this.featuredArticles = this.featuredArticles.concat(articles.slice(0, 1));
                this.firstTilesColumn = this.firstTilesColumn.concat(articles.slice(0, 6));
                this.secondTilesColumn = this.secondTilesColumn.concat(articles.slice(6, 12));
            }
        });
    }

    setDecks(): void { // TODO move in service, handle errors in case they take place...
        this.http.get(`${BASE_URL}/api/decks/list?amount=12&offset=0`).subscribe(res => {
            const decks = res.json();
            this.decksArr.push(decks.slice(0, 6));
            this.decksArr.push(decks.slice(6));
        });
    }

    setTierListDecks() { // TODO optimize the component for displaying them and requests...
        this.http.get(`${BASE_URL}/api/decks/list?amount=${4}&tier=${1}&mode=${'CON'}&isStandard=${true}`).subscribe(res => {
            this.tierOne = res.json();
        });
        this.http.get(`${BASE_URL}/api/decks/list?amount=${4}&tier=${2}&mode=${'CON'}&isStandard=${true}`).subscribe(res => {
            this.tierTwo = res.json();
        });
    }

    setOnlineStreamers() { // TODO optimize the component for displaying them and requests...
        this.http.get(`${BASE_URL}/api/users/list?amount=100&offset=0&online=true`).subscribe(res => {
            this.onlineStreamers = res.json();
        });
    }
}
