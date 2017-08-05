import { Injectable } from '@angular/core';

export class Player {
    constructor(public name: string, public stream: Stream, public image: string, public game: string) {
    }
}

export class Stream {
    constructor(public game: string) {
    }
}

const TEAMS = [
    new Player('Cipher', new Stream('Hearthstone'), 'Cipher.jpg', 'Hearthstone'),
    new Player('Rosh', new Stream('Gwent'), 'Rosh.jpg', 'Gwent'),
    new Player('Cipher', new Stream('Hearthstone'), 'Cipher.jpg', 'Hearthstone'),
    new Player('Rosh', new Stream('Gwent'), 'Rosh.jpg', 'Gwent'),
    new Player('Cipher', new Stream('Hearthstone'), 'Cipher.jpg', 'Hearthstone'),
    new Player('Rosh', null, 'Rosh.jpg', 'Gwent'),
    new Player('Cipher', new Stream('Hearthstone'), 'Cipher.jpg', 'Hearthstone'),
    new Player('Rosh', new Stream('Gwent'), 'Rosh.jpg', 'Gwent'),
    new Player('Cipher', new Stream('Hearthstone'), 'Cipher.jpg', 'Hearthstone'),
    new Player('Rosh', new Stream('Gwent'), 'Rosh.jpg', 'Gwent'),
    new Player('Cipher', new Stream('Hearthstone'), 'Cipher.jpg', 'Hearthstone'),
    new Player('Rosh', null, 'Rosh.jpg', 'Gwent')
];

const teamsPromise = Promise.resolve(TEAMS);

@Injectable()
export class TeamsService {
    getPlayers() {
        return teamsPromise;
    }

    getPlayer(params: any) {
        return teamsPromise
            .then((players: Player[]) => players.find(player => player.name === params));
    }
}
