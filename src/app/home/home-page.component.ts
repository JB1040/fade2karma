import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from '../articles/article';
import { Deck } from '../decks/deck';
import { Author } from '../articles/article/author/author';
import { BASE_URL } from '../core/globals';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
    featuredArticles: Array<Article|Deck> = [];
    tierOne: Deck[] = [];
    firstTilesColumn: Array<Article|Deck> = [];
    secondTilesColumn: Array<Article|Deck> = [];
    onlineStreamers: Author[] = [];
    completedFeatured: Boolean = false;
    subscriptions: Array<Subscription> = [];

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.setFeatured();
        this.setArticles();
        this.setTierListDecks();
        this.setOnlineStreamers();
    }

    setFeatured(): void { // TODO move in service, handle errors in case they take place...
        const featuredSubscription = this.http.get<Array<Article>>(`${BASE_URL}/api/articles/featured`).subscribe(res => {
            const articles = res.map((model: any) => model.cards ? new Deck(model) : new Article(model));
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
            this.completedFeatured = true;
        });
        this.subscriptions.push(featuredSubscription);
    }

    setArticles(): void { // TODO move in service, handle errors in case they take place...
        const articlesSubscription = this.http.get<Array<Article>>(`${BASE_URL}/api/articles/list?amount=13&offset=0`).subscribe(resArticles => {
            let articles = resArticles;
            if (this.firstTilesColumn.length > 1) {
                this.firstTilesColumn = this.firstTilesColumn.concat(articles.slice(0, 5));
                this.secondTilesColumn = this.secondTilesColumn.concat(articles.slice(5, 11));
            } else {
                const parent = this;
                const todo = function () {
                    if (!parent.completedFeatured) {
                        setTimeout(todo, 200);
                        return;
                    }
                    articles = articles.filter(art =>
                        parent.featuredArticles.length === 0 ||
                        art.id !== parent.featuredArticles[0].id
                    );
                    parent.featuredArticles = parent.featuredArticles.concat(articles.slice(0, 1));
                    parent.firstTilesColumn = parent.firstTilesColumn.concat(articles.slice(0, 6));
                    parent.secondTilesColumn = parent.secondTilesColumn.concat(articles.slice(6, 12));
                };
                setTimeout(todo, 100);
            }
        });

        this.subscriptions.push(articlesSubscription);
    }

    setTierListDecks() { // TODO optimize the component for displaying them and requests...
        this.subscriptions.push(this.http.get<Array<Deck>>(`${BASE_URL}/api/decks/list?amount=${100}&tier=${1}&mode=${'CON'}&isStandard=${true}`).subscribe(decks => {
            this.tierOne = decks;
        }));
    }

    setOnlineStreamers() { // TODO optimize the component for displaying them and requests...
        this.subscriptions.push(this.http.get<Array<Author>>(`${BASE_URL}/api/users/list?amount=100&offset=0&online=true`).subscribe(authors => {
            this.onlineStreamers = authors;
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
