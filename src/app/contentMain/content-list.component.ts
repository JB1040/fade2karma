import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Content, ContentService }  from './content.service';

@Component({
  template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let intContent of content | async">
        <span class="badge">{{ intContent.id }}</span> {{ intContent.name }}
      </li>
    </ul>
  `
})
export class ContentListComponent implements OnInit {
    content: Observable<Content[]>;
    private selectedId: number;

    constructor(
        private service: ContentService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.content = this.route.params
        .switchMap((params: Params) => {
            //this.selectedId = +params['id'];
            return this.service.getContent();
        });
    }

    //isSelected(content: Content) { return content.id === this.selectedId; } // remove

    //onSelect(content: Content) {
    //    this.router.navigate(['/content', content.id]);
    //}
}


//        (click)="onSelect(intContent)">
