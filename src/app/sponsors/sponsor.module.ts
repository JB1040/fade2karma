import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SponsorsComponent } from './sponsor.component';
//import { HeroDetailComponent } from './content-detail';

import { SponsorService } from './sponsor.service';

import { SponsorRoutingModule } from './sponsor-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SponsorRoutingModule
    ],
    declarations: [
        SponsorsComponent,
    ],
    providers: [SponsorService]
})
export class SponsorModule { }
