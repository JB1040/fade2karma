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
var content_list_component_1 = require("./content-list.component");
//import { HeroDetailComponent } from './content-detail';
var content_service_1 = require("./content.service");
var content_routing_module_1 = require("./content-routing.module");
var ContentModule = (function () {
    function ContentModule() {
    }
    return ContentModule;
}());
ContentModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            content_routing_module_1.ContentRoutingModule
        ],
        declarations: [
            content_list_component_1.ContentListComponent,
        ],
        providers: [content_service_1.ContentService]
    })
], ContentModule);
exports.ContentModule = ContentModule;
//# sourceMappingURL=content.module.js.map