import { Author } from '../author/author';

export class ArticleContent {
    constructor(
        public title: string,
        public author: Author,
        public date: Date,
        public rating: number,
        public content: string) {}

        // Returns an article object with builtin types of members
        public getArticle() {
          return {
            'title': this.title,
            'author': this.author.username,
            'date': this.date.getTime()
          };
        }
}

