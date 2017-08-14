import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamsComponent } from './team-hub/team-hub.component';
import { ArticlesComponent } from '../articles/articles/articles.component';
import { ArticleComponent } from '../articles/article/article.component';
import { HomePageComponent } from '../home/home-page.component';
import { TierListHubComponent } from '../tier-list-hub/tier-list-hub.component';
import { NewDeckHubComponent } from '../decks/new-deck-hub/new-deck-hub.component';

const contentRoutes: Routes = [
    {path: 'team', component: TeamsComponent},
    {path: '', component: HomePageComponent},
    {path: 'articles', component: ArticlesComponent},
    {path: 'articles/:article', component: ArticleComponent},
    {path: 'tier_list/:deck', component: NewDeckHubComponent},
    {path: 'tier_list', component: TierListHubComponent},
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
