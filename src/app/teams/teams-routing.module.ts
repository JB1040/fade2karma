import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamsComponent } from './teams.component';
import { TeamComponent } from './team.component';
import { PlayerComponent } from './player.component';
import {HomeTestingComponent} from '../home/home.component';
import { ArticlesComponent } from '../articles/articles/articles.component';
import { HomePageComponent } from '../home/home-page.component';

const contentRoutes: Routes = [
    { path: 'team/:name', component: TeamComponent },
    { path: 'team/:name/:player', component: PlayerComponent },
    { path: 'team', component: TeamsComponent },
    { path: 'test', component: HomeTestingComponent },
    { path: '', component: HomePageComponent },
    { path: 'articles', component: ArticlesComponent },
    // { path: 'articles/article', component: ArticlesComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(contentRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TeamsRoutingModule { }
