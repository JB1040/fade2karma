import Card from '../card';
import { Games } from '../decks/deck';

export const dustCosts = {
    'BASIC': 0,
    'COMMON': 40,
    'RARE': 100,
    'EPIC': 400,
    'LEGENDARY': 1600
};

export const scrapCosts = {
    'COMMON': 30,
    'RARE': 80,
    'EPIC': 200,
    'LEGENDARY': 800
};

export const uncraftableHS = ['CORE', 'HOF'];

export class DustCalculationService {
    public static getCardCost(cards: Card[], game: Games): number {
        let costs = (game === 'HS' ? dustCosts : scrapCosts);
        switch (game) {
            case 'HS':
                costs = dustCosts;
                break;
            case 'GWENT':
                costs = scrapCosts;
                break;
            default:
                costs = dustCosts;
                console.error('no Game passed in to dust-calculation');
        }

        return cards.reduce((dustCost, card) => {
            if (game === 'HS' && uncraftableHS.indexOf(card.set) !== -1) {
                return dustCost;
            }
            return dustCost + costs[card.rarity];
        }, 0);
    }
}
