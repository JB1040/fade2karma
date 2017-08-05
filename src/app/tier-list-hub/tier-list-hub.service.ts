import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class TierListHubService {

  constructor(private http: Http) { }
  
  getDecks(tier: number) {
    const url = `api/decks/list?amount=5&tier=${tier}`;
    console.log(url);
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
