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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var sponsor_service_1 = require("./sponsor.service");
var SponsorsComponent = (function () {
    function SponsorsComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    SponsorsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sponsors = this.route.params
            .switchMap(function (params) {
            return _this.service.getSponsors();
        });
    };
    SponsorsComponent.prototype.navigateLink = function (URL) {
        window.open(URL, "_blank");
    };
    return SponsorsComponent;
}());
SponsorsComponent = __decorate([
    core_1.Component({
        template: "\n        <ul class=\"items\">\n            <li *ngFor=\"let sponsor of sponsors | async\">\n\n                <img src=\"app/sponsors/images/{{sponsor.image}}\" (click)=\"navigateLink(sponsor.home)\"/>\n\n                <p>{{sponsor.description}}</p>\n\n                <a *ngIf=\"sponsor.home\" (click)=\"navigateLink(sponsor.home)\">\n                    <span class=\"fa-stack fa-lg\">\n                        <i class=\"fa fa-square-o fa-stack-2x\"></i>\n                        <i class=\"fa fa-home fa-stack-1x\"></i>\n                    </span>\n                </a>\n\n                <a *ngIf=\"sponsor.twitter\" (click)=\"navigateLink(sponsor.twitter)\">\n                    <span class=\"fa-stack fa-lg\">\n                        <i class=\"fa fa-square-o fa-stack-2x\"></i>\n                        <i class=\"fa fa-twitter fa-stack-1x\"></i>\n                    </span>\n                </a>\n\n                <a *ngIf=\"sponsor.facebook\" (click)=\"navigateLink(sponsor.facebook)\">\n                    <span class=\"fa-stack fa-lg\">\n                        <i class=\"fa fa-square-o fa-stack-2x\"></i>\n                        <i class=\"fa fa-facebook fa-stack-1x\"></i>\n                    </span>\n                </a>\n\n            </li>\n        </ul>\n  "
    }),
    __metadata("design:paramtypes", [sponsor_service_1.SponsorService,
        router_1.ActivatedRoute,
        router_1.Router])
], SponsorsComponent);
exports.SponsorsComponent = SponsorsComponent;
//# sourceMappingURL=sponsor.component.js.map