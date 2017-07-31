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
var teams_service_1 = require("./teams.service");
var PlayerComponent = (function () {
    function PlayerComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    PlayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.route.snapshot.url[1].path, '---');
        this.route.params
            .switchMap(function (params) { return _this.service.getPlayer(_this.route.snapshot.url); })
            .subscribe(function (player) { return _this.player = player; });
    };
    PlayerComponent.prototype.navigateLink = function (URL) {
        window.open(URL, "_blank");
    };
    PlayerComponent.prototype.navigate = function (team, player) {
        if (player === void 0) { player = ''; }
        this.router.navigate(['/teams/' + team + '/' + player]);
        return false;
    };
    return PlayerComponent;
}());
PlayerComponent = __decorate([
    core_1.Component({
        template: "\n<div *ngIf=\"player\">\n       <h1 (click)=\"navigate(player.name)\">{{player.name}}</h1>\n        <div class=\"items\">\n                \n                    <img src=\"app/teams/images/{{player.image}}\" (click)=\"navigate(team.name, player.name)\"/>\n\n                    <p>{{player.description}}</p>\n\n                    <a *ngIf=\"player.twitch\" (click)=\"navigateLink(player.twitch)\">\n                        <span class=\"fa-stack fa-lg\">\n                            <i class=\"fa fa-square-o fa-stack-2x\"></i>\n                            <i class=\"fa fa-twitch fa-stack-1x\"></i>\n                        </span>\n                    </a>\n\n                    <a *ngIf=\"player.twitter\" (click)=\"navigateLink(player.twitter)\">\n                        <span class=\"fa-stack fa-lg\">\n                            <i class=\"fa fa-square-o fa-stack-2x\"></i>\n                            <i class=\"fa fa-twitter fa-stack-1x\"></i>\n                        </span>\n                    </a>\n\n                    <a *ngIf=\"player.instagram\" (click)=\"navigateLink(player.instagram)\">\n                        <span class=\"fa-stack fa-lg\">\n                            <i class=\"fa fa-square-o fa-stack-2x\"></i>\n                            <i class=\"fa fa-instagram fa-stack-1x\"></i>\n                        </span>\n                    </a>\n\n                    <a *ngIf=\"player.facebook\" (click)=\"navigateLink(player.facebook)\">\n                        <span class=\"fa-stack fa-lg\">\n                            <i class=\"fa fa-square-o fa-stack-2x\"></i>\n                            <i class=\"fa fa-facebook fa-stack-1x\"></i>\n                        </span>\n                    </a>\n            \n        </div>\n<div>\n  "
    }),
    __metadata("design:paramtypes", [teams_service_1.TeamsService,
        router_1.ActivatedRoute,
        router_1.Router])
], PlayerComponent);
exports.PlayerComponent = PlayerComponent;
//# sourceMappingURL=player.component.js.map