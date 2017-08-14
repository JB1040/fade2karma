import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Article } from '../../article';

@Component({
    selector: 'f2kArticleContent',
    templateUrl: './article-content.component.html',
    styleUrls: ['./article-content.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ArticleContentComponent implements OnInit {
    @Input() article: Article;
    @Input() articles: Article[];
    CONTENT: any;

    constructor() { }

    ngOnInit() {
        if (this.article.imageURL && (this.article.imageURL.indexOf('youtube') !== -1 || this.article.imageURL.indexOf('twitch') !== -1)) {
            this.CONTENT = this.CONTENT = `<iframe src="${this.article.imageURL}"></iframe>${this.article.content}`;
        } else if (this.article.imageURL) {
            this.CONTENT = `<img src="${this.article.imageURL.indexOf('http') !== -1 ? this.article.imageURL : 'assets/images/' + this.article.imageURL}">${this.article.content}`;
        } else {
            this.CONTENT = this.article.content;
        }
    }
}
