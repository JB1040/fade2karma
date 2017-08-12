import {
    Component,
    Input,
} from '@angular/core';
import { Author} from './author';

@Component({
    selector: 'f2kAuthorTile',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.css']
})
export class AuthorComponent {
    @Input() author: Author;
    constructor() {
    }
}
