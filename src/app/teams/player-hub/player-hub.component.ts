import { Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BASE_URL } from 'app/core/globals';
import { Author } from '../../articles/article/author/author';
import { TimeTransfer } from '../../core/time-transfer';
import { Article } from '../../articles/article';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'f2kPlayerHub',
    templateUrl: './player-hub.component.html',
    styleUrls: ['./player-hub.component.css']
})
export class PlayerHubComponent implements OnDestroy, OnDestroy {

    routeSubscription: any;
    player: Author;
    playerArticles: Array<Article>;
    age: number;
    twitchStreamUrl: any;
    twitchChatUrl: any;
    showChat = true;
    onlineStreamers: Author[] = [];
    subscriptions: Array<Subscription> = [];

    constructor(@Inject(DOCUMENT) private docEl: Document, private http: HttpClient, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) { // TODO remove when real data is there
        this.routeSubscription = this.route.params.subscribe(() => {
            this.getPlayer(parseInt(this.router.url.slice(this.router.url.lastIndexOf('_') + 1), 10));
            this.getDecksByPlayer(parseInt(this.router.url.slice(this.router.url.lastIndexOf('_') + 1), 10));
            this.setOnlineStreamers();
        });
    }

    getPlayer(id: number): void {
        this.subscriptions.push(this.http.get<Author>(`${BASE_URL}/api/users/${id}`).subscribe(player => {
            this.player = player;
            if (this.player.birthday) {
                this.age = TimeTransfer.getAge(parseInt(this.player.birthday, 10));
            }
            if (this.player.twitchData) {
                this.twitchStreamUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.twitch.tv/?channel=${this.player.twitch}`);
                this.twitchChatUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.twitch.tv/${this.player.twitch}/chat`);
            }
        }));
    }

    getDecksByPlayer(id: number): void {
        this.subscriptions.push(this.http.get<Array<Article>>(`${BASE_URL}/api/articles/byAuthor/${id}`).subscribe(articles => {
            this.playerArticles = articles.slice(0, 2);
        }));
    }

    setOnlineStreamers() { // TODO optimize the component for displaying them and requests...
        this.subscriptions.push(this.http.get<Array<Author>>(`${BASE_URL}/api/users/list?amount=100&offset=0&online=true`).subscribe(onlineStreamers => {
            this.onlineStreamers = onlineStreamers;
        }));
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
