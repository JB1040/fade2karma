import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Article } from './article';
import { TimeTransfer } from '../core/time-transfer';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Deck } from '../decks/deck';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'f2kArticlesTile',
    templateUrl: './article-tile.component.html',
    styleUrls: ['./article-tile.component.css']
})
export class ArticlesTileComponent implements OnInit, OnDestroy {
    @Input() article: Article | Deck;
    @Input() showDescription = false;
    description: any;
    date: string;
    image: any;
    t: any;
    done: boolean;
    heroClass: string;
    articleType: string;
    url: string;
    subscriptions: Array<Subscription> = [];

    constructor(private router: Router, private sanitizer: DomSanitizer, private e: ElementRef, private http: HttpClient) {}

    updateUrl() {
        if (this.article.imageURL.indexOf('youtube') !== -1) {
            this.image = this.sanitizer.bypassSecurityTrustResourceUrl('https://img.youtube.com/vi/' + this.article.imageURL.split('embed/')[1] + '/mqdefault.jpg');
        }
    }

    onImageLoaded(img) {
        if (img.naturalWidth < 1000 && !this.done) {
            this.done = true;
            this.updateUrl();
        }
    }

    ngOnInit() {
        this.url = `/articles/${this.article.id}`;

        if (this.article instanceof Deck) {
            this.heroClass = this.article.heroClass;
        } else {
            this.articleType = this.article.articleType;
        }
        this.date = TimeTransfer.getTime(this.article.editDate || this.article.date);
        if (this.article.imageURL.indexOf('youtube') !== -1) {
            this.image = this.sanitizer.bypassSecurityTrustResourceUrl('https://img.youtube.com/vi/' + this.article.imageURL.split('embed/')[1] + '/maxresdefault.jpg');
            // this.http.get('http://i1.ytimg.com/vi/' + this.article.imageURL.split('embed/')[1] + '/maxresdefault.jpg').subscribe(data => { }, err => {
            // 	console.log("Error generated in finding youtoob image. " + this.article.imageURL);
            // 	this.image = this.sanitizer.bypassSecurityTrustResourceUrl('https://img.youtube.com/vi/' + this.article.imageURL.split('embed/')[1] + '/mqdefault.jpg');
            // });
        } else if (this.article.imageURL.indexOf('twitch') !== -1) {
            this.subscriptions.push(this.http.get<any>(`https://clips.twitch.tv/api/v2/clips/` + this.article.imageURL.split('&clip=')[1]).subscribe(result => {
                this.image = this.sanitizer.bypassSecurityTrustResourceUrl(result.thumbnails.medium);
            }));
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

    getURL() {
        return this.image;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
