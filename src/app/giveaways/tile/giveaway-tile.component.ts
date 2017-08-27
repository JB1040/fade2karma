import { Component, Input } from '@angular/core';
import { Article } from '../../articles/article';

@Component({
    selector: 'f2kGiveawayTile',
    templateUrl: './giveaway-tile.component.html',
    styleUrls: ['./giveaway-tile.component.css'],
})
export class GiveawayTileComponent {
    @Input() giveaway: Article;
}
