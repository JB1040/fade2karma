import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../core/globals';
import { Deck, Games, HeroClasses } from '../decks/deck';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TierListHubService {

    constructor(private http: HttpClient) {
    }

    getDecks(amount: number, tier: number, mode: string, isStandard: boolean | null, game: Games, classes: Array<HeroClasses> = [], offset?: number): Observable<Array<Deck>> {
        const url = `${BASE_URL}/api/decks/list?amount=${amount}${tier === 0 ? '' : '&tier=' + tier}${mode ? '&mode=' + mode : ''}${isStandard != null ? '&isStandard=' + isStandard : ''}${game !== 'UNDEFINED' ? '&game=' + game : ''}${classes.length ? '&classes=' + classes.join(',') : ''}${offset ? '&offset=' + offset : ''}`;
        return this.http.get<Array<Deck>>(url);
    }
}
