import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Inject,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DOCUMENT, DomSanitizer } from '@angular/platform-browser';
import { Article } from '../../article';
import { BASE_URL } from '../../../core/globals';
import { FacebookSkdService } from '../../../facebook-skd.service';
import { HtmlHovererComponent } from '../../../html-hoverer/html-hoverer.component';

@Component({
    selector: 'f2kArticleContent',
    templateUrl: './article-content.component.html',
    styleUrls: ['./article-content.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ArticleContentComponent implements OnInit {

    @Input() article: Article;
    @Input() articles: Article[];
    CONTENT: any;
    height: any;
    facebookComments = false;
    showComments = false;
    previousSize: number;

    displayedCard: string;
    clickOnHoverableElement: null | MouseEvent = null;
    openedWithClick = false;

    @ViewChild('contentContainer') contentContainer: ElementRef;
    @ViewChild('articleBody') articleBody: ElementRef;
    @ViewChild('recommendedTeaser') recommendedTeaser: ElementRef;
    @ViewChild('socialShare') socialShare: ElementRef;
    @ViewChild('commentContainer') commentContainer: ElementRef;
    @ViewChild('htmlHover') htmlHover: HtmlHovererComponent;

    @HostListener('window:scroll', ['$event'])
    // TODO: while scrolling up, start scrolling when hits viewport bottom
    onScroll(event) {
        // Maximum translation distance for recommended teaser
        let maxDistance = this.articleBody.nativeElement.clientHeight
            - this.recommendedTeaser.nativeElement.offsetHeight;
        // Translation distance for recommended teaser
        let distance = -this.articleBody.nativeElement.getBoundingClientRect().top // distance from viewport top
            + this.docEl.getElementsByTagName('f2knavigation')[0]['offsetHeight']
            + parseInt(this.docEl.getElementsByTagName('f2knavigation')[0]['style']['top'], 10)
            + 20; // extra 20 px margin
        // Teaser limits
        distance = distance < 0 ? 0 : distance;
        distance = distance > maxDistance ? maxDistance : distance;
        if (parseInt(this.articleBody.nativeElement.getBoundingClientRect().width, 10) !== 780) { // TODO better fix for only doing this in window width more then 1220px
            distance = 0;
        }
        this.recommendedTeaser.nativeElement.style.transform = 'translateY(' + distance + 'px)';

        // Maximum translation distance for social share element
        maxDistance = this.articleBody.nativeElement.clientHeight
            - this.socialShare.nativeElement.offsetHeight
            - 40; // top margin of social share element
        // Translation distance for social share element
        distance = -this.articleBody.nativeElement.getBoundingClientRect().top // distance from viewport top
            + this.docEl.getElementsByTagName('f2knavigation')[0]['offsetHeight']
            + parseInt(this.docEl.getElementsByTagName('f2knavigation')[0]['style']['top'], 10);
        // Social share element limits
        distance = distance < 0 ? 0 : distance;
        distance = distance > maxDistance ? maxDistance : distance;
        if (parseInt(this.articleBody.nativeElement.getBoundingClientRect().width, 10) !== 780) { // TODO better fix for only doing this in window width more then 1220px
            distance = 0;
        }
        this.socialShare.nativeElement.style.transform = 'translateY(' + distance + 'px)';
    }

    constructor(@Inject(DOCUMENT) private docEl: Document, private sanitizer: DomSanitizer, private el: ElementRef, private facebookService: FacebookSkdService, private cdRef: ChangeDetectorRef) {}

    @HostListener('window:resize', ['$event.target'])
    onResize() {
        this.resizeWorks();

        if (this.previousSize && this.commentContainer.nativeElement.clientWidth !== this.previousSize) {
            this.parseHTML(true);
        }
    }

    @HostListener('document:click', ['$event']) onDocClick($event: MouseEvent) {
        if (this.openedWithClick && $event.button !== 2) {
            if (this.clickOnHoverableElement !== $event) {
                this.openedWithClick = false;
                this.htmlHover.close();
            }
        }
    }

    initTextCardHover(): void {
        if (this.article && this.article.game === 'HS') {
            const hoverableElements = (this.contentContainer.nativeElement as HTMLDivElement).querySelectorAll<HTMLSpanElement>('.f2kHoverCard');
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

    parseHTML(forceResize?: boolean): void {
        if (this.facebookService.fb) {
            if (!this.facebookComments || forceResize) {
                this.facebookComments = true;
                this.previousSize = this.commentContainer.nativeElement.clientWidth;
                this.commentContainer.nativeElement.innerHTML = `<div class="fb-comments" data-href="${BASE_URL}/articles/${this.article.id}" data-width="${this.previousSize}" data-numposts="5"></div>`;
                this.facebookService.fb.XFBML.parse(this.commentContainer.nativeElement);
            }
        }
    }

    private resizeWorks(): void {
        this.height = this.el.nativeElement.width * 0.667;
    }

    ngOnInit() {
        if (this.article.imageURL && (this.article.imageURL.indexOf('youtube') !== -1 || this.article.imageURL.indexOf('twitch') !== -1)) {
            this.CONTENT = this.sanitizer.bypassSecurityTrustHtml(`<iframe src="${this.article.imageURL}" allowfullscreen></iframe>${this.article.content}`);
        } else if (this.article.imageURL) {
            this.CONTENT = this.sanitizer.bypassSecurityTrustHtml(`<img src="${this.article.imageURL.indexOf('http') !== -1 ? this.article.imageURL : 'assets/images/' + this.article.imageURL}">${this.article.content}`);
        } else {
            this.CONTENT = this.sanitizer.bypassSecurityTrustHtml(this.article.content);
        }

        this.cdRef.detectChanges();
        this.initTextCardHover();
    }
}
