import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Player, TeamsService } from '../teams.service';
import { CanvasService } from '../../core/canvas.service';

@Component({
    templateUrl: './team-hub.component.html',
    styleUrls: ['./team-hub.component.css']
})
export class TeamsComponent implements OnInit {
    players: Player[];
    allPlayers: Player[];
    playersObservable: Observable<Player[]>;
    private selectedId: number;
    displayedGames = ['All Games', 'Hearthstone', 'Gwent'];
    displayGames = 'All Games';
    gamesOpen = false;


    constructor(private service: TeamsService,
                private route: ActivatedRoute,
                private router: Router,
                private canvas: CanvasService,
                private el: ElementRef) {
    }

    getWidth(text: string) {
        const elementStyle = window.getComputedStyle(this.el.nativeElement.querySelectorAll('h1')[0]);
        return this.canvas.getTextWidht(text, elementStyle.fontWeight, elementStyle.fontSize, elementStyle.fontFamily);
    }

    ngOnInit() {
        this.playersObservable = this.route.params
            .switchMap((params: Params) => {
                return this.service.getPlayers();
            });

        this.playersObservable.subscribe(players => {
            this.allPlayers = players;
            this.players = players;
        });
    }

    filterByGame() {
        this.players = this.allPlayers.filter(player => player.game === this.displayGames || this.displayGames === 'All Games');
    }
}
