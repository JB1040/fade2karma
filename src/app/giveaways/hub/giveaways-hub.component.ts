import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from '../../articles/article';
import { BASE_URL } from '../../core/globals';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './giveaways-hub.component.html',
    styleUrls: ['./giveaways-hub.component.css']
})
export class GiveawaysHubComponent implements OnInit, OnDestroy {

    giveaways: Article[] = [];
    loading = false;
    subscriptions: Array<Subscription> = [];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.loadGiveaways();
    }

    loadGiveaways() { // TODO move in service, handle errors in case they take place...
        const amount = 100;
        const offset = 0;
        const type = 'GIVEAWAYS';
        this.subscriptions.push(this.http.get<Array<Article>>(`${BASE_URL}/api/articles/list?amount=${amount}&offset=${offset}&type=${type}`).subscribe(articles => {
            this.giveaways = articles;
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
