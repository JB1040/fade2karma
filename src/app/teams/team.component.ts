import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Team, TeamsService } from './teams.service';

@Component({
    template: `
        <div *ngIf="team" class="card-group">
            <h1 class="name">{{team.name}}</h1>
            <ul class="items">
                <li *ngFor="let player of team.players" class="card">
                    <my-player [team]="team.name" [player]="player"></my-player>
                </li>
            </ul>
        <div>
  `
})
export class TeamComponent implements OnInit {
    team: Team;
    private selectedId: number;

    constructor(
        private service: TeamsService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        console.log(this.route.snapshot.url[1].path, '___');

        this.route.params
            .switchMap((params: Params) => this.service.getTeam(params['name']))
            .subscribe((team: Team) => this.team = team);
    }

    navigateLink(URL: string) {
        window.open(URL, '_blank');
    }

    // navigate(team: string, player: string = '') {
    //   console.log(team);
    //     this.router.navigate(['/teams/' + team.toLowerCase() + '/' + player]);
    //     return false;
    // }
}
