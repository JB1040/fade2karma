import { Component, Inject, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT, DomSanitizer } from '@angular/platform-browser';
import { BASE_URL } from 'app/core/globals';
import { Author } from '../../articles/article/author/author';
import { TimeTransfer } from '../../core/time-transfer';
import { Deck } from '../../decks/deck';
import { Article } from '../../articles/article';

@Component({
    selector: 'f2kPlayerHub',
    templateUrl: './player-hub.component.html',
    styleUrls: ['./player-hub.component.css']
})
export class PlayerHubComponent implements OnDestroy {

    routeSubscription: any;
    player: Author;
    playerArticles: Array<Article>;
    age: number;
    iframe: any;

    constructor(@Inject(DOCUMENT) private docEl: Document, private http: Http, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) { // TODO remove when real data is there
        this.routeSubscription = this.route.params.subscribe(() => {
            this.getPlayer(parseInt(this.router.url.slice(this.router.url.lastIndexOf('_') + 1), 10));
            this.getDecksByPlayer(parseInt(this.router.url.slice(this.router.url.lastIndexOf('_') + 1), 10));
        });
    }

    getPlayer(id: number): void {
        this.http.get(`${BASE_URL}/api/users/${id}`).subscribe(res => {
            this.player = res.json();
            this.age = TimeTransfer.getAge(parseInt(this.player.birthday, 10));
            if (this.player.twitchData) {
                this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.twitch.tv/?channel=${this.player.twitch}`);
            }
        });
    }

    getDecksByPlayer(id: number): void {
        this.http.get(`${BASE_URL}/api/articles/byAuthor/${id}`).subscribe(res => {
            this.playerArticles = res.json().slice(0, 2);
        });
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }
}
