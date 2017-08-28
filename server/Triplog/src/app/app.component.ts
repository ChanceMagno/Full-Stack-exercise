import { Component, OnInit } from '@angular/core';
import {TriplogsApiService} from './services/triplogs-api-service/triplogs-api.service';
import { Triplog } from './Triplog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  today = new Date();
  data: any = {};

  newTriplog: Triplog;
  constructor(private triplogsApiService: TriplogsApiService) {
  }

  ngOnInit(){
    this.today.setHours(0, 0, 0, 0);
    console.log(this.today);
    // JSON.stringify(this.newTriplog);


    // this.triplogsApiService.createTripLog(this.newTriplog);
  }
//data structure
  // this.data = {
  //        date: this.today,
  //        __v: 0,
  //        updated: "2017-08-26T19:22:48.240Z",
  //        created: "2017-08-26T19:22:48.230Z",
  //        segments: [
  //            {
  //                mode: "bike",
  //                miles: 3,
  //                dateTime: "2017-01-09T16:00:00.000Z"
  //            }]
  //          }

}
