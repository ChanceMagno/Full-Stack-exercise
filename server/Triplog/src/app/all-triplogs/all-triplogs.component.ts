import { Component, OnInit } from '@angular/core';
import { TriplogsApiService } from '../services/triplogs-api-service/triplogs-api.service';
import { DatePipe } from '@angular/common';
import { DayLimitPipe } from '../day-limit.pipe'
import { Router } from '@angular/router';
import * as moment from 'moment'




@Component({
  selector: 'app-all-triplogs',
  templateUrl: './all-triplogs.component.html',
  styleUrls: ['./all-triplogs.component.css']
})
export class AllTriplogsComponent implements OnInit {
  private triplogs: any = [];
  private date = new Date();
  private emptyTriplog: any;
  private data: any = [];
  private testDate = new Date();
  private triplogsToDisplay: number = 30;

  constructor(private triplogsApiService: TriplogsApiService, private router: Router) {}

  ngOnInit() {
    this.date.setDate(this.date.getDate());
    this.getTriplogs();
  }

  getTriplogs() {
    this.triplogsApiService.getTripLogs().subscribe(data => {
      this.sortTriplogs(data);
      error => console.log(error);
    })
  }

  editTriplog(id: string){
    // console.log("here")
    // this.triplogs.splice(id, 1);
    // console.log(this.triplogs);
  //  this.router.navigate(['triplogs/:id']);
  }

  saveTriplog(){
    var date = moment(this.triplogs[0].date);
    var y = moment(date, 'YYYY-MM-DD')
    // let date =  Date.parse(this.triplogs[0].date);
    // console.log(this.triplogs[0].date, "triplogDate")
    // var today = moment();
    // var yesterday = moment().subtract(1, 'day');
    // if(moment(this.date).isSame(today, 'day'))
    // console.log('Today');
    // else if(moment(this.date).isSame(yesterday, 'day'))
    // console.log('Yesterday');
    // console.log(moment(date).isAfter(date, 'day'));

  // let data: any =  {
  //   date: this.date.setUTCDate(this.date.getUTCDate()),
  //   updated: "2017-08-28T16:17:02.714Z",
  //   created: "2017-08-26T19:22:48.230Z",
  //   segments: [
  //       {
  //         mode: "bike",
  //         miles: 3,
  //         dateTime: this.date.setUTCDate(this.date.getUTCDate()),
  //       }
  //   ]
  // }
  //
  //  this.triplogsApiService.createTripLog(data).subscribe(data => {
  //    this.getTriplogs();
  //    error => console.log(error);
  //  })
  }

  getEmptyTriplog(day: number){
    let date = new Date();
    console.log(date, "before")
    date.setDate(date.getDate() - day);
    console.log(date, "after")
    console.log(day)
    return this.emptyTriplog = {date: date, updated: "", created: "",
        segments: [{ mode: "", miles: 0, dateTime: date,}]
      };
  }

  setBackground(position: number){
    if(position % 2 === 0){
      return "gray";
    }
  }



  addEmptyTriplogs(){
    var triplogDate;
    var dateToCheck = moment();
    var length = Object.keys(this.triplogs).length;

    // console.log("y", triplogDate.isAfter(moment().add(30, 'days')));
    for(var i = 0; i < this.triplogsToDisplay; i++){
      if(this.triplogs[i] === undefined){
        { this.triplogs.splice(p, 1, this.getEmptyTriplog(i))}
      }
      for(var p = 0; p < this.triplogsToDisplay; p++){

        if(this.triplogs[p] !== undefined){
          triplogDate = moment(this.triplogs[p].date);
          triplogDate = moment(triplogDate, 'YYYY-MM-DD')
        }



         if (triplogDate.isBefore(moment().subtract(this.triplogsToDisplay, 'days'))){
            this.triplogs.splice(p, 1);
        }
      }


    }
  }

  sortTriplogs(data: any){
    this.data = data;
    var length = Object.keys(data).length;
    this.triplogs = data.sort((a, b) => new Date(b.date).getUTCDate() - new Date(a.date).getUTCDate());
    if(length > this.triplogsToDisplay){
      this.triplogs = this.triplogs.splice(0, this.triplogsToDisplay);
    } else if (length < this.triplogsToDisplay){
      this.addEmptyTriplogs();
    }
  }
}
