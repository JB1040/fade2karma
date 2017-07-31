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
var OnlineStreamerTileComponent = (function () {
    function OnlineStreamerTileComponent() {
    }
    return OnlineStreamerTileComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OnlineStreamerTileComponent.prototype, "streamer", void 0);
OnlineStreamerTileComponent = __decorate([
    core_1.Component({
        selector: 'onlineStreamerTile',
        template: " <!-- TODO actually functioning flexible width change from 300 px -->\n        <div class=\"row\" style=\"border: 1px solid gray; margin: 0; max-width: 300px; position: relative;\">\n            <a style=\"position: absolute; top: 0; bottom: 0; left: 0; right: 0\" href=\"{{streamer.twitch}}\" target=\"_blank\"></a> <!-- TODO FIX -->\n            <!-- TODO geting pictures deacently -->\n            <img class=\"img-circle\" src=\"app/teams/images/{{streamer.image}}\" style=\"width: 20%; margin: 20px; float: left\">\n            <div style=\"display: inline-block; font-size: 18px; margin: 8.4%; margin-left: 0; float: left\">\n                <div>{{streamer.name}}</div>\n                <div>\n                    <div style=\"display: inline-block\">Live</div>\n                    <div style=\"display: inline-block; width: 10px; height: 10px; background-color: red; border-radius: 50%;\"></div>\n                    <div style=\"display: inline-block\">{{streamer.game}}</div>\n                </div>\n            </div>\n        </div>\n    "
    })
], OnlineStreamerTileComponent);
exports.OnlineStreamerTileComponent = OnlineStreamerTileComponent;
//# sourceMappingURL=online-streamer-tile.component.js.map