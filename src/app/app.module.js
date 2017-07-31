"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var content_module_1 = require("./contentMain/content.module");
var sponsor_module_1 = require("./sponsors/sponsor.module");
var teams_module_1 = require("./teams/teams.module");
var router_1 = require("@angular/router");
var page_not_found_component_1 = require("./page-not-found.component");
var navigation_component_1 = require("./navigation.component");
var navigation_service_1 = require("./navigation.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var home_component_1 = require("./home/home.component");
var online_streamer_tile_component_1 = require("./home/streams/online-streamer-tile.component");
var online_streamer_scroll_component_1 = require("./home/streams/online-streamer-scroll.component");
var myAppRoutes = [
    { path: '', component: page_not_found_component_1.PageNotFoundComponent },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            content_module_1.ContentModule,
            sponsor_module_1.SponsorModule,
            teams_module_1.TeamsModule,
            router_1.RouterModule.forRoot(myAppRoutes),
            ng_bootstrap_1.NgbModule.forRoot()
        ],
        declarations: [
            app_component_1.AppComponent,
            page_not_found_component_1.PageNotFoundComponent,
            navigation_component_1.NavigationComponent,
            home_component_1.HomePageComponent,
            online_streamer_tile_component_1.OnlineStreamerTileComponent,
            online_streamer_scroll_component_1.OnlineStreamerScrollComponent
        ],
        bootstrap: [
            app_component_1.AppComponent
        ],
        providers: [navigation_service_1.NavigationService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map