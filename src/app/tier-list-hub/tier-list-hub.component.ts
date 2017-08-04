import { Component, OnInit } from '@angular/core';
import { DeckHs } from './../decks/deck';

@Component({
  selector: 'f2kTierListHub',
  templateUrl: './tier-list-hub.component.html',
  styleUrls: ['./tier-list-hub.component.css', 'grid.css']
})
export class TierListHubComponent implements OnInit {

  decks: any[] = [];
  showFloatingSocialMediaLinks = true;

  constructor() { }

  ngOnInit() {
    this.decks = [
      {
        title: 'Title',
        images: [
          '', ''
        ],
        type: 'type',
        author: 'name',
        date: 123,
        contentType: 'content',
        description: 'desc',
        dust: 123,
        gameMode: null,
        hero: null,
        tier: 123,
        scrapDust: 'scrap'
      },
      {
        title: 'Title',
        images: [
          '', ''
        ],
        type: 'type',
        author: 'name',
        date: 123,
        contentType: 'content',
        description: 'desc',
        dust: 123,
        gameMode: null,
        hero: null,
        tier: 123,
        scrapDust: 'scrap'
      },
      {
        title: 'Title',
        images: [
          '', ''
        ],
        type: 'type',
        author: 'name',
        date: 123,
        contentType: 'content',
        description: 'desc',
        dust: 123,
        gameMode: null,
        hero: null,
        tier: 123,
        scrapDust: 'scrap'
      },
    ];
    this.showFloatingSocialMediaLinks  = window.matchMedia("screen and (min-width:1300px)").matches;
  }

  onResize() {
    this.showFloatingSocialMediaLinks  = window.matchMedia("screen and (min-width:1300px)").matches;
  }

  isMd() {
    return (window.innerWidth > 991);
  }

  isLg() {
    return (window.innerWidth > 1199);
  }

}
