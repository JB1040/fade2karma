import { Component, OnInit } from '@angular/core';
import { TierListHubService } from './tier-list-hub.service';
import { Games } from '../decks/deck';

type activeTypes = 'STANDARD' /*| 'WILD' | 'ARENA'*/ | 'GWENT';

@Component({
    selector: 'f2kTierListHub',
    templateUrl: './tier-list-hub.component.html',
    styleUrls: ['./tier-list-hub.component.css', 'grid.css']
})
export class TierListHubComponent implements OnInit {

    decksList: any = {};
    showFloatingSocialMediaLinks = false;
    amount = 100;
    mode: string;
    game: Games;
    isStandard: boolean | null;
    active: activeTypes = 'STANDARD';

    constructor(private tierListHubService: TierListHubService) {}

    ngOnInit() {
        this.loadDecks();
    }

    loadDecks(): void {
        if (this.decksList[this.active]) {
            return;
        }
        this.decksList[this.active] = [];
        this.setParams();
        this.getDecks(1, 'Tier 1 - Best of the Best');
        this.getDecks(2, 'Tier 2 - Competitive Decks');
        this.getDecks(3, 'Tier 3 - Playable Decks');
        // this.getDecks(4, 'Tier 4 - The Best of the Rest');
    }

    getDecks(tier: number, title: string) {
        this.tierListHubService
            .getDecks(this.amount, tier, this.mode, this.isStandard, this.game)
            .then(deckList => {
                this.decksList[this.active][tier - 1] = { title: title, list: deckList };
            });
    }

    setParams(): void {
        if (this.active === 'GWENT') {
            this.game = 'GWENT';
            this.mode = '';
            this.isStandard = null;
        } else {
            this.game = 'HS';
            if (this.active === 'STANDARD') {
                this.mode = 'CON';
                this.isStandard = true;
            }
            // if (this.active === 'WILD') {
            //     this.mode = 'CON';
            //     this.isStandard = false;
            // }
            // if (this.active === 'ARENA') {
            //     this.mode = 'ARENA';
            //     this.isStandard = false;
            // }
        }
    }

    changeActive(newActive: activeTypes) {
        this.active = newActive;
        this.loadDecks();
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
