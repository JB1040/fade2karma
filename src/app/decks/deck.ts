import { Author } from '../articles/article/author/author';
import Card from '../card';
import { Extend } from '../core/globals';

export type HeroClasses = 'DRUID' | 'MAGE' | 'WARRIOR' | 'WARLOCK' | 'WARLOCK' | 'PALADIN' | 'HUNTER' | 'SHAMAN' | 'ROGUE';

export class Deck {
    id: number;
    author: Author;
    title: string;
    cards: Card[];
    content: string;
    game: string; // TODO enum
    published: boolean;
    rating: number;
    mode: string; // TODO enum 'CON', 'ARENA', 'BRAWL'
    isStandard: boolean;
    imageURL: string;
    heroClass: HeroClasses;
    date: number;
    editDate: number;
    tier: number;
    code: any;
    dust?: number;

    constructor(jsonData: any) {
        Extend(this, jsonData);
    }
}
