import Card from '../card';

export class DustCalculationService {
    public static getDustCost(cards: Card[]): number {
        const dustCosts = {
            'BASIC': 0,
            'COMMON': 40,
            'RARE': 100,
            'EPIC': 400,
            'LEGENDARY': 1600
        };

        const uncraftable = ['CORE', 'HOF'];

        let dustCost = 0;

        cards.forEach((card: Card) => {
            if (uncraftable.indexOf(card.set) === -1) {
                dustCost += dustCosts[card.rarity];
            }
        });

        return dustCost;
    }
}
