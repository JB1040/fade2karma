"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var teams_component_1 = require("./teams.component");
var team_component_1 = require("./team.component");
var player_component_1 = require("./player.component");
var home_component_1 = require("../home/home.component");
var contentRoutes = [
    { path: 'team/:name', component: team_component_1.TeamComponent },
    { path: 'team/:name/:player', component: player_component_1.PlayerComponent },
    { path: 'team', component: teams_component_1.TeamsComponent },
    { path: '', component: home_component_1.HomePageComponent },
];
var TeamsRoutingModule = (function () {
    function TeamsRoutingModule() {
    }
    return TeamsRoutingModule;
}());
TeamsRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(contentRoutes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], TeamsRoutingModule);
exports.TeamsRoutingModule = TeamsRoutingModule;
//# sourceMappingURL=teams-routing.module.js.map