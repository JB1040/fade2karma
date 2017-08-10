// export class Author { // TODO rename changed names
//     constructor(public name: string,
//                 public game: string,
//                 public image: string,
//                 public twitch: string) {  }
// }
export class Author {
    constructor(public id: number,
                public username: string,
                public email: string,
                public game: string,
                // public imageURL: string,
                public stream: any, // TODO
                public createDate: number) {
    }
}
