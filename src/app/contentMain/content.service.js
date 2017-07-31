"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Content = (function () {
    function Content(id, name) {
        this.id = id;
        this.name = name;
    }
    return Content;
}());
exports.Content = Content;
var CONTENT = [
    new Content(11, 'Mr. Nice'),
    new Content(12, 'Narco'),
    new Content(13, 'Bombasto'),
    new Content(14, 'Celeritas'),
    new Content(15, 'Magneta'),
    new Content(16, 'RubberMan')
];
var contentPromise = Promise.resolve(CONTENT);
var ContentService = (function () {
    function ContentService() {
    }
    ContentService.prototype.getContent = function () { return contentPromise; };
    ContentService.prototype.getHero = function (id) {
        return contentPromise
            .then(function (content) { return content.find(function (content) { return content.id === +id; }); });
    };
    return ContentService;
}());
ContentService = __decorate([
    core_1.Injectable()
], ContentService);
exports.ContentService = ContentService;
//# sourceMappingURL=content.service.js.map