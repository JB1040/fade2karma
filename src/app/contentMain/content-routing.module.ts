import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentListComponent } from './content-list.component';
//import { HeroDetailComponent } from './content-detail';

const contentRoutes: Routes = [
    { path: 'hearthstone',  component: ContentListComponent },
//{ path: 'hero/:id', component: HeroDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(contentRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ContentRoutingModule { }
