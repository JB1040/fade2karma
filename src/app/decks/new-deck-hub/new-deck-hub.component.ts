import { Component, ElementRef, HostListener, Inject, OnDestroy, ViewChild } from '@angular/core';
import { Deck, DeckObj } from '../deck';
import Card from '../../card';
import { DustCalculationService } from '../../core/dust-calculation.service';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_URL, GetImageSrc } from '../../core/globals';
import { DOCUMENT, DomSanitizer } from '@angular/platform-browser';
import { FacebookSkdService } from '../../facebook-skd.service';

@Component({
    selector: 'f2kNewDeckHub',
    templateUrl: './new-deck-hub.component.html',
    styleUrls: ['./new-deck-hub.component.css']
})
export class NewDeckHubComponent implements OnDestroy {

    public repoUrl = 'https://github.com/Epotignano/ng2-social-share';
    deck: Deck;
    decks: Deck[] = [];
    chartData: any;
    leftColumn: Array<{ title: string, cards: Array<Card> }> = [];
    rightColumn: Array<{ title: string, cards: Array<Card> }> = [];
    displayCard = false;
    displayedCard: Card;
    displayedCardUp: boolean;
    displayedCardLeft: boolean;
    displayCardTopPx: number;
    displayCardleftPx: number;
    CONTENT: any;
    routeSubscription: any;
    facebookComments = false;
    showComments = false;
    commentUrl: string;
    previousSize: number;
    getImageSrc = GetImageSrc;
    activeDeck: DeckObj;

    distribution: { [key: string]: number };

    @ViewChild('commentContainer') commentContainer: ElementRef;

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

    constructor(@Inject(DOCUMENT) private docEl: Document, private http: Http, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private facebookService: FacebookSkdService) { // TODO remove when real data is there
        this.routeSubscription = this.route.params.subscribe(() => {
            this.deck = null;
            this.decks = [];
            this.chartData = null;
            this.leftColumn = [];
            this.rightColumn = [];
            this.displayCard = false;
            this.displayedCard = null;
            this.displayedCardUp = false;
            this.displayedCardLeft = false;
            this.displayCardTopPx = null;
            this.displayCardleftPx = null;
            this.CONTENT = '';

            this.getDeck(parseInt(this.router.url.slice(this.router.url.lastIndexOf('_') + 1), 10));
            this.getDecks();
        });
    }

    @HostListener('window:resize', ['$event.target'])
    onResize() {
        if (this.previousSize && this.commentContainer.nativeElement.clientWidth !== this.previousSize) {
            this.parseHTML(true);
        }
    }

    parseHTML(forceResize?: boolean): void {
        if (this.facebookService.fb) {
            if (!this.facebookComments || forceResize) {
                this.facebookComments = true;
                this.previousSize = this.commentContainer.nativeElement.clientWidth;
                this.commentContainer.nativeElement.innerHTML = `<div class="fb-comments" data-href="${BASE_URL}/decks/${this.deck.id}" data-width="${this.previousSize}" data-numposts="5"></div>`;
                this.facebookService.fb.XFBML.parse(this.commentContainer.nativeElement);
            }
        }
    }

    getSpecificCards(deck: DeckObj, param: string, value: any, equils = true) {
        const cards: Array<Card> = [];
        deck.cards.forEach(card => {
            if ((equils ? card[param] === value : card[param] !== value)) {
                let c;

                for (let i = 0; i < cards.length; i++) {
                    if (cards[i].dbId === card.dbId) {
                        c = cards[i];
                        break;
                    }
                }

                if (c) {
                    ++c.amount;
                } else {
                    card.amount = 1;
                    cards.push(card);
                }
            }
        });
        return cards.sort(NewDeckHubComponent.sortByManaCostAndName);
    }

    getCardAmount(cards: Array<Card>) {
        return cards.reduce((acc, card) => { return acc += card.amount; }, 0);
    }

