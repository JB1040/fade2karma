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
var TeamsComponent = (function () {
    function TeamsComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    TeamsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.teams = this.route.params
            .switchMap(function (params) {
            return _this.service.getTeams();
        });
    };
    TeamsComponent.prototype.navigateLink = function (URL) {
        window.open(URL, "_blank");
    };
    TeamsComponent.prototype.navigate = function (team, player) {
        if (player === void 0) { player = ''; }
        this.router.navigate(['/teams/' + team.toLowerCase() + '/' + player]);
        return false;
    };
    return TeamsComponent;
}());
TeamsComponent = __decorate([
    core_1.Component({
        template: "\n        <ul class=\"items\">\n            <li class=\"card-group\" *ngFor=\"let team of teams | async\">\n                <h1 (click)=\"navigate(team.name)\" class=\"name\">{{team.name}}</h1>\n                <ul>\n                    <li *ngFor=\"let player of team.players\" class=\"card\">\n                        <my-player [team]=\"team.name\" [player]=\"player\"></my-player>\n                    </li>\n                </ul>\n            </li>\n        </ul>\n  "
    }),
    __metadata("design:paramtypes", [teams_service_1.TeamsService,
        router_1.ActivatedRoute,
        router_1.Router])
], TeamsComponent);
exports.TeamsComponent = TeamsComponent;
//# sourceMappingURL=teams.component.js.map