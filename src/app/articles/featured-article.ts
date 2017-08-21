import { Article } from './article';
import { Deck } from '../decks/deck';

export class FeaturedArticle {
    constructor(public id: number,
                public article: Article,
                public deck: Deck,
                public target: string,
                public type: string,
				public imageURL: string) {
    }
}
