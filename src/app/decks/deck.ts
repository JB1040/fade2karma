import { Author } from '../articles/article/author/author';
import Card from '../card';

export class DeckHs {
    constructor(public title: string,
                public image: string,
                public type: string,
                public author: any,
                public date: number,
                public contentType: string,
                public description: string,
                public dust: number,
                public gameMode: any, // TODO not sure what will be the type string or enum I guess... ( Standard / Wild )
                public hero: any, // Class // TODO not sure what will be the type string or enum I guess... ( Warrior, Shaman, Rogue, Paladin, Hunter, Druid, Warlock, Mage, Priest )
                public tier: number) {
    }
}

export class Deck {
    constructor(public id: number,
                public author: Author,
                public title: string,
                public imageURL: string,
                public content: string,
                public game: string, // TODO enum
                public cards: Card[],
                public published: boolean,
                public rating: number,
                public heroClass: string, // TODO enum 'CON', 'ARENA', 'BRAWL'
                public isStandard: boolean,
                public gameMode: string, // TODO enum
                public date: number) {
    }
}
