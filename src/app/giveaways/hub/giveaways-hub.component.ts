import { Component, OnInit } from '@angular/core';
import { Article } from '../../articles/article';
import { Http } from '@angular/http';
import { BASE_URL } from '../../core/globals';

@Component({
    templateUrl: './giveaways-hub.component.html',
    styleUrls: ['./giveaways-hub.component.css']
})
export class GiveawaysHubComponent implements OnInit {

    giveaways: Article[] = [];
    loading = false;

    constructor(private http: Http) {}

    ngOnInit(): void {
        this.loadGiveaways();
    }

    loadGiveaways() { // TODO move in service, handle errors in case they take place...
        const amount = 100;
        const offset = 0;
        const type = 'GIVEAWAYS';
        this.http.get(`${BASE_URL}/api/articles/list?amount=${amount}&offset=${offset}&type=${type}`).subscribe(res => {
            this.giveaways = res.json();
        });
    }
}
