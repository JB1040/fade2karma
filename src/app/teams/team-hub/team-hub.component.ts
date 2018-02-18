import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TeamsService } from '../teams.service';
import { CanvasService } from '../../core/canvas.service';
import { Author } from '../../articles/article/author/author';
import { BASE_URL } from '../../core/globals';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './team-hub.component.html',
    styleUrls: ['./team-hub.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy {
    players: Author[];
    allPlayers: Author[];
    displayedGames: Array<{ outSideName: string, insideName: string }> = [
        { outSideName: 'All Games', insideName: 'ALL' },
        { outSideName: 'Hearthstone', insideName: 'HS' },
        { outSideName: 'Gwent', insideName: 'GWENT' }
    ];
    displayGames: { outSideName: string, insideName: string } = { outSideName: 'All Games', insideName: 'ALL' };
    gamesOpen = false;
    subscriptions: Array<Subscription> = [];

    constructor(private service: TeamsService,
                private route: ActivatedRoute,
                private router: Router,
                private canvas: CanvasService,
                private el: ElementRef,
                private http: HttpClient) {
    }

    getWidth(text: string) {
        const elementStyle = window.getComputedStyle(this.el.nativeElement.querySelectorAll('h1')[0]);
        return this.canvas.getTextWidht(text, elementStyle.fontWeight, elementStyle.fontSize, elementStyle.fontFamily);
    }

    ngOnInit() {
        this.setAllPlayers();
    }

    navigateToTwitch(twitchName: string) {
        if (twitchName) {
            const win = window.open(`https://www.twitch.tv/${twitchName}`, '_blank');
            win.focus();
        }
    }

    filterByGame() {
        this.players = this.allPlayers.filter(player => player.game === this.displayGames.insideName || this.displayGames.insideName === 'ALL');
    }

    setAllPlayers(): void { // TODO move in service, handle errors in case they take place...
        this.subscriptions.push(this.http.get<Array<Author>>(`${BASE_URL}/api/users/list?amount=100&offset=0`).subscribe(users => {
            this.allPlayers = users.filter(player => player.type !== 'ADMIN'); // TODO if select game filter...
            this.players = this.allPlayers;
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
