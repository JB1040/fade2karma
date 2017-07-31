"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Sponsor = (function () {
    function Sponsor(name, description, image, home, twitter, facebook) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.home = home;
        this.twitter = twitter;
        this.facebook = facebook;
    }
    return Sponsor;
}());
exports.Sponsor = Sponsor;
var SPONSORS = [
    new Sponsor('GoodGaming1', 'Good Gaming, Inc. is owner/operator of the world’s most scalable, automated tournament platform for eSports.  Additionally the company has deployed a social network for the world’s over 200 million amateur online gamers, giving them a destination site where they can interact, compete, learn, buy/sell/trade virtual goods and services, and hone their skills as they seek to move to the semi-pro or pro- levels.', 'GoodGaming.png', 'https://www.good-gaming.com/', 'https://twitter.com/goodgaminginc', 'https://www.facebook.com/goodgaminginc/'),
    new Sponsor('GoodGaming2', 'Good Gaming, Inc. is owner/operator of the world’s most scalable, automated tournament platform for eSports.  Additionally the company has deployed a social network for the world’s over 200 million amateur online gamers, giving them a destination site where they can interact, compete, learn, buy/sell/trade virtual goods and services, and hone their skills as they seek to move to the semi-pro or pro- levels.', 'GoodGaming.png', 'https://www.good-gaming.com/', '', 'https://www.facebook.com/goodgaminginc/'),
    new Sponsor('GoodGaming3', 'Good Gaming, Inc. is owner/operator of the world’s most scalable, automated tournament platform for eSports.  Additionally the company has deployed a social network for the world’s over 200 million amateur online gamers, giving them a destination site where they can interact, compete, learn, buy/sell/trade virtual goods and services, and hone their skills as they seek to move to the semi-pro or pro- levels.', 'GoodGaming.png', 'https://www.good-gaming.com/', 'https://twitter.com/goodgaminginc', ''),
];
var contentPromise = Promise.resolve(SPONSORS);
var SponsorService = (function () {
    function SponsorService() {
    }
    SponsorService.prototype.getSponsors = function () { return contentPromise; };
    return SponsorService;
}());
SponsorService = __decorate([
    core_1.Injectable()
], SponsorService);
exports.SponsorService = SponsorService;
//# sourceMappingURL=sponsor.service.js.map