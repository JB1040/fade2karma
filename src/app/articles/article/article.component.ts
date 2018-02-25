import { Component, OnDestroy } from '@angular/core';
import { ArticleFetchingService } from './article-fetching.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_URL } from '../../core/globals';
import { InfiniteScrollerDirective } from '../../infinite-scroller.directive';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { Article } from '../article';

@Component({
    selector: 'f2kArticleHub',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnDestroy {
    articles = [];
    scrolled = 0;
    loadingArticles = false;
    allArticlesLoaded = false;
    routeSubscription: any;
    infiniteScrollSubscription: Subscription;
    loadArticleSubscription: Subscription;
    loadArticlesSubscriptions: Array<Subscription> = [];

    constructor(private articleService: ArticleFetchingService, private router: Router, private http: HttpClient, private route: ActivatedRoute, infiniteScroll: InfiniteScrollerDirective) {
        this.routeSubscription = this.route.params.subscribe(() => {
            this.articles = [];
            this.scrolled = 0;
            this.loadingArticles = false;
            this.allArticlesLoaded = false;
            this.loadArticle(parseInt(this.router.url.slice(this.router.url.lastIndexOf('/') + 1), 10));
        });

        this.infiniteScrollSubscription = infiniteScroll.scrollLimitReached.subscribe(() => {
            this.onScrollDown();
        });
    }

    onScrollDown() {
        if (this.loadingArticles || this.allArticlesLoaded) {
            return;
        }
        this.loadArticles(1, this.scrolled);
        this.scrolled += 1;
    }

    loadArticle(id: number) {
        this.loadingArticles = true;
        this.loadArticleSubscription = this.http.get<Article>(`${BASE_URL}/api/articles/${id}`).subscribe(article => {
            article.content = article.content.replace(/<span class="f2kHoverCard(.*?)>(.*?)<\/span>([a-zA-Z']+)/gi, '<span class="f2kHoverCard$1>$2$3</span>');

            this.articles.unshift(article);
            this.loadingArticles = false;
        });
    }

    loadArticles(amount: number, offset: number) {
        this.loadingArticles = true;
        const loadArticlesSubscription = this.http.get<Array<Article>>(`${BASE_URL}/api/articles/list?amount=${amount}&offset=${offset}`).subscribe(articles => {
            if (articles[0] && articles[0].id === this.articles[0].id) { // TODO better solution (maybe I can in list request gibe notId=:ID or something to speed this up)
                this.loadArticles(1, this.scrolled);
                this.scrolled += 1;
                return;
            }
            articles.forEach(article => {
                article.content = article.content.replace(/<span class="f2kHoverCard(.*?)>(.*?)<\/span>([a-zA-Z']+)/gi, '<span class="f2kHoverCard$1>$2$3</span>');
            });
            this.articles = this.articles.concat(articles);
            if (articles.length < amount) {
                this.allArticlesLoaded = true;
            }
            this.loadingArticles = false;
        });
        this.loadArticlesSubscriptions.push(loadArticlesSubscription);
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
        this.loadArticleSubscription.unsubscribe();
        this.loadArticlesSubscriptions.forEach(loadArticlesSubscription => loadArticlesSubscription.unsubscribe());
        this.infiniteScrollSubscription.unsubscribe();
    }
}
