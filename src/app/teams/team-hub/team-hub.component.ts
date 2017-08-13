import 'rxjs/add/operator/switchMap';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TeamsService } from '../teams.service';
import { CanvasService } from '../../core/canvas.service';
import { Http } from '@angular/http';
import { Author } from '../../articles/article/author/author';
import { BASE_URL } from '../../core/globals';

@Component({
    templateUrl: './team-hub.component.html',
    styleUrls: ['./team-hub.component.css']
})
export class TeamsComponent implements OnInit {
    players: Author[];
    allPlayers: Author[];
    displayedGames: Array<{ outSideName: string, insideName: string }> = [{
        outSideName: 'All Games',
        insideName: 'ALL'
    }, {outSideName: 'Hearthstone', insideName: 'HS'}, {outSideName: 'Gwent', insideName: 'GWENT'}];
    displayGames: { outSideName: string, insideName: string } = {outSideName: 'All Games', insideName: 'ALL'};
    gamesOpen = false;

    constructor(private service: TeamsService,
                private route: ActivatedRoute,
                private router: Router,
                private canvas: CanvasService,
                private el: ElementRef,
                private http: Http) {
    }

    getWidth(text: string) {
        const elementStyle = window.getComputedStyle(this.el.nativeElement.querySelectorAll('h1')[0]);
        return this.canvas.getTextWidht(text, elementStyle.fontWeight, elementStyle.fontSize, elementStyle.fontFamily);
    }

    ngOnInit() {
        this.setAllPlayers();
    }

    navigateToTwitch(twitchName: string) {
        const win = window.open(`https://www.twitch.tv/${twitchName}`, '_blank');
        win.focus();
    }

    filterByGame() {
        this.players = this.allPlayers.filter(player => player.game === this.displayGames.insideName || this.displayGames.insideName === 'ALL');
    }

    setAllPlayers(): void { // TODO move in service, handle errors in case they take place...
        this.http.get(`${BASE_URL}/api/users/list?amount=100&offset=0`).subscribe(res => {
            this.allPlayers = res.json(); // TODO if select game filter...
            this.players = this.allPlayers;
        });
    }
}
