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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/interval");
var OnlineStreamerScrollComponent = (function () {
    function OnlineStreamerScrollComponent(el) {
        this.el = el;
        this.margin = 0;
        this.position = 0;
        this.tileWidth = 300;
        this.moved = 0;
        this.shownTileCount = 0;
        this.onlineStreamers = [{
                name: 'Cipher',
                game: 'Hearthstone',
                image: 'Cipher.jpg',
                twitch: 'https://www.twitch.tv/cipherhs'
            }, {
                name: 'Cipher',
                game: 'Hearthstone',
                image: 'Cipher.jpg',
                twitch: 'https://www.twitch.tv/cipherhs'
            }, {
                name: 'Cipher',
                game: 'Hearthstone',
                image: 'Cipher.jpg',
                twitch: 'https://www.twitch.tv/cipherhs'
            }, {
                name: 'Cipher',
                game: 'Hearthstone',
                image: 'Cipher.jpg',
                twitch: 'https://www.twitch.tv/cipherhs'
            }];
    }
    OnlineStreamerScrollComponent.prototype.resize = function () {
        this.setMargin();
    };
    OnlineStreamerScrollComponent.prototype.setMargin = function () {
        var compStyle = window.getComputedStyle(this.el.nativeElement.firstElementChild);
        var width = parseFloat(compStyle.width);
        this.shownTileCount = Math.floor(width / this.tileWidth);
        this.margin = ((width % this.tileWidth) / this.shownTileCount) / 2;
        this.position = this.moved * (this.tileWidth + this.margin * 2);
    };
    OnlineStreamerScrollComponent.prototype.scroll = function (direction) {
        // let totalWidth = this.onlineStreamers.length * (this.tileWidth + this.margin * 2);
        direction === 'left' ? --this.moved : ++this.moved;
        if (this.moved < 0) {
            this.moved = this.onlineStreamers.length - this.shownTileCount;
        }
        if (this.moved > this.onlineStreamers.length - this.shownTileCount) {
            this.moved = 0;
        }
        this.position = this.moved * (this.tileWidth + this.margin * 2);
    };
    OnlineStreamerScrollComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setMargin();
        this.timeoutScroll = Observable_1.Observable.interval(5000).subscribe(function () {
            _this.scroll();
            console.log('123');
        });
    };
    OnlineStreamerScrollComponent.prototype.ngOnDestroy = function () {
        this.timeoutScroll.unsubscribe();
    };
    return OnlineStreamerScrollComponent;
}());
__decorate([
    core_1.HostListener('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OnlineStreamerScrollComponent.prototype, "resize", null);
OnlineStreamerScrollComponent = __decorate([
    core_1.Component({
        selector: 'onlineSteamerScroll',
        template: "\n        <div style=\"overflow: hidden; margin: 0 -15px; position: relative\">\n            <button class=\"btn btn-default k-btn-scroll\" style=\"left: 0;\" (click)=\"scroll('left')\"\n                    *ngIf=\"onlineStreamers.length > shownTileCount\">\n                <i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>\n            </button>\n\n            <button class=\"btn btn-default k-btn-scroll\" style=\"right: 0;\" (click)=\"scroll('right')\"\n                    *ngIf=\"onlineStreamers.length > shownTileCount\">\n                <i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>\n            </button>\n\n            <div class=\"row\" style=\"overflow: hidden\"\n                 style=\"white-space: nowrap; margin: 0; min-width: 300px; transition: transform 800ms ease;\"\n                 [ngStyle]=\"{'transform': 'translate3d(-'+ position +'px, 0px, 0px)'}\">\n                <onlineStreamerTile *ngFor=\"let streamer of onlineStreamers\" style=\"display: inline-block;\"\n                                    [streamer]=\"streamer\"\n                                    [ngStyle]=\"{'margin-left.px': margin, 'margin-right.px': margin}\"></onlineStreamerTile>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], OnlineStreamerScrollComponent);
exports.OnlineStreamerScrollComponent = OnlineStreamerScrollComponent;
//# sourceMappingURL=online-streamer-scroll.component.js.map