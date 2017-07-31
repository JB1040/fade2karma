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
var content_service_1 = require("./content.service");
var ContentListComponent = (function () {
    function ContentListComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    ContentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.content = this.route.params
            .switchMap(function (params) {
            //this.selectedId = +params['id'];
            return _this.service.getContent();
        });
    };
    return ContentListComponent;
}());
ContentListComponent = __decorate([
    core_1.Component({
        template: "\n    <h2>HEROES</h2>\n    <ul class=\"items\">\n      <li *ngFor=\"let intContent of content | async\">\n        <span class=\"badge\">{{ intContent.id }}</span> {{ intContent.name }}\n      </li>\n    </ul>\n  "
    }),
    __metadata("design:paramtypes", [content_service_1.ContentService,
        router_1.ActivatedRoute,
        router_1.Router])
], ContentListComponent);
exports.ContentListComponent = ContentListComponent;
//        (click)="onSelect(intContent)">
//# sourceMappingURL=content-list.component.js.map