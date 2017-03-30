﻿import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})

export class ContactPage {
    constructor(public navCtrl: NavController, public authData: AuthData) {   
    }

    logout() {
        this.authData.logoutUser();
        this.navCtrl.push(LoginPage);
    }

}
