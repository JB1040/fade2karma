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
var TeamComponent = (function () {
    function TeamComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    TeamComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.route.snapshot.url[1].path, '___');
        this.route.params
            .switchMap(function (params) { return _this.service.getTeam(params['name']); })
            .subscribe(function (team) { return _this.team = team; });
    };
    TeamComponent.prototype.navigateLink = function (URL) {
        window.open(URL, '_blank');
    };
    return TeamComponent;
}());
TeamComponent = __decorate([
    core_1.Component({
        template: "\n        <div *ngIf=\"team\" class=\"card-group\">\n            <h1 class=\"name\">{{team.name}}</h1>\n            <ul class=\"items\">\n                <li *ngFor=\"let player of team.players\" class=\"card\">\n                    <my-player [team]=\"team.name\" [player]=\"player\"></my-player>\n                </li>\n            </ul>\n        <div>\n  "
    }),
    __metadata("design:paramtypes", [teams_service_1.TeamsService,
        router_1.ActivatedRoute,
        router_1.Router])
], TeamComponent);
exports.TeamComponent = TeamComponent;
//# sourceMappingURL=team.component.js.map