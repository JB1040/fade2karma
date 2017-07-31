"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var teams_component_1 = require("./teams.component");
var team_component_1 = require("./team.component");
var player_component_1 = require("./player.component");
var player_1 = require("./player");
//import { HeroDetailComponent } from './content-detail';
var teams_service_1 = require("./teams.service");
var teams_routing_module_1 = require("./teams-routing.module");
var TeamsModule = (function () {
    function TeamsModule() {
    }
    return TeamsModule;
}());
TeamsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            teams_routing_module_1.TeamsRoutingModule
        ],
        declarations: [
            teams_component_1.TeamsComponent,
            team_component_1.TeamComponent,
            player_component_1.PlayerComponent,
            player_1.PlayerInstanceComponent
        ],
        providers: [teams_service_1.TeamsService]
    })
], TeamsModule);
exports.TeamsModule = TeamsModule;
//# sourceMappingURL=teams.module.js.map