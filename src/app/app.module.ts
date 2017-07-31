import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContentModule } from './contentMain/content.module';
import { SponsorModule } from './sponsors/sponsor.module';
import { TeamsModule } from './teams/teams.module';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeTestingComponent } from './home/home.component';
import { OnlineStreamerTileComponent } from './home/streams/online-streamer-tile.component';
import { OnlineStreamerScrollComponent } from './home/streams/online-streamer-scroll.component';
import { ArticlesTileComponent } from './articles/article-tile.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ArticlesComponent } from './articles/articles/articles.component';
import { RecommendedTileComponent } from './teased/teased-tile.component';
import { RecommendedContainerComponent } from './teased/teased-container.component';
import { TopDecksComponent } from './home/topDecks/top-decks.component';
import { CanvasService } from './core/canvas.service';
import { HomePageComponent } from './home/home-page.component';
import { TierListComponent } from './home/tier-list/tier-list.component';
import { ResponsiveConfig, ResponsiveModule } from 'ng2-responsive';

import { IntegratedComponent } from './integrated.app.component';
import { HearthstoneManaGraphComponent } from './hsmanagraph/hsmanagraph.component';
import { HearthstoneManaComponent } from './hsmana/hsmana.component';
import { DeckListRowComponent } from './decklistrow/decklistrow.component';
import { DeckListComponent } from './decklist/decklist.component';
import { HearthstoneFilterComponent } from './hsfilter/hsfilter.component';
import { GwentFilterComponent } from './gwfilter/gwfilter.component';
import { SafeStyle } from './safestyle.pipe';
import { CardComponent } from './card.component/card.component';
import { ManatableComponent } from './manatable/manatable.component';
import { DatePipe } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NewsLetterComponent } from './news/news.component';


const config = {
    breakPoints: {
        xs: {min: 0, max: 0},
        sm: {min: 1, max: 767},
        md: {min: 768, max: 1219},
        lg: {min: 1220, max: Infinity},
        xl: {min: Infinity}
    },
    debounceTime: 100
};

export function ResponsiveDefinition() {
    return new ResponsiveConfig(config);
};

const myAppRoutes: Routes = [
    {path: '', component: PageNotFoundComponent},
    {path: '**', component: PageNotFoundComponent}
];


@NgModule({
    imports: [
        BrowserModule,
        ContentModule,
        SponsorModule,
        TeamsModule,
        RouterModule.forRoot(myAppRoutes),
        NgbModule.forRoot(),
        InfiniteScrollModule,
        FormsModule,
        ResponsiveModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        HomePageComponent,
        NavigationComponent,
        HomeTestingComponent,
        OnlineStreamerTileComponent,
        OnlineStreamerScrollComponent,
        ArticlesTileComponent,
        ArticlesComponent,
        RecommendedTileComponent,
        RecommendedContainerComponent,
        TopDecksComponent,
        TierListComponent,
        IntegratedComponent,
        SafeStyle,
        CardComponent,
        HearthstoneManaGraphComponent,
        HearthstoneManaComponent,
        ManatableComponent,
        DeckListRowComponent,
        DeckListComponent,
        HearthstoneFilterComponent,
        GwentFilterComponent,
        FooterComponent,
        NewsLetterComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [{
        provide: ResponsiveConfig,
        useFactory: ResponsiveDefinition,
    },
        NavigationService,
        CanvasService,
        DatePipe
    ]
})
export class AppModule {
}
