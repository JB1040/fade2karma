import Card from '../card';
import { Games } from '../decks/deck';

export const BASE_URL = 'https://api.f2k.gg';

export function Extend(a, b) {
    for (const key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
}

export function GetImageSrc(card: Card, gameMode: Games, thumbnail: boolean): string {
    return encodeURI(`assets/images/static/${ gameMode === 'HS' ? 'hearthstone/' + card.cardId : 'gwent/' + card.name.replace(/-/g, ' ')}${ thumbnail ? '_thumb' : ''}.png`);
}
