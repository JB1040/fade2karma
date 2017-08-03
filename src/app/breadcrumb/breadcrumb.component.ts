import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface PagePath {
  title: string;
  path: string;
}

@Component({
  selector: 'f2k-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  private paths: PagePath[] = [{
      title: 'Home',
      path: '/'
  }];

  constructor(private router: Router) { }

  ngOnInit() {
      let currentPath = '';
      this.paths =
          this.paths.concat(this.router.url.substr(1).split('/').map(path => {
          currentPath += '/' + path;
          return {
              title: path.replace(/^\w/, l => l.toUpperCase()),
              path: currentPath
          }
      }));
  }
}
