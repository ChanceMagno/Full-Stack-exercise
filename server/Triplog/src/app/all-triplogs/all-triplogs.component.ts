import { Component, OnInit, EventEmitter, Input } from '@angular/core';
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

export class AllTriplogsComponent implements OnInit{
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
  latestTriplog: any;

  constructor(private triplogsApiService: TriplogsApiService, private router: Router) {}



  ngOnInit() {
    this.date.setDate(this.date.getDate());
    this.getTriplogs();
  }

  // callOtherDomain(){

  //   var invocation = new XMLHttpRequest();
  //   var url = 'http://bar.other/resources/public-data';
  //   if(invocation){
  //     invocation.open('GET', url, true);
  //     invocation.onreadystatechange = this.handler;
  //     invocation.send();
  //   }
  // }

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
      return "gray centered";
    } else {
      return "white"
    }
  }

  checkInfo(index: number){
    if(this.triplogs[index].segments[0].mode === ""){
      return "disabled btn-floating btn-small waves-effect waves-light green";
    } else {return "btn-floating btn-small waves-effect waves-light green"}
  }

  openEdit(triplogToUpdate: number, segmentToUpdate: number){

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
    this.triplogsApiService.deleteTripLog(this.triplogs[this.triplogIndex]._id).subscribe(data => {
      console.log("delete working")
    });
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
      this.latestTriplog = this.triplogs[0];
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
      this.latestTriplog = this.triplogs[0];
    } else if (length < this.triplogsToDisplay){
      this.addEmptyTriplogs();
    }
  }
}
