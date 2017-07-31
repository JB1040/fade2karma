import { Component } from '@angular/core';
import { Article } from '../articles/article';
import { DeckHs } from '../decks/deck';
import { Streamer } from './streams/streamer';

@Component({
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
    article: Article;
    streamer = {
        name: 'Cipher',
        game: 'Hearthstone',
        image: 'Cipher.jpg',
        twitch: 'https://www.twitch.tv/cipherhs'
    };
    articles: Article[];
    decks: DeckHs[];
    articlesArr: Article[][];
    decksArr: DeckHs[][];
    deck: DeckHs;

    onlineStreamers: Streamer[] = [{
        name: 'BOB',
        game: 'Hearthstone',
        image: 'Cipher.jpg',
        twitch: 'https://www.twitch.tv/cipherhs'
    }, {
        name: 'MAT',
        game: 'Hearthstone',
        image: 'Cipher.jpg',
        twitch: 'https://www.twitch.tv/cipherhs'
    }, {
        name: 'GREEN',
        game: 'Hearthstone',
        image: 'Cipher.jpg',
        twitch: 'https://www.twitch.tv/cipherhs'
    }, {
        name: 'Cipher',
        game: 'Hearthstone',
        image: 'Cipher.jpg',
        twitch: 'https://www.twitch.tv/cipherhs'
    }, {
        name: 'TIM',
        game: 'Hearthstone',
        image: 'Cipher.jpg',
        twitch: 'https://www.twitch.tv/cipherhs'
    }];

    constructor() {
        this.article = {
            title: 'Vararanis: Cosmoc Crown Showdown BreakDown',
            image: 'cipher.jpg',
            type: 'PODCAST',
            author: 'Chris Kohler',
            contentType: 'article',
            date: 1498302349012,
            description: 'Lorem ipsum dolor sit amet, pro te volumus maluisset, no qui aperiri signiferumque, epicurei petentium no his. Cu natum abhorreant voluptatum ',
            video: true
        };

        this.deck = {
            title: 'Control Mage',
            image: 'cipher.jpg', // this is a placeholder image xD
            type: 'MAGE',
            author: 'Chris Kohler',
            contentType: 'deck',
            date: 1498983069770,
            description: 'Lorem ipsum dolor sit amet, pro te volumus maluisset, no qui aperiri signiferumque, epicurei petentium no his. Cu natum abhorreant voluptatum ',
            dust: 2630,
            gameMode: 'Standard',
            hero: 'Druid',
            tier: 1
        };

        this.articles = [];
        for (let x = 0; x < 3; x++) {
            this.articles.push(this.article);
        }

        this.articlesArr = [];
        for (let x = 0; x < 2; x++) {
            this.articlesArr.push(this.articles);
        }

        this.decks = [];
        for (let x = 0; x < 6; x++) {
            this.decks.push(this.deck);
        }

        this.decksArr = [];
        for (let x = 0; x < 2; x++) {
            this.decksArr.push(this.decks);
        }
    }
}
