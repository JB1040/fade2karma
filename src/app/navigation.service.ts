import {Injectable} from '@angular/core';

export class NavItem {
  constructor(public name: string, public children: string[], public open?: boolean) {
  }
}

const NAVIGATION = [
    new NavItem('GUIDE', ['HEARTHSTONE', 'GWENT']),
    new NavItem('Sponsors', []),
    new NavItem('Teams', ['Hearthstone', 'Overwatch'])
];

const navigationPromise = Promise.resolve(NAVIGATION);

@Injectable()
export class NavigationService {
  getNavBar() {
    return navigationPromise;
  }
}
