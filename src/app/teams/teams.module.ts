import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TeamsComponent } from './teams.component';
import { TeamComponent } from './team.component';
import { PlayerComponent } from './player.component';
import { PlayerInstanceComponent } from './player';
//import { HeroDetailComponent } from './content-detail';

import { TeamsService } from './teams.service';

import { TeamsRoutingModule } from './teams-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TeamsRoutingModule
    ],
    declarations: [
        TeamsComponent,
        TeamComponent,
        PlayerComponent,
        PlayerInstanceComponent
    ],
    providers: [TeamsService]
})
export class TeamsModule { }
