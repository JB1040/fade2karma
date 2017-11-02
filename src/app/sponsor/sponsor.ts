import { Extend } from '../core/globals';

export class Sponsor {
    imageURL: string;
    link: Link;
    links: Array<Link> = [];

    constructor(data: any) {
        Extend(this, data);
        if (data.links) {
            this.links = this.links.map(link => new Link(link));
        }
    }
}

export class Link {
    url: string;
    icon: string;

    constructor(data: any) {
        Extend(this, data);
    }
}
