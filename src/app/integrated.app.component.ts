import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card.component/card.component';
import Card from './card';

const HS_CARDS: Card[] = [
    {
        id: 1,
        name: 'Adam',
        rarity: 'legendary',
        cost: 1,
        strength: 1,
        image: 'assets/Hearthstone_Square/mage.jpg',
        faction: ''
    },
    {
        id: 2,
        name: 'Cipher',
        rarity: 'rare',
        cost: 1,
        strength: 1,
        image: 'assets/Hearthstone_Square/shaman.jpg',
        faction: ''
    },
    {
        id: 3,
        name: 'Tim',
        rarity: 'epic',
        cost: 1,
        strength: 1,
        image: 'assets/Hearthstone_Square/priest.jpg',
        faction: ''
    },
    {
        id: 4,
        name: 'Dan',
        rarity: 'common',
        cost: 1,
        strength: 1,
        image: 'assets/Hearthstone_Square/warrior.jpg',
        faction: ''
    }
];

const GW_CARDS: Card[] = [
    {
        id: 1,
        name: 'Jordy',
        rarity: 'legendary',
        cost: 1,
        strength: 1,
        image: 'assets/GwentLeaders_Wide/foltest.jpg',
        faction: 'monsters'
    },
    {
        id: 2,
        name: 'Karlis',
        rarity: 'rare',
        cost: 1,
        strength: 1,
        image: 'assets/GwentLeaders_Wide/dagon.jpg',
        faction: 'northern-realm'
    },
    {
        id: 3,
        name: 'Kristina',
        rarity: 'epic',
        cost: 1,
        strength: 1,
        image: 'assets/GwentLeaders_Wide/eredin.jpg',
        faction: 'scotia-tael'
    },
    {
        id: 4,
        name: 'Mat',
        rarity: 'common',
        cost: 1,
        strength: 1,
        image: 'assets/GwentLeaders_Wide/unseen-elder.jpg',
        faction: 'skellige'
    },
    {
        id: 5,
        name: 'Jesse',
        rarity: 'epic',
        cost: 1,
        strength: 1,
        image: 'assets/GwentLeaders_Wide/eithne.jpg',
        faction: 'nilfgaard'
    },
    {
        id: 6,
        name: 'Mitch',
        rarity: 'rare',
        cost: 1,
        strength: 1,
        image: 'assets/kitten.jpg',
        faction: 'common'
    }
];

const HS_MANA_GRAPH = {
    metadata: [
        {
            label: 'Class',
            value: 'Shaman',
            image: 'assets/Hearthstone_Square/druid.jpg'
        },
        {
            label: 'Game mode',
            value: 'Standard',
            image: 'assets/icons/standardicon.svg'
        },
        {
            label: 'Dust Cost',
            value: 5960
        }
    ],
    distribution: [
        ['0', 0],
        ['1', 0],
        ['2', 6],
        ['3', 11],
        ['4', 6],
        ['5', 2],
        ['6', 4],
        ['7', 1]
    ]
};

const GW_MANA_GRAPH = {
    metadata: [
        {
            label: 'Faction',
            value: 'Nilfgaard',
            image: 'assets/icons/nilfgaard.svg'
        },
        {
            label: 'Leader',
            value: 'Morvran Voorhis',
            image: 'assets/GwentLeaders_Square/morvran-voorhis.jpg'
        },
        {
            label: 'Scrap',
            value: 5960
        }
    ]
};

const DECKS = [
    {
        images: [
            'assets/Hearthstone_Square/shaman.jpg',
            'assets/icons/standardicon.svg'
        ],
        name: 'Varranis: Cosmic Crown Showdown Breakdown',
        author: 'Tom Johnston',
        tier: 1,
        scrapDust: 2340,
        date: 1491270273168
    },
    {
        images: [
            'assets/Hearthstone_Square/shaman.jpg',
            'assets/icons/standardicon.svg'
        ],
        name: 'Godlike Guides: Midrange Shaman',
        author: 'Loading',
        tier: 2,
        scrapDust: 2200,
        date: 1481200000000
    },
    {
        images: [
            'assets/Hearthstone_Square/shaman.jpg',
            'assets/icons/standardicon.svg'
        ],
        name: 'Control\'s Wild Legend Egg Druid',
        author: 'Unknown1',
        tier: 1,
        scrapDust: 2340,
        date: 1501275470000
    }
];

@Component({
    selector: 'f2kIntegratedStuffDisplay',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class IntegratedComponent implements OnInit {
    title = 'HS Card';
    hs_cards = HS_CARDS;
    gw_cards = GW_CARDS;
    hs_mana_graph = HS_MANA_GRAPH;
    gw_mana_graph = GW_MANA_GRAPH;
    decks = DECKS;

    private chartData: Array<any>;

    ngOnInit() {
        // give everything a chance to get loaded before starting the animation to reduce choppiness
        setTimeout(() => {
            this.generateData();

            // change the data periodically
        }, 1000);
    }

    generateData() {
        this.chartData = [];
        for (let i = 0; i < 8; i++) {
            this.chartData.push([
                `${i}`,
                Math.floor(Math.random() * 15)
            ]);
        }
    }
}
