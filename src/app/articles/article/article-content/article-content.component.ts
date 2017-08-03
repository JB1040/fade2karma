import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../../breadcrumb/breadcrumb.component';
import { AuthorComponent } from '../author/author.component';
import { RatingComponent } from '../rating/rating.component';
import { RecommendedContainerComponent } from '../../../teased/teased-container.component';

@Component({
  selector: 'f2k-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.css']
})
export class ArticleContentComponent implements OnInit {
    author = {
        name: 'Cipher',
        game: 'Hearthstone',
        image: 'cipher.jpg',
        twitch: 'https://www.twitch.tv/cipherhs'
    };


  constructor() { }

  ngOnInit() {
  }

}
