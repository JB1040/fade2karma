import { Component, OnInit } from '@angular/core';
import { Deck } from '../deck';
import Card from '../../card';
import { DustCalculationService } from '../../core/dust-calculation.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { BASE_URL } from '../../core/globals';

@Component({
  selector: 'f2kNewDeckHub',
  templateUrl: './new-deck-hub.component.html',
  styleUrls: ['./new-deck-hub.component.css']
})
export class NewDeckHubComponent implements OnInit {

    public repoUrl = 'https://github.com/Epotignano/ng2-social-share';
    deck: Deck;
    decks: Deck[] = [];
    chartData: any;
    classCards: Card[] = [];
    neutralCards: Card[] = [];
    displayCard = false;
    displayedCard: Card;
    displayedCardUp: boolean;
    displayedCardLeft: boolean;
    displayCardTopPx: number;
    displayCardleftPx: number;
    CONTENT: any;

    distribution: Array<Array<any>> = [ // TODO type
        ['0', 0],
        ['1', 0],
        ['2', 0],
        ['3', 0],
        ['4', 0],
        ['5', 0],
        ['6', 0],
        ['7', 0]
    ];

    static sortByManaCostAndName(a: Card, b: Card) {
        const sortValue = a.cost - b.cost;

        if (sortValue === 0) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }

        return sortValue;
    }

    constructor(private http: Http, private router: Router) { // TODO remove when real data is there
        // const card: Card = new Card('Gabe from Penny Arcade', 6, 'NEUTRAL', true, 5, 559, 'At least he has Angry Chicken.', 2, 'EX1_116', 'Leeroy Jenkins', 'expert1', 'LEGENDARY', 'MINION', false);
        // const card2: Card = new Card('Chippy', null, 'PALADIN', true, 1, 1373, 'Apparently with wisdom comes the knowledge that you should probably be attacking every turn.', 2, 'EX1_363', 'Blessing of Wisdom', 'expert1', 'COMMON', 'SPELL', false);
        // const cards: Card[] = [card, card2, card2];
        // const author: Author = new Author(2, 'Bob', 'test@gmail.com', 'Hearthstone', null, 1501927168668);
        // this.deck = new Deck(1, author, 'This is a Tilte', 'Cipher.jpg', '<p>this is the content</p>', 'HEARTHSTONE', cards, true, 10, 'PALADIN', true, 'STANDARD', 1501927168668);
        // for (let i = 0; i < 6; i++) {
        //     this.decks.push(this.deck);
        // }
    }

    ngOnInit() {
        this.getDeck(parseInt(this.router.url.slice(this.router.url.lastIndexOf('_') + 1), 10));
        this.getDecks();
    }

    buildData() {
        const addedCardIDs: number[] = [];

        this.deck.cards.forEach((card: Card) => {
            this.distribution[(card.cost > 7 ? 7 : card.cost)][1] += 1;

            if (card.heroClass === 'NEUTRAL') {
                if (addedCardIDs.indexOf(card.dbId) >= 0) {
                    this.neutralCards.forEach(neutralCard => {
                        if (neutralCard.dbId === card.dbId) {
                            neutralCard.amount += 1;
                        }
                    });
                } else {
					card.amount = 1;
                    this.neutralCards.push(card);
                }
            } else {
                if (addedCardIDs.indexOf(card.dbId) >= 0) {
                    this.classCards.forEach(classCard => {
                        if (classCard.dbId === card.dbId) {
						
                            classCard.amount += 1;
                        }
                    });
                } else {
                    card.amount = 1;
                    this.classCards.push(card);
                }
            }
            addedCardIDs.push(card.dbId);
        });

        this.neutralCards.sort(NewDeckHubComponent.sortByManaCostAndName);
        this.classCards.sort(NewDeckHubComponent.sortByManaCostAndName);

        this.chartData = {
            metadata: [
                {
                    label: 'Class',
                    value: this.deck.heroClass.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                    image: `assets/Hearthstone_Square/${this.deck.heroClass.toLowerCase()}.jpg`
                },
                {
                    label: 'Game mode',
                    value: this.deck.mode.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                    image: `assets/icons/${this.deck.mode.toLowerCase()}icon.svg`
                },
                {
                    label: 'Dust Cost',
                    value: DustCalculationService.getDustCost(this.deck.cards)
                }
            ],
            distribution: this.distribution
        };
    }

    positionDisplayedCard(event: any) {
        const xPos = event.clientX;
        const yPos = event.clientY;

        this.displayedCardLeft = xPos * 2 > window.innerWidth;
        this.displayedCardUp = yPos * 2 > window.innerHeight;
        this.displayCardTopPx = yPos + (this.displayedCardUp ? -20 : 20);
        this.displayCardleftPx = xPos + (this.displayedCardLeft ? -20 : 20);
    }

    getDeck(id: number) { // TODO move in service, handle errors in case they take place...
        this.http.get(`${BASE_URL}/api/decks/${id}`).subscribe(res => { // TODO get id...
            this.deck = res.json();
            this.CONTENT = `${this.deck.content}`;
            this.buildData();
        });
    }

    getDecks() { // TODO make something cool with similar decks...
        this.http.get(`${BASE_URL}/api/decks/list?amount=6&offset=0`).subscribe(res => {
            this.decks = res.json();
        });
    }
}
