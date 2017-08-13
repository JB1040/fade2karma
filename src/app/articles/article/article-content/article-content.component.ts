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

    constructor() { }

    ngOnInit() {
    }
}
