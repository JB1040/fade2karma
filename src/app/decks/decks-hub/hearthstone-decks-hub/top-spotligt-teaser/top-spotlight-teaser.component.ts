import { Component, Input, OnInit } from '@angular/core';
import { TopLegendDeck } from '../../../deck';
import { TimeTransfer } from '../../../../core/time-transfer';

@Component({
    selector: 'f2kTopSpotlightTeaser',
    templateUrl: './top-spotlight-teaser.component.html',
    styleUrls: ['../../../../decklistrow/rank-cell.scss', './top-spotlight-teaser.component.css']
})
export class TopSpotlightTeaserComponent {
    @Input() decks: TopLegendDeck[];

    getDate(deck: TopLegendDeck): string {
        return TimeTransfer.getTime(deck.editDate || deck.date);
    }

    getDeckUrl(deck: TopLegendDeck) {
        return `/decklists/top_25_spotlight/${deck.title.replace(/ /g, '_').replace(/[:<>;,+*()'$!-.~?/]/g, '').toLowerCase()}_${deck.id}`;
    }
}
