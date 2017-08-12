export default class Card {
    constructor(public artist: string,
                public attack: number,
                public heroClass: string, // TODO enum
                public collectible: boolean,
                public cost: number,
                public dbId: number,
                public flavor: string,
                public health: number,
                public cardId: string,
                public name: string,
                public set: string, // TODO enum
                public rarity: string, // TODO enum
                public type: string, /* TODO enum*/
                public repeats: boolean) {
    }
}
