import {
    ChangeDetectorRef,
    Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output,
    ViewChild
} from '@angular/core';
import { Article } from '../articles/article';
import { TimeTransfer } from '../core/time-transfer';
import { Deck } from '../decks/deck';
import { Router } from '@angular/router';
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
    @Input() type: 'article'|'deck';
    @Input() showInfo = true;
    date: string;
    imageSrc: any;
    url: string;
    info = '';
    subscriptions: Array<Subscription> = [];

    @Output() width = new EventEmitter<number>();

    @ViewChild('imageNode') image: ElementRef;
    @ViewChild('textContainerNode') textContainer: ElementRef;

    @HostListener('window:resize')
    onResize() {
        this.cdRef.detectChanges();
        if (this.image) {
            const imageWidth = this.type === 'article' ? this.image.nativeElement.clientHeight * 16 / 9 : this.image.nativeElement.clientHeight;
            this.image.nativeElement.style.width = `${imageWidth}px`;
            this.textContainer.nativeElement.style.marginLeft = `${imageWidth + 12}px`;
        }
    }

    constructor(private el: ElementRef, private router: Router, private sanitizer: DomSanitizer, private http: HttpClient, private cdRef: ChangeDetectorRef) {
    }

    updateUrl() {
        if (this.teasedItem.imageURL.indexOf('youtube') !== -1) {
            this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://img.youtube.com/vi/' + this.teasedItem.imageURL.split('embed/')[1] + '/mqdefault.jpg');
        }
    }

    ngOnInit() {
        if (this.type === 'deck') {
            this.url = `/tier_list/${this.teasedItem.title.replace(/ /g, '_').replace(/[:<>;,+*()'$!-.~?/]/g, '').toLowerCase()}_${this.teasedItem.id}`;
        } else {
            this.url = `/articles/${this.teasedItem.id}`;
        }

        this.width.emit(this.el.nativeElement.clientWidth);
        this.date = TimeTransfer.getTime(this.teasedItem.editDate || this.teasedItem.date);
        if (this.showInfo) {
            this.info = (this.teasedItem as Article).type || 'TIER: ' + (this.teasedItem as Deck).tier;
        }
        this.setImageUrl();
        this.onResize();
    }

    setImageUrl(): void {
        if (this.teasedItem.imageURL) {
            if (this.teasedItem.imageURL.indexOf('youtube') !== -1) {
                this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://img.youtube.com/vi/' + this.teasedItem.imageURL.split('embed/')[1] + '/maxresdefault.jpg');
            } else if (this.teasedItem.imageURL.indexOf('twitch') !== -1) {
                this.subscriptions.push(this.http.get<any>(`https://clips.twitch.tv/api/v2/clips/` + this.teasedItem.imageURL.split('&clip=')[1]).subscribe(res => {
                    const result = res;
                    this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(result.thumbnails.small);
                }));
            } else {
                this.imageSrc = this.teasedItem.imageURL.indexOf('http') !== -1 ? this.teasedItem.imageURL : 'assets/images/' + this.teasedItem.imageURL;
            }
        } else if (this.type === 'deck') {
            if (this.teasedItem.game === 'HS') {
                this.imageSrc = `assets/Hearthstone_Square/${(this.teasedItem as Deck).heroClass.toLowerCase()}.jpg`;
            } else if (this.teasedItem.game === 'GWENT') {
                this.imageSrc = `assets/GwentLeaders_Square/${(this.teasedItem as Deck).leader.name.replace('\'', '-').replace(' ', '').toLowerCase()}.jpg`;
            }
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
