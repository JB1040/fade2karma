"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var navigation_service_1 = require("./navigation.service");
var NavigationComponent = (function () {
    function NavigationComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.navItems = [
            new navigation_service_1.NavItem('DECKLISTS', ['HEARTHSTONE', 'GWENT']),
            new navigation_service_1.NavItem('ARTICLES', []),
            new navigation_service_1.NavItem('TEAR LIST', []),
            new navigation_service_1.NavItem('GIVEAWAY', []),
            new navigation_service_1.NavItem('TEAM', []),
            new navigation_service_1.NavItem('SPONSORS', []),
        ];
    }
    NavigationComponent.prototype.navigate = function (url) {
        console.log(url);
        this.router.navigate(['/' + url.join('/').toLowerCase()]);
        return false;
    };
    NavigationComponent.prototype.myFun = function (theEv) {
        console.log(theEv);
    };
    NavigationComponent.prototype.preventDefault = function () {
        return false;
    };
    return NavigationComponent;
}());
NavigationComponent = __decorate([
    core_1.Component({
        selector: 'my-navigation',
        templateUrl: './app/navigation.component.html' // TODO FIX
    }),
    __metadata("design:paramtypes", [navigation_service_1.NavigationService,
        router_1.ActivatedRoute,
        router_1.Router])
], NavigationComponent);
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map