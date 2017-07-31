import { Component } from '@angular/core';

@Component({
    selector: 'f2kGwentFilter',
    templateUrl: './gwfilter.component.html',
    styleUrls: ['../app.component.css', './gwfilter.component.scss']
})
export class GwentFilterComponent {

    private factions: Array<any>;
    // private activeFactions: Array<any>;
    private activeFactions: any = [];
    // private activeLeaders: Array<any>;
    private activeLeaders: any = [];

    constructor() {
        this.factions = [
            {
                name: 'Monsters',
                uriName: 'monsters',
                leaders: [
                    'unseen-elder',
                    'eredin',
                    'dagon'
                ]
            },
            {
                name: 'Northern Realms',
                uriName: 'northern-realms',
                leaders: [
                    'foltest',
                    'hanslet',
                    'radovid'
                ]
            },
            {
                name: 'Scotia\' Tael',
                uriName: 'scotia-tael',
                leaders: [
                    'brouver-hoog',
                    'eithne',
                    'francesca'
                ]
            },
            {
                name: 'Skellige',
                uriName: 'skellige',
                leaders: [
                    'crach-an-craite',
                    'harald-the-cripple',
                    'king-bran'
                ]
            },
            {
                name: 'Nilfgaard',
                uriName: 'nilfgaard',
                leaders: [
                    'emhyr-var-emreis',
                    'john-calveit',
                    'morvran-voorhis'
                ]
            }
        ];
    }

    toggleActiveFaction(faction: string) {
        console.log('toggling ', faction);
        console.log('this.activeFactions ', this.activeFactions);
        this.activeLeaders = [];
        const index = this.activeFactions.indexOf(faction);
        if (index >= 0) {
            this.activeFactions.splice(index, 1);
            // do something complicated
        } else {
            this.activeFactions.push(faction);
        }
    }

    toggleActiveLeader(leader: string) {
        console.log('toggling ', leader);
        console.log('this.activeLeaders ', this.activeLeaders);

        this.activeFactions = [];
        const index = this.activeLeaders.indexOf(leader);
        if (index >= 0) {
            this.activeLeaders.splice(index, 1);
            // do something complicated
        } else {
            this.activeLeaders.push(leader);
        }
    }
}
