import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Team, TeamsService } from './teams.service';

@Component({
    template: `
        <ul class="items">
            <li class="card-group" *ngFor="let team of teams | async">
                <h1 (click)="navigate(team.name)" class="name">{{team.name}}</h1>
                <ul>
                    <li *ngFor="let player of team.players" class="card">
                        <my-player [team]="team.name" [player]="player"></my-player>
                    </li>
                </ul>
            </li>
        </ul>
  `
})
export class TeamsComponent implements OnInit {
    teams: Observable<Team[]>;
    private selectedId: number;

    constructor(
        private service: TeamsService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.teams = this.route.params
            .switchMap((params: Params) => {
                return this.service.getTeams();
            });
    }

    navigateLink(URL: string) {
        window.open(URL, "_blank")
    }

    navigate(team:string, player: string = '') {
        this.router.navigate(['/teams/' + team.toLowerCase() + '/' + player]);
        return false;
    }
}
