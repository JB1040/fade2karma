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
var PlayerInstanceComponent = (function () {
    function PlayerInstanceComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    PlayerInstanceComponent.prototype.navigateLink = function (URL) {
        window.open(URL, '_blank');
    };
    PlayerInstanceComponent.prototype.navigate = function (team, player) {
        if (player === void 0) { player = ''; }
        this.router.navigate(['/teams/' + team.toLowerCase() + '/' + player.toLowerCase()]);
        return false;
    };
    return PlayerInstanceComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PlayerInstanceComponent.prototype, "team", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", teams_service_1.Player)
], PlayerInstanceComponent.prototype, "player", void 0);
PlayerInstanceComponent = __decorate([
    core_1.Component({
        selector: 'my-player',
        template: "\n                <img class=\"player-image img-rounded\" src=\"app/teams/images/{{player.image}}\" (click)=\"navigate(team, player.name)\"/>\n\n                <h3 class=\"name\" style=\"position: absolute; top: 200px; color: white; width: 100%\">{{player.name}}</h3>\n\n                <p class=\"description\" style=\"height: 65px\">{{player.description}}</p>\n\n                <a *ngIf=\"player.twitch\" (click)=\"navigateLink(player.twitch)\">\n                    <span class=\"fa-stack fa-lg\">\n                        <i class=\"fa fa-square-o fa-stack-2x\"></i>\n                        <i class=\"fa fa-twitch fa-stack-1x\"></i>\n                    </span>\n                </a>\n\n                <a *ngIf=\"player.twitter\" (click)=\"navigateLink(player.twitter)\">\n                    <span class=\"fa-stack fa-lg\">\n                        <i class=\"fa fa-square-o fa-stack-2x\"></i>\n                        <i class=\"fa fa-twitter fa-stack-1x\"></i>\n                    </span>\n                </a>\n\n                <a *ngIf=\"player.instagram\" (click)=\"navigateLink(player.instagram)\">\n                    <span class=\"fa-stack fa-lg\">\n                        <i class=\"fa fa-square-o fa-stack-2x\"></i>\n                        <i class=\"fa fa-instagram fa-stack-1x\"></i>\n                    </span>\n                </a>\n\n                <a *ngIf=\"player.facebook\" (click)=\"navigateLink(player.facebook)\">\n                    <span class=\"fa-stack fa-lg\">\n                        <i class=\"fa fa-square-o fa-stack-2x\"></i>\n                        <i class=\"fa fa-facebook fa-stack-1x\"></i>\n                    </span>\n                </a>\n  "
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router])
], PlayerInstanceComponent);
exports.PlayerInstanceComponent = PlayerInstanceComponent;
//# sourceMappingURL=player.js.map