import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SponsorsComponent } from './sponsor.component';
//import { HeroDetailComponent } from './content-detail';

const contentRoutes: Routes = [
    { path: 'sponsors', component: SponsorsComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(contentRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SponsorRoutingModule { }
