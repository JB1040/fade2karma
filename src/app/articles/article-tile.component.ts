import {Component, Input, OnInit} from '@angular/core';
import { Article } from './article';
import { TimeTransfer } from '../core/time-transfer';

@Component({
    selector: 'f2kArticlesTile',
    templateUrl: './article-tile.component.html',
    styleUrls: ['./article-tile.component.css']
})
export class ArticlesTileComponent implements OnInit {
    @Input() article: Article;
    @Input() showDescription = false;
    date: string;

    ngOnInit() {
        this.date = TimeTransfer.getTime(this.article.date);
    }
}
