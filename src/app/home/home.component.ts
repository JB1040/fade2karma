import { Component } from '@angular/core';
import { Article } from '../articles/article';
import { DeckHs } from '../decks/deck';

@Component({
    template: `
        <!--<h2>HomePageComponent PlaceHolder</h2>-->
        <!--<onlineSteamerScroll></onlineSteamerScroll>-->
        <hr style="border-top: 3px solid black">

        <f2kOnlineStreamerTile style="display: inline-block;" [streamer]="streamer"></f2kOnlineStreamerTile>

        <hr style="border-top: 3px solid black">

        <f2kRecommendedTile class="article" [teasedItem]="article"></f2kRecommendedTile>
      
        <hr style="border-top: 3px solid black">

        <f2kRecommendedTile class="deck" [teasedItem]="deck"></f2kRecommendedTile>

        <hr style="border-top: 3px solid black">

        <f2kArticlesTile [article]="article"></f2kArticlesTile>

        <hr style="border-top: 3px solid black">

        <f2kArticlesTile [showDescription]="true" class="featured" [article]="article"></f2kArticlesTile>

        <hr style="border-top: 3px solid black">

        <f2kRecommendedContainer [items]="articles" [title]="'YOU MAY ALSO LIKE'"></f2kRecommendedContainer>

        <hr style="border-top: 3px solid black">

        <f2kRecommendedContainer [items]="decks" [title]="'F2K HEARTHSTONE TIER LIST'"></f2kRecommendedContainer>

        <hr style="border-top: 3px solid black">

        <f2kTopDecks [articlesArr]="decksArr" [title]="'TOP DECKS'" class="clearfix"></f2kTopDecks>

        <hr style="border-top: 3px solid black">

        <f2kOnlineSteamerScroll [onlineStreamers]="onlineStreamers"></f2kOnlineSteamerScroll>

        <hr style="border-top: 3px solid black">

        <f2kTierListComponent [items]="recommended" [title]="'F2K HEARTHSTONE TIER LIST'"></f2kTierListComponent>
        
        <hr style="border-top: 3px solid black">

        <f2kIntegratedStuffDisplay></f2kIntegratedStuffDisplay>

        <hr style="border-top: 3px solid black">

        <f2kNewsLetter></f2kNewsLetter>
        
        <hr style="border-top: 3px solid black">

        <f2kFooter></f2kFooter>
`
})

export class HomeTestingComponent {
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
    recommended: DeckHs[];

    onlineStreamers = [{
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

        this.recommended = [];
        for (let x = 0; x < 8; x++) {
            this.recommended.push(this.deck);
        }
    }
}
