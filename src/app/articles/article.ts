import { Author } from './article/author/author';
import { Extend } from '../core/globals';
import { Deck } from '../decks/deck';

export class Article {
    id: number;
    author: Author;
    title: string;
    imageURL: string;
    content: string;
    game: 'HS' | 'GWENT';
    type: 'METAREPORTS' | 'ANNOUNCMENTS' | 'PODCASTS' | 'HIGHLIGHTS' | 'VIEWPOINTS' | 'TEAMS' | 'CARD_REVEALS';
    published: boolean;
    rating: number;
    date: number;
    editDate: number;
    recommended: Array<Article>;
    similar?: Array<Deck>;

    constructor(jsonData: any) {
        Extend(this, jsonData);
    }
}
