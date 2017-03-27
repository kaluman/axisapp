import { Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})

export class ContactPage {
    constructor(public navCtrl: NavController, public authData: AuthData, private camera: Camera) {   
    }

    takePicture() {
      this.camera.getPicture().then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          alert(base64Image);
      }, (err) => {
        console.log('error with taking the photo')
      });
    }

    logout() {
        this.authData.logoutUser();
        this.navCtrl.push(LoginPage);
    }

}
