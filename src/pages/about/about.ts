import { Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
    public base64Image: string;
    storageRef = firebase.storage().ref();
    imagesRef = this.storageRef.child('image/camp');
    fireAuth: any;
    reportForm: any;
    url: any;
  
    constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController, private camera: Camera, public af: AngularFire) {
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

            this.navCtrl.push(HomePage);
        }
    }

    takePicture() {
        this.camera.getPicture({
            quality: 95,
            targetHeight: 500,
            targetWidth: 500,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:

            // Create the base64Image for the page
            this.base64Image = "data:image/jpg;base64," + imageData;

            // Show the image with stupid ass workaround
            let cameraImageSelector = document.getElementById('camera-image');
            cameraImageSelector.setAttribute('src', this.base64Image);

            this.uploadImage(imageData);
        });
    }

    uploadImage(imageData) {
        alert('made it here at least');
        // Save the image to firebase storeage once this is called we can pass it some kind of id for the workorder
        this.imagesRef.putString(imageData).then((snapshot) => {
            alert('Uploaded a base64url image string!');
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, (err) => {
            switch (err.message) {
                case 'storage/unauthorized':
                    alert("User doesn't have permission to access the object");
                    break;

                case 'storage/canceled':
                    alert("User canceled the upload");
                    break;
                case 'storage/unknown':
                    alert("Unknown error occurred, inspect error.serverResponse");
                    break;
            }
            alert('there was a problem uplaoding to storage:' + err.message);
        });
    }

    display() {
        this.imagesRef.getDownloadURL().then((url) => {
            // get the image url ei ... 
            console.log(url);
        }).catch((error) => {
            console.log(error.message);
            // This is strange but i cant seem to get the error code to show up for some reason
            switch (error.message) {
                case 'storage/object_not_found':
                    alert("File doesn't exist");
                    break;

                case 'storage/unauthorized':
                    alert("User doesn't have permission to access the object");
                    break;

                case 'storage/canceled':
                    alert("User canceled the upload");
                    break;

                case 'storage/unknown':
                    alert("Unknown error occurred, inspect the server response");
                    break;
            }
        });
    }
}
