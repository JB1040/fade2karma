import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {GoogleAnalyticsEventsService} from './google-analytics-events.service';

@Component({
    selector: 'f2kApp',
    template: `
        <f2kNavigation></f2kNavigation>
        <router-outlet></router-outlet>
        <div class="F2K-column">
            <f2kFooter></f2kFooter>
        </div>
    `,
})
export class AppComponent {
    constructor(public router: Router, public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
    }

    submitEvent() {
        this.googleAnalyticsEventsService.emitEvent('testCategory', 'testAction', 'testLabel', 0);
    }
}
