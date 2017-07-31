import { Injectable } from '@angular/core';

export class Sponsor {
    constructor(public name: string, public description: string, public image: string, public home: string, public twitter: string, public facebook: string) { }
}

let SPONSORS = [
    new Sponsor('GoodGaming1', 'Good Gaming, Inc. is owner/operator of the world’s most scalable, automated tournament platform for eSports.  Additionally the company has deployed a social network for the world’s over 200 million amateur online gamers, giving them a destination site where they can interact, compete, learn, buy/sell/trade virtual goods and services, and hone their skills as they seek to move to the semi-pro or pro- levels.', 'GoodGaming.png', 'https://www.good-gaming.com/', 'https://twitter.com/goodgaminginc', 'https://www.facebook.com/goodgaminginc/'),
    new Sponsor('GoodGaming2', 'Good Gaming, Inc. is owner/operator of the world’s most scalable, automated tournament platform for eSports.  Additionally the company has deployed a social network for the world’s over 200 million amateur online gamers, giving them a destination site where they can interact, compete, learn, buy/sell/trade virtual goods and services, and hone their skills as they seek to move to the semi-pro or pro- levels.', 'GoodGaming.png', 'https://www.good-gaming.com/', '', 'https://www.facebook.com/goodgaminginc/'),
    new Sponsor('GoodGaming3', 'Good Gaming, Inc. is owner/operator of the world’s most scalable, automated tournament platform for eSports.  Additionally the company has deployed a social network for the world’s over 200 million amateur online gamers, giving them a destination site where they can interact, compete, learn, buy/sell/trade virtual goods and services, and hone their skills as they seek to move to the semi-pro or pro- levels.', 'GoodGaming.png', 'https://www.good-gaming.com/', 'https://twitter.com/goodgaminginc', ''),
];

let contentPromise = Promise.resolve(SPONSORS);

@Injectable()
export class SponsorService {
    getSponsors() { return contentPromise; }
}
