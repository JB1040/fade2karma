import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

declare var window: any;
declare var FB: any;

@Injectable()
export class FacebookSkdService {

    fb: any;

    constructor(private router: Router, private http: Http) {
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0]; // tslint:disable-line
            if (d.getElementById(id)) return; // tslint:disable-line
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = () => {
            this.fb = FB;
        };
    }
}
