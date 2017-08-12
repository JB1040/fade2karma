import { Component, OnInit, Input } from '@angular/core';
import { ArticleContent } from './article-content/article-content';
import { Author } from './author/author';
import { ArticleFetchingService } from './article-fetching.service';
import { Router } from '@angular/router';
import { Article } from '../article';
import { Http } from '@angular/http';

@Component({
    selector: 'f2kArticleHub',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    recommendedArticles: Article[] = [];
    articles = [];
    scrolled = 0;

    constructor(private articleService: ArticleFetchingService, private router: Router, private http: Http) {
    }

    ngOnInit(): void {
        this.loadArticle();
        this.loadRecommendedArticles(3, this.scrolled);
        this.scrolled += 3;
    }

    onScrollDown() {
        this.loadArticles(6, this.scrolled);
        this.scrolled += 6;
    }

    loadArticle() {
        this.http.get(`/api/decks/list?amount=6&offset=0`).subscribe(res => {
            const articles = res.json();
            this.articles = articles.concat(this.articles);
        });
    }

    loadArticles(amount: number, offset: number) {
        this.http.get(`/api/articles/list?amount=${amount}&offset=${offset}`).subscribe(res => {
            const articles = res.json();
            this.articles = this.articles.concat(articles);
        });
    }

    loadRecommendedArticles(amount: number, offset: number) {
        this.http.get(`/api/articles/list?amount=${amount}&offset=${offset}`).subscribe(res => {
            const articles = res.json();
            this.recommendedArticles = articles;
            this.articles = this.articles.concat(articles);
        });
    }
}
