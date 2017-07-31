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
var sponsor_component_1 = require("./sponsor.component");
//import { HeroDetailComponent } from './content-detail';
var contentRoutes = [
    { path: 'sponsors', component: sponsor_component_1.SponsorsComponent }
];
var SponsorRoutingModule = (function () {
    function SponsorRoutingModule() {
    }
    return SponsorRoutingModule;
}());
SponsorRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(contentRoutes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], SponsorRoutingModule);
exports.SponsorRoutingModule = SponsorRoutingModule;
//# sourceMappingURL=sponsor-routing.module.js.map