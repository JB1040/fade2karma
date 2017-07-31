import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Player } from './teams.service';

@Component({
    selector: 'my-player',
    template: `
                <img class="player-image img-rounded" src="../images/{{player.image}}" (click)="navigate(team, player.name)"/>

                <h3 class="name" style="position: absolute; top: 200px; color: white; width: 100%">{{player.name}}</h3>

                <p class="description" style="height: 65px">{{player.description}}</p>

                <a *ngIf="player.twitch" (click)="navigateLink(player.twitch)">
                    <span class="fa-stack fa-lg">
                        <i class="fa fa-square-o fa-stack-2x"></i>
                        <i class="fa fa-twitch fa-stack-1x"></i>
                    </span>
                </a>

                <a *ngIf="player.twitter" (click)="navigateLink(player.twitter)">
                    <span class="fa-stack fa-lg">
                        <i class="fa fa-square-o fa-stack-2x"></i>
                        <i class="fa fa-twitter fa-stack-1x"></i>
                    </span>
                </a>

                <a *ngIf="player.instagram" (click)="navigateLink(player.instagram)">
                    <span class="fa-stack fa-lg">
                        <i class="fa fa-square-o fa-stack-2x"></i>
                        <i class="fa fa-instagram fa-stack-1x"></i>
                    </span>
                </a>

                <a *ngIf="player.facebook" (click)="navigateLink(player.facebook)">
                    <span class="fa-stack fa-lg">
                        <i class="fa fa-square-o fa-stack-2x"></i>
                        <i class="fa fa-facebook fa-stack-1x"></i>
                    </span>
                </a>
  `
})
export class PlayerInstanceComponent {
    @Input() team: string;
    @Input() player: Player;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    navigateLink(URL: string) {
        window.open(URL, '_blank');
    }

    navigate(team: string, player = '') {
        this.router.navigate(['/teams/' + team.toLowerCase() + '/' + player.toLowerCase()]);
        return false;
    }
}
