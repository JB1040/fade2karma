import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TeamsModule } from './teams/teams.module';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { NavigationComponent } from './navigation.component';
import { OnlineStreamerTileComponent } from './home/streams/online-streamer-tile.component';
import { OnlineStreamerScrollComponent } from './home/streams/online-streamer-scroll.component';
import { ArticlesTileComponent } from './articles/article-tile.component';
import { ArticlesComponent } from './articles/articles/articles.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AuthorComponent } from './articles/article/author/author.component';
import { ArticleComponent } from './articles/article/article.component';
import { ArticleContentComponent } from './articles/article/article-content/article-content.component';
import { RatingComponent } from './articles/article/rating/rating.component';
import { SocialShareComponent } from './articles/article/social-share/social-share.component';
import { RecommendedTileComponent } from './teased/teased-tile.component';
import { RecommendedContainerComponent } from './teased/teased-container.component';
import { TopDecksComponent } from './home/topDecks/top-decks.component';
import { CanvasService } from './core/canvas.service';
import { HomePageComponent } from './home/home-page.component';
import { TierListComponent } from './home/tier-list/tier-list.component';

import { HearthstoneManaComponent } from './hsmana/hsmana.component';
import { DeckListRowComponent } from './decklistrow/decklistrow.component';
import { HearthstoneFilterComponent } from './hsfilter/hsfilter.component';
import { GwentFilterComponent } from './gwfilter/gwfilter.component';
import { SafeStyle } from './safestyle.pipe';
import { CardComponent } from './card.component/card.component';
import { ManatableComponent } from './manatable/manatable.component';
import { DatePipe } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NewsLetterComponent } from './news/news.component';
import { ArticleFetchingService } from './articles/article/article-fetching.service';
import { CapitalizePipe } from './core/capitalize pipe';
import { DustCalculationService } from './core/dust-calculation.service';
import { HttpClientModule } from '@angular/common/http';
import { TierListHubComponent } from './tier-list-hub/tier-list-hub.component';
import { TierListHubService } from './tier-list-hub/tier-list-hub.service';
import { NewDeckHubComponent } from './decks/new-deck-hub/new-deck-hub.component';
import { F2kUrlPipe } from './core/url.pipe';
import { TeamsComponent } from './teams/team-hub/team-hub.component';
import { PlayerInstanceComponent } from './teams/player-tile/player-tile.component';
import { GiveawaysHubComponent } from './giveaways/hub/giveaways-hub.component';
import { GiveawayTileComponent } from './giveaways/tile/giveaway-tile.component';
import { GoogleAnalyticsEventsService } from './google-analytics-events.service';
import { DmcaComponent } from 'app/dmca/dmca.component';
import { HearthstoneDecksHubComponent } from './decks/decks-hub/hearthstone-decks-hub/hearthstone-decks-hub.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CanvasManaGraphComponent } from './canvas-mana-graph/canvas-mana-graph.component';
import { SponsorTileComponent } from './sponsor/sponsor-tile/sponsor-tile.component';
import { SponsorHubComponent } from './sponsor/sponsor-hub/sponsor-hub.component';
import { PlayerHubComponent } from './teams/player-hub/player-hub.component';
import { FacebookSkdService } from './facebook-skd.service';
import { AdComponent } from './ad/ad.component';
import { HtmlHovererComponent } from './html-hoverer/html-hoverer.component';
import { InfiniteScrollService } from './infinite-scroller.directive';
import { HoverService } from './core/hover.service';
import { SpoilerService } from './core/spoilers';
import { CopyDeckCodeService } from './core/copy-deck-code.service';

const myAppRoutes: Routes = [
    { path: '', component: PageNotFoundComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        TeamsModule,
        RouterModule.forRoot(myAppRoutes, { useHash: false }),
        FormsModule,
        HttpClientModule
],
    declarations: [
        AppComponent,
        AdComponent,
        PageNotFoundComponent,
        HomePageComponent,
        NavigationComponent,
        OnlineStreamerTileComponent,
        OnlineStreamerScrollComponent,
        ArticlesTileComponent,
        ArticlesComponent,
        BreadcrumbComponent,
        AuthorComponent,
        ArticleComponent,
        ArticleContentComponent,
        RatingComponent,
        SocialShareComponent,
        RecommendedTileComponent,
        RecommendedContainerComponent,
        TopDecksComponent,
        TierListComponent,
        SafeStyle,
        CardComponent,
        HearthstoneManaComponent,
        ManatableComponent,
        DeckListRowComponent,
        HearthstoneFilterComponent,
        GwentFilterComponent,
        FooterComponent,
        NewsLetterComponent,
        CapitalizePipe,
        TierListHubComponent,
        NewDeckHubComponent,
        F2kUrlPipe,
        TeamsComponent,
        PlayerInstanceComponent,
        GiveawaysHubComponent,
        GiveawayTileComponent,
        DmcaComponent,
        HearthstoneDecksHubComponent,
        PrivacyPolicyComponent,
        TermsOfServiceComponent,
        AboutUsComponent,
        CanvasManaGraphComponent,
        SponsorTileComponent,
        SponsorHubComponent,
        PlayerHubComponent,
        HtmlHovererComponent
    ],
    exports: [
        CapitalizePipe,
        F2kUrlPipe
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        CanvasService,
        DatePipe,
        ArticleFetchingService,
        DustCalculationService,
        TierListHubService,
        F2kUrlPipe,
        GoogleAnalyticsEventsService,
        FacebookSkdService,
        HoverService,
        SpoilerService,
        CopyDeckCodeService,
        InfiniteScrollService
    ]
})
export class AppModule {
}
