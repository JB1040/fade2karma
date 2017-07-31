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
var ArticlesTileComponent = (function () {
    function ArticlesTileComponent() {
    }
    return ArticlesTileComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ArticlesTileComponent.prototype, "article", void 0);
ArticlesTileComponent = __decorate([
    core_1.Component({
        selector: 'articlesTile',
        template: "\n    <a routerLink=\"\">\n        <div class=\"row\" style=\"width: 380px;\">\n            <div>\n                <div>\n                    <img href=\"app/teams/images/{{article.image}}\" style=\"width: 100%;\"></img>\n                </div>\n                <div style=\"border: 1px solid #cccccc; border-top: 0;\">\n                    <div class=\"\" style=\"\">{{article.type}}</div>\n                    <div class=\"\" style=\"\"></div>\n                    <div class=\"\" style=\"\"></div>\n                </div>\n            </div>\n        </div>\n    </a>\n    "
    })
], ArticlesTileComponent);
exports.ArticlesTileComponent = ArticlesTileComponent;
//# sourceMappingURL=article-tile.component.js.map