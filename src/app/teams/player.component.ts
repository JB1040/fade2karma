import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Player, TeamsService } from './teams.service';

@Component({
    template: `
<div *ngIf="player">
       <h1 (click)="navigate(player.name)">{{player.name}}</h1>
        <div class="items">
                
                    <img src="../images/{{player.image}}" (click)="navigate(team.name, player.name)"/>

                    <p>{{player.description}}</p>

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
            
        </div>
<div>
  `
})
export class PlayerComponent implements OnInit {
    player: Player;
    private selectedId: number;

    constructor(
        private service: TeamsService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        console.log(this.route.snapshot.url[1].path, '---');

        this.route.params
            .switchMap((params: Params) => this.service.getPlayer(this.route.snapshot.url))
            .subscribe((player: Player) => this.player = player);
    }

    navigateLink(URL: string) {
        window.open(URL, "_blank")
    }

    navigate(team: string, player: string = '') {
        this.router.navigate(['/teams/' + team + '/' + player]);
        return false;
    }
}
