import { Component, OnInit } from '@angular/core';
import { TierListHubService } from '../../../tier-list-hub/tier-list-hub.service';
import { Deck, HeroClasses } from '../../deck';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'f2kHearthstoneDecksHub',
    templateUrl: './hearthstone-decks-hub.component.html',
    styleUrls: [ './hearthstone-decks-hub.component.css', '../../../tier-list-hub/grid.css']
})
export class HearthstoneDecksHubComponent implements OnInit {

    decks: Array<Deck> = [];
    amount = 50;
    page = 0;
    mode: string;
    isStandard: boolean;
    active = 'STANDARD';
    heroClasses: Array<HeroClasses>;
    routeSubscription: any;
    sortBy: 'tier' | 'dust' | 'date' | 'none' = 'none';
    sortUp = false;

    constructor(private tierListHubService: TierListHubService, private route: ActivatedRoute) {
        this.routeSubscription = this.route.params.subscribe();
    }

    ngOnInit() {
        this.setParams();
        this.getDecks();
    }

    onActiveClassesChange(event: Array<HeroClasses>) {
        this.heroClasses = event;
        this.setParams();
        this.getDecks();
    }

    onAactiveModeChange(event: string) {
        this.active = event;
        this.setParams();
        this.getDecks();
    }

    getDecks() {
        this.tierListHubService
            .getDecks(this.amount, 0, this.mode, this.isStandard, this.heroClasses, this.page * this.amount)
            .then((decks: Array<Deck>) => {
                this.decks = decks;
                if (this.sortBy !== 'none') {
                    this.decks.sort((a: Deck, b: Deck) => {
                        if (this.sortUp) {
                            return a[this.sortBy] - b[this.sortBy];
                        } else {
                            return b[this.sortBy] - a[this.sortBy];
                        }
                    });
                }
            });
    }

    setParams(): void {
        if (this.active === 'STANDARD') {
            this.mode = 'CON';
            this.isStandard = true;
        }
        if (this.active === 'WILD') {
            this.mode = 'CON';
            this.isStandard = false;
        }
        if (this.active === 'ARENA') {
            this.mode = 'ARENA';
            this.isStandard = false;
        }
    }

    sort(type: 'tier' | 'dust' | 'date', event: any) {
        event.preventDefault();

        if (this.sortBy === type) {
            this.sortUp = !this.sortUp;
        }
        this.sortBy = type;

        this.decks.sort((a: Deck, b: Deck) => {
            if (this.sortUp) {
                return a[type] - b[type];
            } else {
                return b[type] - a[type];
            }
        });
    }
}
