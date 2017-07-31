import { Injectable } from '@angular/core';

export class Team {
    constructor(public name: string, public players: Player[]) { }
}

export class Player {
    constructor(public name: string, public description: string, public image: string, public twitch: string,
                public twitter: string, public instagram: string, public facebook: string) {
    }
}

let TEAMS = [
    new Team('Hearthstone', [
        new Player('cipher1', 'Top 8 Dreamhack Winter, Vulcan 100k Deckmasters, Gfinity Summer Masters ll,' +
            ' 2nd place Vulcan Deckmasters & 1st place Malaga HS Intel cup 2015, 2nd StarLadder StarSeries' +
            ' i-League 2016', 'Cipher.jpg', 'https://www.twitch.tv/cipherhs', 'https://twitter.com/F2K_Cipher', '', ''),
        new Player('cipher2', 'Top 8 Dreamhack Winter, Vulcan 100k Deckmasters, Gfinity Summer Masters ll, 2nd place ' +
            'Vulcan Deckmasters & 1st place Malaga HS Intel cup 2015, 2nd StarLadder StarSeries i-League 2016',
            'Cipher.jpg', 'https://www.twitch.tv/cipherhs', 'https://twitter.com/F2K_Cipher', '', ''),
        new Player('cipher3', 'Top 8 Dreamhack Winter, Vulcan 100k Deckmasters, Gfinity Summer Masters ll, 2nd place ' +
            'Vulcan Deckmasters & 1st place Malaga HS Intel cup 2015, 2nd StarLadder StarSeries i-League 2016',
            'Cipher.jpg', 'https://www.twitch.tv/cipherhs', 'https://twitter.com/F2K_Cipher', '', '')
    ]),
    new Team('Overwatch', [
        new Player('OkayitsRosh', `Hey everyone! I’m Elizabeth (often Liz for short), and I go by “Rosh” online.
         I am a lifetime gamer of 22 years who’s recently moved to southern California from my home state of Florida.
While I’ve had a lifelong attachment to gaming in all forms, my first encounter with Twitch came while I was playing
 Star Wars: The Old Republic. I checked out the stream of a fellow player (whom I am now dating), and this eventually
  led to me streaming the game myself. My love for everything Star Wars, however, could not endure the death knell of
   that game, and I started streaming much more religiously when Overwatch was released. As is the stereotype for girl
    gamers, I love to heal, and I principally play the character Mercy, a mobile and dedicated healer.

The greatest joy I get out of streaming – of bringing my personality and my gameplay to you, the viewer – is being able
 to interact and connect with every single person in my stream. I strive to maintain a deeply social community-oriented
  stream around which I can build more than just a collection of gamers, but a family of sorts.

So I implore you to check out my stream and please be sure to say hello! I would love to get a chance to meet each and
 every one of you.`, 'Rosh.jpg', 'https://www.twitch.tv/okayitsrosh', 'https://twitter.com/F2K_OkayItsRosh',
            'https://www.instagram.com/F2K_Rosh/', ''),
    ])
];

let teamsPromise = Promise.resolve(TEAMS);

@Injectable()
export class TeamsService {
    getTeams() { return teamsPromise; }

    getTeam(name: string) {
        console.log(name);
        return teamsPromise
            .then(teams => teams.find(team => team.name.toLowerCase() === name));
    }

    getPlayer(params: any) {
        return teamsPromise
            .then(teams => this.findPlayer(teams, params));
    }

    findPlayer(teams: any, params: any): any{
        console.log(params, teams);
        console.log();
        for (let x = 0; x < teams.length; x++) {
            if (teams[x].name.toLowerCase() === params[1].path) {
                for (let y = 0; y < teams[x].players.length; y++) {
                    if (teams[x].players[y].name.toLowerCase() === params[2].path) {
                        return teams[x].players[y];
                    }
                }
            }
        }
    }
}
