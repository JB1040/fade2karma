import {Component} from '@angular/core';

@Component({
    selector: 'f2kApp',
    template: `
        <f2kNavigation></f2kNavigation>
        <router-outlet></router-outlet>
    `,
})
export class AppComponent {

}
