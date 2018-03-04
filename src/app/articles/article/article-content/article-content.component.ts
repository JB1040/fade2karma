import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Article } from '../../article';
import { BASE_URL } from '../../../core/globals';
import { FacebookSkdService } from '../../../facebook-skd.service';
import { HoverService } from '../../../core/hover.service';
import { SpoilerService } from '../../../core/spoilers';
import { CopyDeckCodeService } from '../../../core/copy-deck-code.service';

@Component({
    selector: 'f2kArticleContent',
    templateUrl: './article-content.component.html',
    styleUrls: ['./article-content.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ArticleContentComponent implements OnInit {

    @Input() article: Article;
    CONTENT: any;
    facebookComments = false;
    showComments = false;
    previousSize: number;

    @ViewChild('contentContainer') contentContainer: ElementRef;
    @ViewChild('articleBody') articleBody: ElementRef;
    @ViewChild('recommendedTeaser') recommendedTeaser: ElementRef;
    @ViewChild('socialShare') socialShare: ElementRef;
    @ViewChild('commentContainer') commentContainer: ElementRef;

    constructor(private sanitizer: DomSanitizer,
                private facebookService: FacebookSkdService,
                private cdRef: ChangeDetectorRef,
                private hoverService: HoverService,
                private spoilerService: SpoilerService,
                private copyDeckCodeService: CopyDeckCodeService) {}

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
                this.commentContainer.nativeElement.innerHTML = `<div class="fb-comments" data-href="${BASE_URL}/articles/${this.article.id}" data-width="${this.previousSize}" data-numposts="5"></div>`;
                this.facebookService.fb.XFBML.parse(this.commentContainer.nativeElement);
            }
        }
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
        this.hoverService.initTextCardHover(this.contentContainer.nativeElement);
        this.spoilerService.initSpoilers(this.contentContainer.nativeElement);
        this.copyDeckCodeService.initDeckCodeCopy(this.contentContainer.nativeElement);
    }
}
