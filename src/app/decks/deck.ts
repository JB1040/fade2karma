import { Author } from '../articles/article/author/author';
import Card from '../card';

export type HeroClasses = 'DRUID' | 'MAGE' | 'WARRIOR' | 'WARLOCK' | 'WARLOCK' | 'PALADIN' | 'HUNTER' | 'SHAMAN' | 'ROGUE';

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
                public heroClass: HeroClasses,
                public date: number,
                public editDate: number,
                public tier: number,
                public code: any,
                public dust?: number) {
    }
}
