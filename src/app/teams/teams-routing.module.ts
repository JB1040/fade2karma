import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamsComponent } from './team-hub/team-hub.component';
import { HomeTestingComponent } from '../home/home.component';
import { ArticlesComponent } from '../articles/articles/articles.component';
import { HomePageComponent } from '../home/home-page.component';

const contentRoutes: Routes = [
    {path: 'team', component: TeamsComponent},
    {path: 'test', component: HomeTestingComponent},
    {path: '', component: HomePageComponent},
    {path: 'articles', component: ArticlesComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(contentRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TeamsRoutingModule {
}
