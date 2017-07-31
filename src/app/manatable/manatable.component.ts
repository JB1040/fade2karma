import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-manatable',
    templateUrl: './manatable.component.html',
    styleUrls: ['../app.component.css', './manatable.component.scss']
})
export class ManatableComponent {
    @Input() private data: Array<any>;
}
