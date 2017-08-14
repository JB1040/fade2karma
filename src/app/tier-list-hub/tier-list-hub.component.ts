import { Component, OnInit } from '@angular/core';
import { TierListHubService } from './tier-list-hub.service';

@Component({
    selector: 'f2kTierListHub',
    templateUrl: './tier-list-hub.component.html',
    styleUrls: ['./tier-list-hub.component.css', 'grid.css']
})
export class TierListHubComponent implements OnInit {

    decksList: any = {};
    showFloatingSocialMediaLinks = false;
    amount = 5;
    mode: string;
    isStandard: boolean;
    active = 'STANDARD';

    constructor(private tierListHubService: TierListHubService) {
        this.decksList['STANDARD'] = [];
        this.decksList['WILD'] = [];
        this.decksList['ARENA'] = [];
    }

    ngOnInit() {
        this.setParams();
        this.getDecks(1, 'Tier 1 - Top Decks to Beat', this.active);
        this.getDecks(2, 'Tier 2 - Top Decks to Beat', this.active);
        this.getDecks(3, 'Tier 3 - Top Decks to Beat', this.active);
    }

    getDecks(tier: number, title: string, active: string) {
        this.tierListHubService
            .getDecks(this.amount, tier, this.mode, this.isStandard)
            .then(deckList => {
                const deck = { title: title, list: deckList };
                this.decksList[active][tier - 1] = deck;
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

    changeActive(newActive: string) {
        this.active = newActive;
        if (this.decksList[newActive].length === 0) {
            this.setParams();
            this.getDecks(1, 'Tier 1 - Top Decks to Beat', newActive);
            this.getDecks(2, 'Tier 2 - Top Decks to Beat', newActive);
            this.getDecks(3, 'Tier 3 - Top Decks to Beat', newActive);
        }
    }

    // TODO fix this
    onResize() {
        this.showFloatingSocialMediaLinks = window.matchMedia('screen and (min-width:1300px)').matches;
    }

    isMd() {
        return (window.innerWidth > 991);
    }

    isLg() {
        return (window.innerWidth > 1199);
    }
}
