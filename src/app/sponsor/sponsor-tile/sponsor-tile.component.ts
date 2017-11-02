import { Component, Input } from '@angular/core';
import { Sponsor } from '../sponsor';

@Component({
    selector: 'f2kSponsorTile',
    templateUrl: './sponsor-tile.component.html',
    styleUrls: ['./sponsor-tile.component.css']
})
export class SponsorTileComponent {
    @Input() sponsor: Sponsor;
}
