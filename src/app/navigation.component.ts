import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService, NavItem } from './navigation.service';

@Component({
    selector: 'f2kNavigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {
    open: boolean;
    lastScrollTop: number;
    top: number;
    navItems: NavItem[] = [
        new NavItem('Decklists', ['Hearthstone', 'Gwent']),
        new NavItem('Tier List', []),
        new NavItem('Articles', []),
        new NavItem('Giveaway', []),
        new NavItem('Team', []),
        new NavItem('Sponsors', []),
        new NavItem('Shop', [])
    ];

    @HostListener('window:scroll', ['$event']) scroll(event) {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > this.lastScrollTop) {
            this.resetOpenItems();
            this.element.nativeElement.style.top = -this.getHeight() + 'px';
        } else {
            this.element.nativeElement.style.top = 0;
        }
        this.lastScrollTop = st;
    }

    constructor(private service: NavigationService,
                private route: ActivatedRoute,
                private router: Router,
                private element: ElementRef) {
    }

    toLink(url: string) {
        return url.replace(/ /g, '_').toLowerCase();
    }

    resetOpenItems() {
        this.open = false;
        this.navItems.forEach(navItem => navItem.open = false);
    }

    getHeight() {
        console.log(this.element.nativeElement.querySelector('.nav-column').offsetWidth);
        if (this.element.nativeElement.querySelector('.nav-column').offsetWidth < 728) { // @
            return this.element.nativeElement.querySelector('.nav-column').offsetHeight;
        }
        return this.element.nativeElement.querySelector('.nav-column').offsetHeight + this.element.nativeElement.querySelector('.dropdown-menu').offsetHeight;
    }

    // getNavHeight() {
    //     return this.element.nativeElement.querySelector('.navbar-collapse').heght;
    // }

    isActive(name: string) {
        let currentRoute: string | string[] = this.router.url;
        currentRoute = currentRoute.split('/');
        return currentRoute[currentRoute.length - 1] === this.toLink(name);
    }
}
