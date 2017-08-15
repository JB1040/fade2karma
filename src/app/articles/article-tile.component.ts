import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Article } from './article';
import { TimeTransfer } from '../core/time-transfer';
import { Router } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'f2kArticlesTile',
    templateUrl: './article-tile.component.html',
    styleUrls: ['./article-tile.component.css']
})
export class ArticlesTileComponent implements OnInit {
    @Input() article: Article;
    @Input() showDescription = false;
    description: any;
    date: string;

    @HostListener('click') onClick() {
        this.router.navigate([`/articles/${this.article.title.replace(/ /g, '_').toLowerCase()}_${this.article.id}`]);
    }

    constructor(private router: Router,private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.date = TimeTransfer.getTime(this.article.date);

        if (this.showDescription) {
            const el = document.createElement('div');
            el.innerHTML = this.article.content;
            const pElement = el.getElementsByTagName('p')[0];
            if (pElement) {
                this.description = el.getElementsByTagName('p')[0].textContent;
            }
        }
    }
	
	articleURL() {
		return this.sanitizer.bypassSecurityTrustUrl(this.article.imageURL);
	}
}
