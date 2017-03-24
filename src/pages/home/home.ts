import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    crew_name = 'Axis Construction';
    number_of_employees: number;
    operation: string;
    job_completed: boolean;
    number_of_crews: number;
    location: any;
    delay: any;

  constructor(public navCtrl: NavController) {

  }

  itemClicked() {
    alert('This is working the way it should be');
  }

}
