import { Author } from '../articles/article/author/author';
import Card from '../card';
import { Extend } from '../core/globals';

export type HeroClasses =
    'DRUID'
    | 'MAGE'
    | 'WARRIOR'
    | 'WARLOCK'
    | 'PRIEST'
    | 'PALADIN'
    | 'HUNTER'
    | 'SHAMAN'
    | 'ROGUE';
export type Modes = 'CON' | 'ARENA' | 'BRAWL';
export type Games = 'HS' | 'GWENT' | 'UNDEFINED';
export type GwentLeaders =
    'unseen-elder'
    | 'eredin'
    | 'dagon'
    | 'foltest'
    | 'hanslet'
    | 'radovid'
    | 'brouver-hoog'
    | 'eithne'
    | 'francesca'
    | 'crach-an-craite'
    | 'harald-the-cripple'
    | 'king-bran'
    | 'emhyr-var-emreis'
    | 'john-calveit'
    | 'morvran-voorhis';
export type GwentFactions = 'Monsters' | 'Northern Realms' | 'Scoia\'tael' | 'Skellige' | 'Nilfgaard';

export class Deck {
    id: number;
    author: Author;
    title: string;
    cards: Card[];
    content: string;
    game: Games;
    published: boolean;
    rating: number;
    mode: Modes;
    isStandard: boolean;
    imageURL: string;
    heroClass: HeroClasses;
    date: number;
    editDate: number;
    tier: number;
    code: any;

    leader: GwentLeaders;
    faction: GwentFactions;
    dust?: number;

    constructor(jsonData: any) {
        Extend(this, jsonData);
    }
}
