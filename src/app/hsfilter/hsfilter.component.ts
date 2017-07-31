import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'f2kHearthstoneFilter',
    templateUrl: './hsfilter.component.html',
    styleUrls: ['../app.component.css', './hsfilter.component.scss']
})
export class HearthstoneFilterComponent {

    private classNames: Array<any>;
    // private activeClasses: Array<any>;
    private activeClasses: any = [];
    private activeMode = 'standard';

    constructor(private el: ElementRef) {
        this.classNames = [
            'druid',
            'hunter',
            'mage',
            'paladin',
            'priest',
            'rogue',
            'shaman',
            'warlock',
            'warrior'
        ];
    }

    toggleActiveClass(classType) {
        const index = this.activeClasses.indexOf(classType);
        if (index >= 0) {
            this.activeClasses.splice(index, 1);
            // do something complicated
        } else {
            this.activeClasses.push(classType);
        }
    }

    toggleActiveMode(modeType) {
        this.activeMode = modeType;
    }

    // hoverOver(name) {
    //     this.el.nativeElement.class = 'banana';
    // }

}
