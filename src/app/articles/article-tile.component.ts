import { Component, HostListener, Input, OnInit, ElementRef, AfterContentInit } from '@angular/core';
import { Article } from './article';
import { TimeTransfer } from '../core/time-transfer';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';

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
    image: any;

    onClick() {
        this.router.navigate([`/articles/${this.article.title.replace(/ /g, '_').replace(/[^a-zA-Z0-9;,+*()\'$!-._~?/]/g, '').toLowerCase()}_${this.article.id}`]);
    }

    constructor(private router: Router, private sanitizer: DomSanitizer, private e: ElementRef, private http: Http) {}

    updateUrl(event: Event) {
        if (this.article.imageURL.indexOf('youtube') !== -1) {
            this.image = this.sanitizer.bypassSecurityTrustResourceUrl('https://img.youtube.com/vi/' + this.article.imageURL.split('embed/')[1] + '/mqdefault.jpg');
        }
    }

    ngOnInit() {
        this.date = TimeTransfer.getTime(this.article.changeDate || this.article.date);
        if (this.article.imageURL.indexOf('youtube') !== -1) {
            this.image = this.sanitizer.bypassSecurityTrustResourceUrl('https://img.youtube.com/vi/' + this.article.imageURL.split('embed/')[1] + '/maxresdefault.jpg');
        } else if (this.article.imageURL.indexOf('twitch') !== -1) {
            this.http.get(`https://clips.twitch.tv/api/v2/clips/` + this.article.imageURL.split('&clip=')[1]).subscribe(res => {
                const result = res.json();
                this.image = this.sanitizer.bypassSecurityTrustResourceUrl(result.thumbnails.medium);
            });
        }
        if (this.showDescription) {
            const el = document.createElement('div');
            el.innerHTML = this.article.content;
            const pElement = el.getElementsByTagName('p')[0];
            if (pElement) {
                this.description = el.getElementsByTagName('p')[0].textContent;
                if (this.description.length > 125) {
                    this.description = this.description.slice(0, 120) + '...';
                }
            }
        }
    }
}
