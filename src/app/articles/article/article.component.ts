import { Component, OnInit, Input } from '@angular/core';
import { ArticleContent } from './article-content/article-content';
import { Author } from './author/author';

@Component({
    selector: 'f2k-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    // TODO: Resolve article from url
    mainArticle: ArticleContent = new ArticleContent(
        'F2K Signs Streamers: JJPasak and Isherwood',
        {
            name: 'Cipher',
            game: 'Hearthstone',
            image: 'cipher.jpg',
            twitch: 'https://www.twitch.tv/cipherhs'
        },
        new Date(1481200000000),
        9,
        `
            <img src="http://lorempixel.com/780/438" alt="">
            <p class="b1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                id est laborum.</p>
            <img src="http://lorempixel.com/780/438" alt="">
            <p class="b1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                id est laborum.</p>
        `
    );
    articles: ArticleContent[] = [];

    constructor() {}

    ngOnInit(): void {
        this.articles.push(this.mainArticle);
    }
}
