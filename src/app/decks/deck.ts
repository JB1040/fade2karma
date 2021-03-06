import { Author } from '../articles/article/author/author';
import Card from '../card';
import { Extend } from '../core/globals';
import { Article } from '../articles/article';

export const HeroClassesArr: Array<HeroClasses> = [
    'DRUID',
    'HUNTER',
    'MAGE',
    'PALADIN',
    'PRIEST',
    'ROGUE',
    'SHAMAN',
    'WARLOCK',
    'WARRIOR'
];

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
export type GwentLeaderName =
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

export class GwentLeader {
    name: GwentLeaderName;
    strength: number;
    text: string;
    cardId: string;
    rarity: string;
}

export class DeckObj {
    id: number;
    name: string;
    code: string;
    cards: Array<Card>;
    mode: Modes;
    isStandard: boolean;
    heroClass: HeroClasses;

    dust?: number;
}

export class Deck {
    id: number;
    authorID: number;
    author: Author;
    title: string;
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
    decks: Array<DeckObj>;
    difficulty: Difficulty;
    recommended: Array<Article>;
    similar: Array<Deck>;

    leader: GwentLeader;
    faction: GwentFactions;

    constructor(jsonData: any) {
        Extend(this, jsonData);
    }
}

export class TopLegendDeck extends Deck {
    server: Servers;
    rank: number;
    player: string;
    deck: DeckObj
}

enum Servers {
    NorthAmerica = 'NA',
    Europe = 'EU',
    Asia = 'ASIA'
}

enum Difficulty {
    easy = 'EASY',
    medium = 'MEDIUM',
    hard = 'HARD'
}
