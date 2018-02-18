import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Article } from '../articles/article';
import { TimeTransfer } from '../core/time-transfer';
import { Deck } from '../decks/deck';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'f2kRecommendedTile',
    templateUrl: './teased-tile.component.html',
    styleUrls: ['./teased-tile.component.css']
})
export class RecommendedTileComponent implements OnInit, OnDestroy {

    @Input() teasedItem: Article | Deck;
    @Input() type: string;
    date: string;
    image: any;
    url: string;
    subscriptions: Array<Subscription> = [];

    @Output() width = new EventEmitter<number>();

    constructor(private el: ElementRef, private router: Router, private sanitizer: DomSanitizer, private http: HttpClient) {
    }

    ngOnInit() {
        if (this.type === 'deck') {
            this.url = `/tier_list/${this.teasedItem.title.replace(/ /g, '_').replace(/[:<>;,+*()'$!-.~?/]/g, '').toLowerCase()}_${this.teasedItem.id}`;
        } else {
            this.url = `/articles/${this.teasedItem.id}`;
        }

        this.width.emit(this.el.nativeElement.clientWidth);
        this.date = TimeTransfer.getTime(this.teasedItem.editDate || this.teasedItem.date);
        if (this.teasedItem.imageURL && this.teasedItem.imageURL.indexOf('youtube') !== -1) {
            this.image = this.sanitizer.bypassSecurityTrustResourceUrl('https://img.youtube.com/vi/' + this.teasedItem.imageURL.split('embed/')[1] + '/maxresdefault.jpg');
        } else if (this.teasedItem.imageURL && this.teasedItem.imageURL.indexOf('twitch') !== -1) {
            this.subscriptions.push(this.http.get<any>(`https://clips.twitch.tv/api/v2/clips/` + this.teasedItem.imageURL.split('&clip=')[1]).subscribe(res => {
                const result = res;
                this.image = this.sanitizer.bypassSecurityTrustResourceUrl(result.thumbnails.small);
            }));
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
