import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {GoogleAnalyticsEventsService} from './google-analytics-events.service';
import { HoverService } from './core/hover.service';
import { HtmlHovererComponent } from './html-hoverer/html-hoverer.component';

@Component({
    selector: 'f2kApp',
    template: `
        <f2kNavigation></f2kNavigation>
        <router-outlet></router-outlet>
        <div class="F2K-column">
            <f2kFooter></f2kFooter>
        </div>

        <f2kHtmlHoverer #htmlHover [htmlString]="displayedCard" [height]="400" [width]="300"></f2kHtmlHoverer>
    `,
})
export class AppComponent implements AfterViewInit {

    @ViewChild('htmlHover') htmlHover: HtmlHovererComponent;

    displayedCard: string | void;

    constructor(public router: Router, public googleAnalyticsEventsService: GoogleAnalyticsEventsService, private hoverService: HoverService) {
        hoverService.hoveredCard.subscribe(displayedCard => this.displayedCard = displayedCard);
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.displayedCard = null;
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
    }

    ngAfterViewInit(): void {
        this.hoverService.setHtmlHover(this.htmlHover);
    }

    submitEvent() {
        this.googleAnalyticsEventsService.emitEvent('testCategory', 'testAction', 'testLabel', 0);
    }
}
