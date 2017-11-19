import { Component, Input } from '@angular/core';
import { Author } from '../../articles/article/author/author';

@Component({
    selector: 'f2kMemberTile',
    templateUrl: './player-tile.component.html',
    styleUrls: ['./player-tile.component.css']
})
export class PlayerInstanceComponent {
    @Input() user: Author;
}
