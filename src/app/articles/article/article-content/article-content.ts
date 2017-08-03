import { Author } from '../author/author';

export class ArticleContent {
    constructor(
        public title: string,
        public author: Author,
        public date: number,
        public rating: number,
        public content: string) {}
}

