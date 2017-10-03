import { Component, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'f2kHearthstoneFilter',
    templateUrl: './hsfilter.component.html',
    styleUrls: ['../app.component.css', './hsfilter.component.css']
})
export class HearthstoneFilterComponent {

    classNames: Array<any>;
    // private activeClasses: Array<any>;
    activeClasses: any = [];
    activeMode = 'STANDARD';

    @Output() activeClassesChange = new EventEmitter<Array<any>>();
    @Output() activeModeChange = new EventEmitter<string>();

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
        this.activeClassesChange.emit(this.activeClasses);
    }

    toggleActiveMode(modeType) {
        this.activeMode = modeType;
        this.activeModeChange.emit(this.activeMode);
    }

    // hoverOver(name) {
    //     this.el.nativeElement.class = 'banana';
    // }

}
