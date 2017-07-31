"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Team = (function () {
    function Team(name, players) {
        this.name = name;
        this.players = players;
    }
    return Team;
}());
exports.Team = Team;
var Player = (function () {
    function Player(name, description, image, twitch, twitter, instagram, facebook) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.twitch = twitch;
        this.twitter = twitter;
        this.instagram = instagram;
        this.facebook = facebook;
    }
    return Player;
}());
exports.Player = Player;
var TEAMS = [
    new Team('Hearthstone', [
        new Player('cipher1', 'Top 8 Dreamhack Winter, Vulcan 100k Deckmasters, Gfinity Summer Masters ll,' +
            ' 2nd place Vulcan Deckmasters & 1st place Malaga HS Intel cup 2015, 2nd StarLadder StarSeries' +
            ' i-League 2016', 'Cipher.jpg', 'https://www.twitch.tv/cipherhs', 'https://twitter.com/F2K_Cipher', '', ''),
        new Player('cipher2', 'Top 8 Dreamhack Winter, Vulcan 100k Deckmasters, Gfinity Summer Masters ll, 2nd place ' +
            'Vulcan Deckmasters & 1st place Malaga HS Intel cup 2015, 2nd StarLadder StarSeries i-League 2016', 'Cipher.jpg', 'https://www.twitch.tv/cipherhs', 'https://twitter.com/F2K_Cipher', '', ''),
        new Player('cipher3', 'Top 8 Dreamhack Winter, Vulcan 100k Deckmasters, Gfinity Summer Masters ll, 2nd place ' +
            'Vulcan Deckmasters & 1st place Malaga HS Intel cup 2015, 2nd StarLadder StarSeries i-League 2016', 'Cipher.jpg', 'https://www.twitch.tv/cipherhs', 'https://twitter.com/F2K_Cipher', '', '')
    ]),
    new Team('Overwatch', [
        new Player('OkayitsRosh', "Hey everyone! I\u2019m Elizabeth (often Liz for short), and I go by \u201CRosh\u201D online.\n         I am a lifetime gamer of 22 years who\u2019s recently moved to southern California from my home state of Florida.\nWhile I\u2019ve had a lifelong attachment to gaming in all forms, my first encounter with Twitch came while I was playing\n Star Wars: The Old Republic. I checked out the stream of a fellow player (whom I am now dating), and this eventually\n  led to me streaming the game myself. My love for everything Star Wars, however, could not endure the death knell of\n   that game, and I started streaming much more religiously when Overwatch was released. As is the stereotype for girl\n    gamers, I love to heal, and I principally play the character Mercy, a mobile and dedicated healer.\n\nThe greatest joy I get out of streaming \u2013 of bringing my personality and my gameplay to you, the viewer \u2013 is being able\n to interact and connect with every single person in my stream. I strive to maintain a deeply social community-oriented\n  stream around which I can build more than just a collection of gamers, but a family of sorts.\n\nSo I implore you to check out my stream and please be sure to say hello! I would love to get a chance to meet each and\n every one of you.", 'Rosh.jpg', 'https://www.twitch.tv/okayitsrosh', 'https://twitter.com/F2K_OkayItsRosh', 'https://www.instagram.com/F2K_Rosh/', ''),
    ])
];
var teamsPromise = Promise.resolve(TEAMS);
var TeamsService = (function () {
    function TeamsService() {
    }
    TeamsService.prototype.getTeams = function () { return teamsPromise; };
    TeamsService.prototype.getTeam = function (name) {
        console.log(name);
        return teamsPromise
            .then(function (teams) { return teams.find(function (team) { return team.name.toLowerCase() === name; }); });
    };
    TeamsService.prototype.getPlayer = function (params) {
        var _this = this;
        return teamsPromise
            .then(function (teams) { return _this.findPlayer(teams, params); });
    };
    TeamsService.prototype.findPlayer = function (teams, params) {
        console.log(params, teams);
        console.log();
        for (var x = 0; x < teams.length; x++) {
            if (teams[x].name.toLowerCase() === params[1].path) {
                for (var y = 0; y < teams[x].players.length; y++) {
                    if (teams[x].players[y].name.toLowerCase() === params[2].path) {
                        return teams[x].players[y];
                    }
                }
            }
        }
    };
    return TeamsService;
}());
TeamsService = __decorate([
    core_1.Injectable()
], TeamsService);
exports.TeamsService = TeamsService;
//# sourceMappingURL=teams.service.js.map