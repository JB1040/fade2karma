import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TeamsComponent } from './team-hub/team-hub.component';
import { PlayerInstanceComponent } from './player-tile/player-tile.component';

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
        PlayerInstanceComponent
    ],
    providers: [TeamsService]
})
export class TeamsModule {
}
