import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from '../articles/article';
import { Deck } from '../decks/deck';
import { BASE_URL } from '../core/globals';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
    featuredArticles: Array<Article | Deck> = [];
    tierOne: Deck[] = [];
    articles: Array<Article | Deck> = [];
    // onlineStreamers: Author[] = [];
    featuredArticlesLoaded: Boolean = false;
    articlesLoaded: Boolean = false;
    subscriptions: Array<Subscription> = [];

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.setArticles();
        this.setFeatured();
        this.setTierListDecks();
        // this.setOnlineStreamers();
    }

    setFeatured(): void {
        const featuredSubscription = this.http.get<Array<Article | Deck>>(`${BASE_URL}/api/articles/featured`).subscribe(articles => {
            this.featuredArticles = articles.map((model: any) => model.cards ? new Deck(model) : new Article(model));
            this.featuredArticlesLoaded = true;
            this.setFeaturedAndArticles();
        });
        this.subscriptions.push(featuredSubscription);
    }

    setArticles(): void { // TODO move in service, handle errors in case they take place...
        const articlesSubscription = this.http.get<Array<Article>>(`${BASE_URL}/api/articles/list?amount=14&offset=0`).subscribe(articles => {
            this.articles = articles;
            this.articlesLoaded = true;
            this.setFeaturedAndArticles();
        });

        this.subscriptions.push(articlesSubscription);
    }

    setFeaturedAndArticles(): void {
        if (!this.articlesLoaded || !this.featuredArticlesLoaded) {
            return;
        }
        if (this.featuredArticles.length) {
            this.articles = this.articles.filter(article => !this.featuredArticles.some(featuredArticle => featuredArticle.id === article.id));
            if (this.featuredArticles.length > 1) {
                this.articles.unshift(this.featuredArticles[1]);
            } else {
                this.featuredArticles.push(this.articles[0]);
            }
            this.articles = this.articles.slice(0, 13);
        } else {
            this.featuredArticles = this.articles.slice(0, 2);
            this.articles.shift();
        }
    }

    setTierListDecks() { // TODO optimize the component for displaying them and requests...
        this.subscriptions.push(this.http.get<Array<Deck>>(`${BASE_URL}/api/decks/list?amount=${100}&tier=${1}&mode=${'CON'}&isStandard=${true}`).subscribe(decks => {
            this.tierOne = decks;
        }));
    }

    // setOnlineStreamers() { // TODO optimize the component for displaying them and requests...
    //     this.subscriptions.push(this.http.get<Array<Author>>(`${BASE_URL}/api/users/list?amount=100&offset=0&online=true`).subscribe(authors => {
    //         this.onlineStreamers = authors;
    //     }));
    // }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
