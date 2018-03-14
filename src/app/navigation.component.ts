import { Subscription } from 'rxjs/Subscription';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavItem } from './navigation.service';
import { BASE_URL } from './core/globals';
import { HttpClient } from '@angular/common/http';
import { Article } from './articles/article';

@Component({
    selector: 'f2kNavigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit, OnDestroy {
    open: boolean;
    lastScrollTop: number;
    top: number;
    externals = ['Shop'];
    navItems: NavItem[] = [
        new NavItem('Tier List', []),
        new NavItem('Articles', []),
        new NavItem('Decklists', ['Top 25 Spotlight'/*, 'Hearthstone', 'Gwent'*/]),
        new NavItem('Giveaways', []),
        new NavItem('Team', []),
        new NavItem('Partners', []),
        new NavItem('Shop', [])
    ];
    subscriptions: Array<Subscription> = [];

    // TODO for preview, remove cleanly
    // @HostListener('window:scroll', ['$event']) scroll(event) {
    //     const st = window.pageYOffset || document.documentElement.scrollTop;
    //     if (st > this.lastScrollTop) {
    //         this.resetOpenItems();
    //         this.element.nativeElement.style.top = -this.getHeight() + 'px';
    //     } else {
    //         this.element.nativeElement.style.top = 0;
    //     }
    //     this.lastScrollTop = st;
    // }

    constructor(private route: ActivatedRoute,
                private router: Router,
                private element: ElementRef,
                private http: HttpClient) {
    }

    ngOnInit() {
        this.setFeatured();
    }

    toLink(url: string) {
        return url.replace(/ /g, '_').toLowerCase();
    }

    getOuterLink(url: string): string {
        if (url === 'Shop') {
            return 'https://teespring.com/stores/f2k-us';
        } else {
            return '';
        }
    }

    openInNewTab(url) {
        const win = window.open(url, '_blank');
        win.focus();
    }

    absoluteUrl(url: string): boolean {
        return this.externals.indexOf(url) !== -1;
    }

    resetOpenItems(currentNavItem?: NavItem) {
        this.open = false;
        this.navItems.forEach(navItem => {
            if (currentNavItem && currentNavItem.name === navItem.name) {
                return;
            }
            navItem.open = false;
        });
    }

    getHeight() {
        if (this.element.nativeElement.querySelector('.nav-column').offsetWidth < 728) {
            return this.element.nativeElement.querySelector('.nav-column').offsetHeight;
        }
        return this.element.nativeElement.querySelector('.nav-column').offsetHeight;
    }

    isActive(name: string) {
        let currentRoute: string | string[] = this.router.url;
        currentRoute = currentRoute.split('/');
        return currentRoute[currentRoute.length - 1] === this.toLink(name);
    }

    getChildIcon(child: string): string {
        if (child === 'Top 25 Spotlight') {
            return `assets/icons/rank.png`;
        } else {
            return `assets/images/${child}.svg`;
        }
    }

    setFeatured(): void { // TODO move in service, handle errors in case they take place...
        const amount = 2;
        const offset = 0;
        const type = 'GIVEAWAYS';
        this.subscriptions.push(this.http.get<Array<Article>>(`${BASE_URL}/api/articles/list?amount=${amount}&offset=${offset}&type=${type}`).subscribe(articles => {
            for (let i = 0, ii = this.navItems.length; i < ii; i++) {
                if (this.navItems[i].name === 'Giveaways') {
                    switch (articles.length) {
                        case 0:
                            this.navItems.splice(i, 1);
                            break;
                        case 1:
                            this.navItems[i].name = 'Giveaway';
                    }

                    break;
                }
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
