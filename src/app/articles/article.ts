export class Article {
    constructor(
        public title: string,
        public image: string,
        public type: string,
        public author: string,
        public date: number,
        public contentType: string,
        public description: string,
        public video: boolean) {}
}
