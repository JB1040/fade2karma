import { Component, OnInit, Input } from '@angular/core';
import { ArticleContent } from './article-content/article-content';
import { Author } from './author/author';
import { ArticleFetchingService } from './article-fetching.service';
import { Router } from '@angular/router';
import { Article } from '../article';
import { Http } from '@angular/http';
import { BASE_URL } from '../../core/globals';

@Component({
    selector: 'f2kArticleHub',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    recommendedArticles: Article[] = [];
    articles = [];
    scrolled = 0;
    loadingArticles = false;
    allArticlesLoaded = false;

    constructor(private articleService: ArticleFetchingService, private router: Router, private http: Http) {
    }

    ngOnInit(): void {
        this.loadArticle(parseInt(this.router.url.slice(this.router.url.lastIndexOf('_') + 1), 10));
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
            this.articles = this.articles.concat(articles);
            if (articles.length < amount) {
                this.allArticlesLoaded = true;
            }
            this.loadingArticles = false;
        });
    }

    loadRecommendedArticles(amount: number, offset: number) {
        this.http.get(`${BASE_URL}/api/articles/list?amount=${amount}&offset=${offset}`).subscribe(res => {
            this.recommendedArticles = res.json();
        });
    }
}
