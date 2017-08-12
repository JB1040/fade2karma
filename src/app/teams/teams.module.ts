import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TeamsService } from './teams.service';

import { TeamsRoutingModule } from './teams-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TeamsRoutingModule
    ],
    providers: [TeamsService]
})
export class TeamsModule {
}
