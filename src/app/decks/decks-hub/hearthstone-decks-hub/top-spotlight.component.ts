import { Component, OnDestroy, OnInit } from '@angular/core';
import { TierListHubService } from '../../../tier-list-hub/tier-list-hub.service';
import { Deck, Games, HeroClasses, HeroClassesArr, TopLegendDeck } from '../../deck';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DustCalculationService } from '../../../core/dust-calculation.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'f2kTopSpotlightHub',
    templateUrl: './top-spotlight.component.html',
    styleUrls: ['./top-spotlight.component.css', '../../../tier-list-hub/grid.css']
})
export class TopSpotlightComponent implements OnInit, OnDestroy {

    decks: Array<TopLegendDeck> = [];
    amount = 20;
    page: number;
    totalPages: number;
    mode: string;
    isStandard: boolean;
    game: Games = 'HS';
    active = 'STANDARD'; // If this is expanded then in the chace tracking and filtering needs to be updated
    heroClasses: Array<HeroClasses> = [];
    routeSubscription: any;
    sortBy: 'tier' | 'dust' | 'date' | 'server' | 'rank' | 'none' = 'none';
    sortUp = false;

    subscriptions: Array<Subscription> = [];

    constructor(private tierListHubService: TierListHubService,
                private route: ActivatedRoute,
                private router: Router) {
        this.routeSubscription = this.route.params.subscribe();
    }

    ngOnInit() {
        this.page = Math.max(parseInt(this.route.snapshot.queryParams.page, 10) || 1, 1);
        this.heroClasses = this.route.snapshot.queryParams.classes ? this.route.snapshot.queryParams.classes.split(',').filter(heroClass => HeroClassesArr.includes(heroClass)) : [];

        this.setParams();

        this.getDecks();

        if (this.page > 1) {
            this.getDecks(0, 0);
        }
    }

    onActiveClassesChange(event: Array<HeroClasses>) {
        this.heroClasses = event;
        this.setParams();
        this.onActivePageChange(1);
    }

    // onAactiveModeChange(event: string) {
    //     this.active = event;
    //     this.setParams();
    //     this.getDecks();
    // }

    getDecks(amount?: number, offset?: number) {
        this.subscriptions.push(this.tierListHubService.getTopDecks((amount != null ? amount : this.amount), 0, this.mode, this.isStandard,
            this.game, this.heroClasses, (offset != null ? offset : ((this.page - 1) * this.amount))).subscribe(decksArr => {
            const decks = decksArr[0];
            if (decksArr[1]) {
                this.totalPages = Math.ceil(decksArr[1] / this.amount);
            }
            for (let i = 0, ii = decks.length; i < ii; i++) {
                decks[i].deck.dust = DustCalculationService.getCardCost(decks[i].deck.cards, decks[i].game);
            }
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
        }));
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

    sort(type: 'tier' | 'server' | 'dust' | 'date' | 'rank', event: any) {
        event.preventDefault();

        if (this.sortBy === type) {
            this.sortUp = !this.sortUp;
        }
        this.sortBy = type;

        this.decks.sort((a: TopLegendDeck, b: TopLegendDeck) => {
            const sortItems = this.sortUp ? [a, b] : [b, a];
            switch (type) {
                case 'dust':
                    return sortItems[0].deck[type] - (sortItems[1].deck[type]);
                case 'date':
                    return (sortItems[0].editDate || sortItems[0].date) - (sortItems[1].editDate || sortItems[1].date);
                case 'tier':
                    return sortItems[0][type] - (sortItems[1][type]);
                case 'server':
                    return sortItems[0][type].localeCompare(sortItems[1][type]);
                case 'rank':
                    return sortItems[0][type] - sortItems[1][type];
            }
        });
    }

    onActivePageChange(page: number): void {
        const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);

        this.page = page;

        if (page > 1) {
            queryParams.page = page;
        } else if (queryParams.page) {
            delete queryParams.page;
        }

        if (this.heroClasses.length > 0) {
            queryParams.classes = this.heroClasses.join(',');
        } else if (queryParams.classes) {
            delete queryParams.classes;
        }

        this.router.navigate([], { queryParams: queryParams, replaceUrl: true });

        this.getDecks();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
