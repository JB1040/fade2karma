import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Sponsor, SponsorService } from './sponsor.service';

@Component({
    template: `
        <ul class="items">
            <li class="row" style="margin:10px; border: 1px solid black; text-align: justify;" *ngFor="let sponsor of sponsors | async">

                <div class="f2k-colapse" style="position:relative; float:left;width: 250px">
                    <img style="width: 100%; max-width: 400px" src="../images/{{sponsor.image}}"
                         (click)="navigateLink(sponsor.home)"/>
                </div>

                <div class="f2k-colapse" style="position:relative; float:left;width: Calc(100% - 290px); padding:0 10px">
                    <p>{{sponsor.description}}</p>
                </div>

                <div class="f2k-colapse" style="position:relative; float:left;width: 40px;text-align:center;">
                    <span>
                        <a *ngIf="sponsor.home" (click)="navigateLink(sponsor.home)">
                            <span class="fa-stack fa-lg">
                                <i class="fa fa-square-o fa-stack-2x"></i>
                                <i class="fa fa-home fa-stack-1x"></i>
                            </span>
                        </a>

                        <a *ngIf="sponsor.twitter" (click)="navigateLink(sponsor.twitter)">
                            <span class="fa-stack fa-lg">
                                <i class="fa fa-square-o fa-stack-2x"></i>
                                <i class="fa fa-twitter fa-stack-1x"></i>
                            </span>
                        </a>

                        <a *ngIf="sponsor.facebook" (click)="navigateLink(sponsor.facebook)">
                            <span class="fa-stack fa-lg">
                                <i class="fa fa-square-o fa-stack-2x"></i>
                                <i class="fa fa-facebook fa-stack-1x"></i>
                            </span>
                        </a>
                    </span>
                </div>

                
            </li>
        </ul>
  `
})
export class SponsorsComponent implements OnInit {
    sponsors: Observable<Sponsor[]>;
    private selectedId: number;

    constructor(
        private service: SponsorService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.sponsors = this.route.params
            .switchMap((params: Params) => {
                return this.service.getSponsors();
            });
    }

    navigateLink(URL: string) {
        window.open(URL, '_blank');
    }
}
