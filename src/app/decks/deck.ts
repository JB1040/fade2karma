import { Author } from '../articles/article/author/author';
import Card from '../card';

export class Deck {
    constructor(public id: number,
                public author: Author,
                public title: string,
                public cards: Card[],
                public content: string,
                public game: string, // TODO enum
                public published: boolean,
                public rating: number,
                public mode: string, // TODO enum 'CON', 'ARENA', 'BRAWL'
                public isStandard: boolean,
                public imageURL: string,
                public heroClass: string, // TODO enum
                public date: number,
                public tier: number) {
    }
}
