import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class InfiniteScrollService {

    private scrollLimitSource = new Subject<void>();
    scrollLimitReached = this.scrollLimitSource.asObservable();

    constructor(@Inject(DOCUMENT) private doc: Document) {
        this.setScrollLimitReached();
        document.addEventListener('scroll', () => this.setScrollLimitReached())
    }

    setScrollLimitReached(): void {
        const totalHeight = document.documentElement.scrollHeight;
        const posTop = document.documentElement.scrollTop;
        const screenHeight = document.documentElement.clientHeight;
        const currentBottomPosition = posTop + screenHeight;
        if ((totalHeight - currentBottomPosition) < screenHeight) {
            this.scrollLimitSource.next();
        }
    }
}
