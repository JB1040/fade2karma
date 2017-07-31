import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'f2kDeckList',
    templateUrl: './decklist.component.html',
    styleUrls: ['../app.component.css', './decklist.component.scss']
})
export class DeckListComponent implements OnInit{

    @Input() private decks: Array<any>; // TODO any => Deck type
    @Input() private options: { sortBy: string, sortDirection: string };

    ngOnInit() {
        this.decks.sort(sortDecks.bind(null, 'desc', 'date'));
    }

    sortHeaderClick(name) {
        if (name) {
            if (this.options.sortBy === name) {
                this.options.sortDirection = this.options.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.options.sortDirection = 'desc';
            }
            this.options.sortBy = name;
            this.decks.sort(sortDecks.bind(null, this.options.sortDirection, name));
        }
    }
}

function sortDecks(direction: string, property: string, o1: any, o2: any) { // TODO any => Deck type // TODO export // only for comparing numbers...
    if (direction === 'asc') {
        return o1[property] - o2[property];
    }
    if (direction === 'desc') {
        return o2[property] - o1[property];
    }
    return 0; // fallback should never trigger
}
