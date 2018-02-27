import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnDestroy, ViewChild } from '@angular/core';
import { Deck, DeckObj } from '../deck';
import Card from '../../card';
import { DustCalculationService } from '../../core/dust-calculation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_URL, GetImageSrc } from '../../core/globals';
import { DOCUMENT, DomSanitizer } from '@angular/platform-browser';
import { FacebookSkdService } from '../../facebook-skd.service';
import { HtmlHovererComponent } from '../../html-hoverer/html-hoverer.component';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

const COLLAPSED_CLASS = 'collapsed';
const EXPANDED_CLASS = 'expanded';

@Component({
    selector: 'f2kNewDeckHub',
    templateUrl: './new-deck-hub.component.html',
    styleUrls: ['./new-deck-hub.component.css']
})
export class NewDeckHubComponent implements OnDestroy {

    public repoUrl = 'https://github.com/Epotignano/ng2-social-share';
    deck: Deck;
    chartData: any;
    leftColumn: Array<{ title: string, cards: Array<Card> }> = [];
    rightColumn: Array<{ title: string, cards: Array<Card> }> = [];
    displayedCard: string;
    openedWithClick = false;
    CONTENT: any;
    routeSubscription: any;
    facebookComments = false;
    showComments = false;
    commentUrl: string;
    previousSize: number;
    getImageSrc = GetImageSrc;
    activeDeck: DeckObj;
    subscriptions: Array<Subscription> = [];

    copyDeckCodeName = 'COPY DECK CODE';

    clickOnHoverableElement: null | MouseEvent = null;

    distribution: { [key: string]: number };

    @ViewChild('contentContainer') contentContainer: ElementRef;
    @ViewChild('commentContainer') commentContainer: ElementRef;
    @ViewChild('cardsContainers') cardsContainers: ElementRef;
    @ViewChild('htmlHover') htmlHover: HtmlHovererComponent;

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

    constructor(@Inject(DOCUMENT) private docEl: Document, private http: HttpClient, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private facebookService: FacebookSkdService, private cdRef: ChangeDetectorRef) { // TODO remove when real data is there
        this.routeSubscription = this.route.params.subscribe(() => {
            this.deck = null;
            this.chartData = null;
            this.leftColumn = [];
            this.rightColumn = [];
            this.displayedCard = null;
            this.CONTENT = '';

            this.getDeck(parseInt(this.router.url.slice(this.router.url.lastIndexOf('_') + 1), 10));
        });
    }

    @HostListener('window:resize', ['$event.target'])
    onResize() {
        if (this.previousSize && this.commentContainer.nativeElement.clientWidth !== this.previousSize) {
            this.parseHTML(true);
        }
    }

    @HostListener('document:click', ['$event']) onDocClick($event: MouseEvent) {
        if (this.openedWithClick && $event.button !== 2 && $event !== this.clickOnHoverableElement) {
            if (this.clickOnHoverableElement !== $event) {
                this.openedWithClick = false;
                this.htmlHover.close();
            } else if (!this.cardsContainers.nativeElement.contains($event.target)) {
                this.openedWithClick = false;
                this.htmlHover.close();
            }
        }
    }

    initTextCardHover(): void {
        if (this.deck && this.deck.game === 'HS') {
            const hoverableElements = (this.contentContainer.nativeElement as HTMLDivElement).querySelectorAll<HTMLSpanElement>('.f2kHoverCard');
            this.makeElementsHoverable(hoverableElements);
        }
    }

