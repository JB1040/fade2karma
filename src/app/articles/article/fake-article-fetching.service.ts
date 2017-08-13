import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Article } from '../article'

@Injectable()
export class FakeArticleFetchingService {
    private fakeArticle = {
      'id': 1,
      'author': {
        'username': 'lorem.ipsum.101',
        'fullName': 'Lorem Ipsum',
        'email': 'lorem@ipsum.com',
        'image': 'http://lorempixel.com/64/64',
        'game': 'Hearthstone',
        'twitch': 'twitch.tv/cipher'
      },
      'title': 'Sample Article Title',
      'content': `
       <img src="http://lorempixel.com/780/438">
       <p class="b1">Lorem ipsum bla bla bla...</p>
       <img src="http://lorempixel.com/780/438">
       <p class="b1">Lorem ipsum bla bla bla...</p>
      `,
      'game': 'Hearthstone',
      'rating': 0,
      'date': 1502690000
    };

    constructor() {
    }

    /**
     * Fetches and returns the article with the given id
     * @param {number} id - The id of the requested article
     * @returns {Article} The article with the given id
     */
    getArticle(id: number): Observable<Article> {
      const article = this.fakeArticle;
      article['id'] = id;
      return Observable.of(article);
    }

    /**
     * Fetches and returns articles similar to the article with
     * the given id
     * @param {number} targetId - The id of the article to consider
     * when looking for similar articles
     * @returns {Article[]} An array of recommended articles
     */
    getRecommendedArticles(targetId: number): Observable<Article[]> {
      return Observable.of(Array.from({'length': 3}, el => this.fakeArticle));
    }

    /**
     * Fetches and returns the given number of articles starting
     * after the article with the given offsetId
     * @param {number} offsetId - The id of the article just before
     * the first returned article
     * @param {count} number - The number of articles to get
     * @returns {Article[]} An array of articles that "occur" after
     * the article with an id equal to offsetId
     */
    getMoreArticles(offsetId: number, count: number) {
      return Observable.of(Array.from({'length': count}, el => this.fakeArticle));
    }
}
