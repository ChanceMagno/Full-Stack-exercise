import { Component, OnInit, EventEmitter } from '@angular/core';
import { TriplogsApiService } from '../services/triplogs-api-service/triplogs-api.service';
import { DatePipe } from '@angular/common';
import { DayLimitPipe } from '../day-limit.pipe'
import { Router } from '@angular/router';
import * as moment from 'moment'
import { MaterializeAction } from 'angular2-materialize';





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
  Materialize:any;
  private warnAction = new EventEmitter;
  private triplogIndex: number;
  private segmentIndex: number;

  constructor(private triplogsApiService: TriplogsApiService, private router: Router) {}

  ngOnInit() {
    this.date.setDate(this.date.getDate());
    this.getTriplogs();
  }

  checkToken(){
    if(!this.triplogsApiService.checkToken()){
        this.router.navigate(['/']);
    }
  }

  warnModal() {
  this.warnAction.emit({action:"modal",params:['open']});
  }

  setBackground(position: number){
    if(position % 2 === 0){
      return "gray";
    }
  }

  checkDelete(index: number){
    if(this.triplogs[index].segments[0].mode === ""){
      return "disabled btn-floating btn-small waves-effect waves-light red";
    } else {return "btn-floating btn-small waves-effect waves-light red"}
  }

  checkEdit(index: number){
    if(this.triplogs[index].segments[0].mode === ""){
      return "disabled btn-floating btn-small waves-effect waves-light blue";
    } else {return "btn-floating btn-small waves-effect waves-light blue"}
  }

  verifyDeletion(triplogIndex: number, segmentIndex: number){
    this.triplogIndex = triplogIndex;
    this.segmentIndex = segmentIndex;
    this.warnModal();
  }

  closeModal(){
    this.warnAction.emit({action:"modal",params:['close']});
  }

  cancelDelete(){
    this.triplogIndex = undefined;
    this.segmentIndex = undefined;
    this.closeModal();
  }

  checkIfDeleteOrUpdate(){
    var segmentsLength = Object.keys(this.triplogs[this.triplogIndex].segments).length;
    if(segmentsLength > 1){
        this.removeSegment();
    } else {
      this.deleteTriplog();
    }
      this.closeModal();
  }

  deleteTriplog(){
    console.log('delete called');
    this.triplogsApiService.deleteTripLog(this.triplogs[this.triplogIndex]._id);
  }

  getTriplogs() {
    this.triplogsApiService.getTripLogs().subscribe(data => {
      this.sortTriplogs(data);
      error => console.log(error);
    })
  }

  removeSegment(){
    this.triplogs[this.triplogIndex].segments.splice(this.segmentIndex, 1)
    let triplogToUpdate = this.triplogs[this.triplogIndex]
    this.updateTriplog(triplogToUpdate)
  }

  updateTriplog(triplogToUpdate: any){
    this.triplogsApiService.updateTriplog(triplogToUpdate, triplogToUpdate._id).subscribe(data => {
      this.getTriplogs();
      error => console.log(error);
    })
  }

  saveTriplog(){
    this.checkToken()
    // var date = moment(this.triplogs[0].date);
    // var y = moment(date, 'YYYY-MM-DD')
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
    date.setDate(date.getDate() - day);
    return this.emptyTriplog = {date: date, updated: "", created: "",
        segments: [{ mode: "", miles: 0, dateTime: date,}]
      };
  }

  addEmptyTriplogs(){
    var triplogDate;
    var dateToCheck = moment();
    var length = Object.keys(this.triplogs).length;
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
