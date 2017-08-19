import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Article } from '../articles/article';
import { TimeTransfer } from '../core/time-transfer';
import { Deck } from '../decks/deck';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'f2kRecommendedTile',
    templateUrl: './teased-tile.component.html',
    styleUrls: ['./teased-tile.component.css']
})
export class RecommendedTileComponent implements OnInit {

    @Input() teasedItem: Article | Deck;
    @Input() type: string;
    date: string;
    image: any;

    @Output() width = new EventEmitter<number>();

    @HostListener('click') onClick() {
        if (this.type = 'deck') {
            this.router.navigate([`/tier_list/${this.teasedItem.title.replace(/ /g, '_').replace(/[^a-zA-Z0-9;,+*()\'$!-._~?/]/g, '').toLowerCase()}_${this.teasedItem.id}`]);
        } else {
            this.router.navigate([`/articles/${this.teasedItem.title.replace(/ /g, '_').replace(/[^a-zA-Z0-9;,+*()\'$!-._~?/]/g, '').toLowerCase()}_${this.teasedItem.id}`]);
        }
    }

    constructor(private el: ElementRef, private router: Router, private sanitizer: DomSanitizer, private http: Http) {
    }

    ngOnInit() {
        this.width.emit(this.el.nativeElement.clientWidth);
        this.date = TimeTransfer.getTime(this.teasedItem.date);
        if (this.teasedItem.imageURL && this.teasedItem.imageURL.indexOf('youtube') !== -1) {
            this.image = this.sanitizer.bypassSecurityTrustResourceUrl('https://img.youtube.com/vi/' + this.teasedItem.imageURL.split('embed/')[1] + '/mqdefault.jpg');
        } else if (this.teasedItem.imageURL.indexOf('twitch') !== -1) {
            this.http.get(`https://clips.twitch.tv/api/v2/clips/` + this.teasedItem.imageURL.split('&clip=')[1]).subscribe(res => {
                const result = res.json();
                this.image = this.sanitizer.bypassSecurityTrustResourceUrl(result.thumbnails.small);
            });
        }
    }
}
