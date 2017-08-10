import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { BreadcrumbComponent } from '../../../breadcrumb/breadcrumb.component';
import { AuthorComponent } from '../author/author.component';
import { RatingComponent } from '../rating/rating.component';
import { RecommendedContainerComponent } from '../../../teased/teased-container.component';
import { ArticleContent } from './article-content'

@Component({
    selector: 'f2k-article-content',
    templateUrl: './article-content.component.html',
    styleUrls: ['./article-content.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ArticleContentComponent implements OnInit {
    @Input() article: ArticleContent;

    constructor() { }

    ngOnInit() {
    }
}
