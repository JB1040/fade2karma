import { Component, OnInit } from '@angular/core';
import { Sponsor } from '../sponsor';

@Component({
    selector: 'f2kSponsorHub',
    templateUrl: './sponsor-hub.component.html',
    styleUrls: ['./sponsor-hub.component.css']
})
export class SponsorHubComponent implements OnInit {

    sponsors: Array<Sponsor> = [];

    constructor() {}

    ngOnInit() {
        this.sponsors.push(new Sponsor({
            imageURL: 'assets/sponsor-images/rush49.png',
            link: 'https://rush49.com/',
            links: [{
                url: 'https://www.facebook.com/Rush49',
                icon: 'assets/icons/facebook.svg'
            }, {
                url: 'https://twitter.com/Rush49',
                icon: 'assets/icons/twitter.svg'
            }]
        }));

        this.sponsors.push(new Sponsor({
            imageURL: 'assets/sponsor-images/ample.png',
            link: 'https://www.amplemeal.com/',
            links: [{
                url: 'https://www.facebook.com/amplemeal/',
                icon: 'assets/icons/facebook.svg'
            }, {
                url: 'https://twitter.com/amplemeal',
                icon: 'assets/icons/twitter.svg'
            }]
        }));

        this.sponsors.push(new Sponsor({
            imageURL: 'assets/sponsor-images/aftershockz.png',
            link: 'https://aftershokz.com',
            links: [{
                url: 'https://www.facebook.com/AfterShokz',
                icon: 'assets/icons/facebook.svg'
            }, {
                url: 'https://twitter.com/aftershokz',
                icon: 'assets/icons/twitter.svg'
            }, {
                url: 'https://www.youtube.com/channel/UCyNdHJA6ZlAtDNQJUoqJKdA',
                icon: 'assets/icons/youtube.svg'
            }]
        }));
    }
}
