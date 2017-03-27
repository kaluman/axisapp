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
    fireAuth: any;
    reportForm: any;
  
    constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController, public af: AngularFire) {
        this.reportForm = formBuilder.group({
            hoa: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            number_of_employees: ['', Validators.compose([Validators.minLength(1), Validators.required])],
            activities: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            job_completed: [''],
            number_of_crews: ['', Validators.compose([Validators.minLength(1)])],
            location: [''],
            delay: ['']
        });

        af.auth.subscribe(user => {
            if (user) {
                this.fireAuth = user.auth;
                console.log(user);
            }
        });
    }

    saveToFirebase() {
        if (!this.reportForm.valid) {
            console.log(this.reportForm.value);
        } else {
            firebase.database().ref('reports').push({
                crew_name: 'Axis Construction',
                hoa: this.reportForm.value.hoa,
                description: this.reportForm.value.description,
                project_manager: this.fireAuth.email,
                number_of_employees: this.reportForm.value.number_of_employees,
                activities: this.reportForm.value.activities,
                job_completed: this.reportForm.value.job_completed,
                number_of_crews: this.reportForm.value.number_of_crews,
                location: this.reportForm.value.location,
                delay: this.reportForm.value.delay
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
