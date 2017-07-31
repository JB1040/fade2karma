import { Component, Input } from '@angular/core';

@Component({
    selector: 'f2kHearthstoneMana',
    templateUrl: './hsmana.component.html',
    styleUrls: ['../app.component.css', './hsmana.component.scss']
})
export class HearthstoneManaComponent {
    @Input() private chartData: Array<any>;
}
