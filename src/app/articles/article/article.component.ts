import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Author } from './author/author';
import { ArticleFetchingService } from './article-fetching.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../article';
import { Http } from '@angular/http';
import { BASE_URL } from '../../core/globals';

@Component({
    selector: 'f2kArticleHub',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements /*OnInit, */OnDestroy {
    articles = [];
    scrolled = 0;
    loadingArticles = false;
    allArticlesLoaded = false;
    routeSubscription: any;

    constructor(private articleService: ArticleFetchingService, private router: Router, private http: Http, private route: ActivatedRoute) {
        this.routeSubscription = this.route.params.subscribe(() => {
            this.articles = [];
            this.scrolled = 0;
            this.loadingArticles = false;
            this.allArticlesLoaded = false;
            this.loadArticle(parseInt(this.router.url.slice(this.router.url.lastIndexOf('/') + 1), 10));
        });
    }

    onScrollDown() {
        this.loadArticles(1, this.scrolled);
        this.scrolled += 1;
    }

    loadArticle(id: number) {
        this.http.get(`${BASE_URL}/api/articles/${id}`).subscribe(res => {
            this.articles.unshift(res.json());
        });
    }

    loadArticles(amount: number, offset: number) {
        if (this.loadingArticles || this.allArticlesLoaded) {
            return;
        }
        this.loadingArticles = true;
        this.http.get(`${BASE_URL}/api/articles/list?amount=${amount}&offset=${offset}`).subscribe(res => {
            const articles = res.json();
            if (articles[0] && articles[0].id === this.articles[0].id) { // TODO better solution (maybe I can in list request gibe notId=:ID or something to speed this up)
                this.scrolled += 1;
                this.loadingArticles = false;
                this.loadArticles(1, this.scrolled);
                return;
            }
            this.articles = this.articles.concat(articles);
            if (articles.length < amount) {
                this.allArticlesLoaded = true;
            }
            this.loadingArticles = false;
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}
