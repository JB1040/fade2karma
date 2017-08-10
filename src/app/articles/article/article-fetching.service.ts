import { Injectable } from '@angular/core';
import { ArticleContent } from './article-content/article-content';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ArticleFetchingService {

  /* TODO: FOR TESTING PURPOSES; IN PRODUCTION CODE WE SHALL FETCH FROM API */
  private articles: ArticleContent[] = [
    new ArticleContent(
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
    ),
    new ArticleContent(
        'F2K Signs Streamers: Karlis and Abdelhakeem',
        {
            name: 'Cipher',
            game: 'Hearthstone',
            image: 'cipher.jpg',
            twitch: 'https://www.twitch.tv/cipherhs'
        },
        new Date(1481200009461),
        12,
        `
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
    ),
    new ArticleContent(
        'New Cool Article',
        {
            name: 'Cipher',
            game: 'Gwent',
            image: 'cipher.jpg',
            twitch: 'https://www.twitch.tv/cipherhs'
        },
        new Date(1481200009461),
        17,
        `
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
    )
  ];

  constructor() { }

  public getNextArticle(): Observable<ArticleContent> {
    return Observable.of(this.articles[Math.floor(Math.random()*this.articles.length)]).delay(1500);
  }

}