    makeElementsHoverable(hoverableElements: NodeListOf<HTMLElement>): void {
        for (let i = 0; i < hoverableElements.length; i++) {
            const hoverableElement = hoverableElements[i];
            const cardId = hoverableElement.getAttribute('data-id');
            if (cardId) {
                hoverableElement.addEventListener('click', $event => {
                    this.clickOnHoverableElement = $event;
                    this.displayedCard = `<img src="${encodeURI(`assets/images/static/hearthstone/${cardId}.png`)}">`;
                    this.openHover($event, true);
                });

                hoverableElement.addEventListener('mouseenter', $event => {
                    this.displayedCard = `<img src="${encodeURI(`assets/images/static/hearthstone/${cardId}.png`)}">`;
                    this.openHover($event);
                });

                hoverableElement.addEventListener('mousemove', $event => {
                    this.htmlHover.positionRelativeToMouse($event);
                });

                hoverableElement.addEventListener('mouseleave', $event => {
                    this.closeHover();
                });
            }
        }
    }

    initSpoilers(): void {
         if (this.deck) {
            const spoilerElements  = (this.contentContainer.nativeElement as HTMLDivElement).querySelectorAll<HTMLSpanElement>('.f2kSpoiler');
            for (let i = 0; i < spoilerElements.length; i++) {
                const clickEl = document.createElement('span');

                const spoilerElement = spoilerElements[i];
                const content = spoilerElement.innerHTML;
                this.toggleSpoiler(spoilerElement, clickEl, content);

                clickEl.addEventListener('click', () => {
                    this.toggleSpoiler(spoilerElement, clickEl, content);
                });
            }
        }
    }

    toggleSpoiler(el: HTMLSpanElement, clickEl: HTMLSpanElement, initialContent: string): void {
        if (el.classList.contains(COLLAPSED_CLASS)) {
            el.classList.add(EXPANDED_CLASS);
            el.classList.remove(COLLAPSED_CLASS);
            el.innerHTML = initialContent;
            clickEl.innerHTML = '[-]';
            const hoverableElements = el.querySelectorAll<HTMLSpanElement>('.f2kHoverCard');
            this.makeElementsHoverable(hoverableElements);
        } else {
            el.classList.add(COLLAPSED_CLASS);
            el.classList.remove(EXPANDED_CLASS);
            el.innerHTML = '';
            clickEl.innerHTML = '[+]';
        }
        el.insertBefore(clickEl, el.childNodes[0]);
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
                title: 'Class Cards',
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

    // on mobile if only click based events to show cards if screen size is to small for hover to work properly
    openHover($event: MouseEvent, clickOpen?: boolean): void {
        if (clickOpen) {
            this.openedWithClick = true;
            this.htmlHover.open($event);
        } else if (window.innerWidth > 600 || window.innerHeight > 800) {
            this.htmlHover.open($event);
        }
    }

    closeHover(): void {
        if (!this.openedWithClick && (window.innerWidth > 600 || window.innerHeight > 800)) {
            this.htmlHover.close();
        }
    }

    setDisplayedCard(card: Card): void {
        this.displayedCard = `<img src="${GetImageSrc(card, this.deck.game, false)}">`;
    }

    getDeck(id: number) { // TODO move in service, handle errors in case they take place...
        this.subscriptions.push(this.http.get<Deck>(`${BASE_URL}/api/decks/${id}`).subscribe(deck => {

            this.deck = deck;
            this.deck.content = this.deck.content.replace(/<span class="f2kHoverCard(.*?)>(.*?)<\/span>([a-zA-Z']+)/gi, '<span class="f2kHoverCard$1>$2$3</span>');
            this.activeDeck = this.deck.decks[0];

            this.CONTENT = this.sanitizer.bypassSecurityTrustHtml(`${this.deck.content}`);
            this.commentUrl = `${BASE_URL}/tier_list/${this.deck.title.replace(/ /g, '_').replace(/[:<>;,+*()'$!-.~?/]/g, '').toLowerCase()}`;
            this.buildData();
            this.cdRef.detectChanges();
            this.initTextCardHover();
            this.initSpoilers();
        }));
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
            this.copyDeckCodeName = '✔ DECK CODE COPIED';
            window.setTimeout(() => { this.copyDeckCodeName = 'COPY DECK CODE'; }, 5000);
        } else {
            prompt('Deck code could not be automatically copied\nto your clipboard, but you can manually copy it.', this.activeDeck.code);
        }
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
