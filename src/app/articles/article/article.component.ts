import { Component } from '@angular/core';

@Component({
    selector: 'f2k-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent {
    author = {
        name: 'Cipher',
        game: 'Hearthstone',
        image: 'cipher.jpg',
        twitch: 'https://www.twitch.tv/cipherhs'
    };

    constructor() {}
}
