import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { HeroClasses, HeroClassesArr } from '../decks/deck';

@Component({
    selector: 'f2kHearthstoneFilter',
    templateUrl: './hsfilter.component.html',
    styleUrls: ['../app.component.css', './hsfilter.component.css']
})
export class HearthstoneFilterComponent {

    classNames = HeroClassesArr;

    @Input() activeClasses: any = [];

    @Output() activeClassesChange = new EventEmitter<Array<any>>();

    constructor(private el: ElementRef) {}

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

    isInactive(className: HeroClasses): boolean {
        return this.activeClasses.length > 0 && !this.activeClasses.includes(className);
    }

    // hoverOver(name) {
    //     this.el.nativeElement.class = 'banana';
    // }

}
