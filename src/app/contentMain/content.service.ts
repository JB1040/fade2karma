import { Injectable } from '@angular/core';

export class Content {
constructor(public id: number, public name: string) { }
}

let CONTENT = [
    new Content(11, 'Mr. Nice'),
    new Content(12, 'Narco'),
    new Content(13, 'Bombasto'),
    new Content(14, 'Celeritas'),
    new Content(15, 'Magneta'),
    new Content(16, 'RubberMan')
];

let contentPromise = Promise.resolve(CONTENT);

@Injectable()
export class ContentService {
    getContent() { return contentPromise; }

    getHero(id: number | string) {
        return contentPromise
            .then(content => content.find(content => content.id === +id));
    }
}
