import { Author } from './article/author/author';

export class Article {
    constructor(public id: number,
                public author: Author,
                public title: string,
                public imageURL: string,
                public content: string,
                public game: string, // TODO enum
                public articleType: string, // TODO enum
                public published: boolean,
                public rating: number,
                public date: number,
                public editDate: number) {
    }
}
