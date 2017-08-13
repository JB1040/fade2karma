import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'f2kHearthstoneFilter',
    templateUrl: './hsfilter.component.html',
    styleUrls: ['../app.component.css', './hsfilter.component.scss']
})
export class HearthstoneFilterComponent {

    classNames: Array<any>;
    // private activeClasses: Array<any>;
    activeClasses: any = [];
    activeMode = 'standard';

    constructor(private el: ElementRef) {
        this.classNames = [
            'DRUID',
            'HUNTER',
            'MAGE',
            'PALADIN',
            'PRIEST',
            'ROGUE',
            'SHAMAN',
            'WARLOCK',
            'WARRIOR'
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
