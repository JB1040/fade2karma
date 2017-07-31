export class DeckHs {
    constructor(public title: string,
                public image: string,
                public type: string,
                public author: string,
                public date: number,
                public contentType: string,
                public description: string,
                public dust: number,
                public gameMode: any, // TODO not sure what will be the type string or enum I guess... ( Standard / Wild )
                public hero: any, // Class // TODO not sure what will be the type string or enum I guess... ( Warrior, Shaman, Rogue, Paladin, Hunter, Druid, Warlock, Mage, Priest )
                public tier: number) {
    }
}
