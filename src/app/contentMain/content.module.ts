import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ContentListComponent }    from './content-list.component';
//import { HeroDetailComponent } from './content-detail';

import { ContentService } from './content.service';

import { ContentRoutingModule } from './content-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContentRoutingModule
  ],
  declarations: [
    ContentListComponent,
//    HeroDetailComponent
  ],
  providers: [ ContentService ]
})
export class ContentModule {}
