import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
    reportForm: any;
  
    constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController, public af: AngularFire) {
        this.reportForm = formBuilder.group({
            title: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }

    saveToFirebase() {
        if (!this.reportForm.valid) {
            console.log(this.reportForm.value);
        } else {
            firebase.database().ref('reports').push({
                title: this.reportForm.value.title,
                description: this.reportForm.value.description
            });

            let alert = this.alertCtrl.create({
                message: 'Thank You',
                buttons: [
                    {
                        text: "Ok",
                        role: 'cancel'
                    }
                ]
            });
            alert.present();

            this.reportForm.reset();
        }
    }
}