    buildData() {
        this.leftColumn = [];
        this.rightColumn = [];

        let deckMode: string;
        if (this.deck.mode === 'CON') {
            if (this.deck.isStandard) {
                deckMode = 'standard';
            } else {
                deckMode = 'wild';
            }
        }

        if (this.deck.game === 'HS') {
            this.distribution = { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7+': 0 };
            this.activeDeck.cards.forEach((card: Card) => {
                this.distribution[(card.cost >= 7 ? '7+' : `${card.cost}`)] += 1;
            });
            this.leftColumn.push({
                title: `${this.deck.heroClass.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())} Cards`,
                cards: this.getSpecificCards(this.activeDeck, 'heroClass', 'NEUTRAL', false)
            });
            this.rightColumn.push({ title: 'Neutral Cards', cards: this.getSpecificCards(this.activeDeck, 'heroClass', 'NEUTRAL') });
        } else {
            this.distribution = null;
            const leaderCard = new Card(this.deck.leader);
            leaderCard.rarity = 'LEGENDARY';
            leaderCard.positions = ['EVENT'];
            this.leftColumn.push({ title: 'Leader', cards: [leaderCard] });

            const goldCards = this.getSpecificCards(this.activeDeck, 'group', 'GOLD');
            this.leftColumn.push({ title: 'Gold x ' + this.getCardAmount(goldCards), cards: goldCards });

            const silverCards = this.getSpecificCards(this.activeDeck, 'group', 'SILVER');
            this.leftColumn.push({ title: 'Silver x ' + this.getCardAmount(silverCards), cards: silverCards });

            const bronzeCards = this.getSpecificCards(this.activeDeck, 'group', 'BRONZE');
            this.rightColumn.push({ title: 'Bronze x ' + this.getCardAmount(bronzeCards), cards: bronzeCards });
        }

        console.log(`assets/Hearthstone_Square/${this.deck.heroClass.toLowerCase()}.jpg`);
        this.chartData = {
            metadata: [
                {
                    label: this.deck.game === 'HS' ? 'Class' : 'Faction',
                    value: this.deck.game === 'HS' ? this.deck.heroClass.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) : this.deck.faction.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                    image: this.deck.game === 'HS' ? `assets/Hearthstone_Square/${this.deck.heroClass.toLowerCase()}.jpg` : `assets/icons/${this.deck.faction.replace('\'', '-').replace(' ', '').toLowerCase()}.svg`,
                    imageStyle: { 'padding-bottom': '4px' }
                },
                {
                    label: this.deck.game === 'HS' ? 'Game mode' : 'Leader',
                    value: this.deck.game === 'HS' ? deckMode.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) : this.deck.leader.name.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                    image: this.deck.game === 'HS' ? `assets/icons/${deckMode.toLowerCase()}icon.svg` : `assets/GwentLeaders_Square/${this.deck.leader.name.replace('\'', '-').replace(' ', '').toLowerCase()}.jpg`,
                    imageStyle: { 'padding-bottom': '5px' }
                },
                {
                    label: this.deck.game === 'HS' ? 'Dust Cost' : 'Scrap',
                    value: DustCalculationService.getCardCost(this.activeDeck.cards, this.deck.game),
                    image: this.deck.game === 'HS' ? 'assets/icons/icon-dust.png' : 'assets/icons/icon-scrap.png',
                    imageStyle: { 'padding-bottom': '5px' }
                }
            ],
            distribution: this.distribution
        };
    }

    positionDisplayedCard(event: MouseEvent) {
        const xPos = event.clientX;
        const yPos = event.clientY;

        this.displayedCardLeft = xPos * 2 > window.innerWidth;
        this.displayedCardUp = yPos * 2 > window.innerHeight;
        this.displayCardTopPx = yPos + (this.displayedCardUp ? -20 : 20);
        this.displayCardleftPx = xPos + (this.displayedCardLeft ? -20 : 20);
    }

    getDeck(id: number) { // TODO move in service, handle errors in case they take place...
        this.http.get(`${BASE_URL}/api/decks/${id}`).subscribe(res => {

            this.deck = res.json();
            this.activeDeck = this.deck.decks[0];

            this.CONTENT = this.sanitizer.bypassSecurityTrustHtml(`${this.deck.content}`);
            this.commentUrl = `${BASE_URL}/tier_list/${this.deck.title.replace(/ /g, '_').replace(/[^a-zA-Z0-9;,+*()\'$!-._~?/]/g, '').toLowerCase()}`;

            this.buildData();
        });
    }

    getDecks() { // TODO make something cool with similar decks...
        this.http.get(`${BASE_URL}/api/decks/list?amount=6&offset=0`).subscribe(res => {
            this.decks = res.json();
        });
    }

    copyDeckCode(): void {
        if (document.execCommand('copy')) {
            const textArea = this.docEl.createElement('textarea');
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            this.docEl.body.appendChild(textArea);
            textArea.value = this.activeDeck.code;
            textArea.select();
            this.docEl.execCommand('copy');
            textArea.remove();
        } else {
            prompt('Deck code could not be automatically copied\nto your clipboard, but you can manually copy it.', this.activeDeck.code);
        }
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}
