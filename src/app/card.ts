import { Extend } from './core/globals';

export default class Card {
    public name: string; // combined HS & GWENT
    public flavor: string;
    public dbId: number;

    public artist: string; // HS
    public attack: number;
    public heroClass: string; // TODO enum
    public collectible: boolean;
    public cost: number;
    public health: number;
    public cardId: string;
    public set: string; // TODO enum
    public rarity: 'BASIC' | 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
    public type: string; /* TODO enum*/
    public amount: number;

    public categories: Array<string>; // GWENT
    public faction: string;
    public group: string;
    public info: string;
    public positions: Array<string>;
    public strength: number;
    // public variations: Array<{ availability: string, rarity: string }>;
    constructor(jsonData: any) {
        Extend(this, jsonData);
    }
}
