import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  private warnAction = new EventEmitter;
  private editAction = new EventEmitter;
  private triplogIndex: number;
  private segmentIndex: number;
  private latestTriplog: any;
  private editTriplogForm: FormGroup;
  private Materialize: any;
  private tripModes: string[] = ["Bike", "Walk", "Carpool", "Drove Alone", "Vanpool", "Telework", "Transit"];
  private preSelectedMode: string = '';


  constructor(private triplogsApiService: TriplogsApiService, private router: Router, private formBuilder: FormBuilder) {}



  ngOnInit() {
    this.instantiateForm();
    if(!this.triplogsApiService.checkToken()){
        this.router.navigate(['/']);
    }
    this.date.setDate(this.date.getDate());
    this.getTriplogs();
  }

  checkToken(){
    if(!this.triplogsApiService.checkToken()){
        this.router.navigate(['/']);
    }
  }

  setFormValues(){
    this.preSelectedMode = this.triplogs[this.triplogIndex].segments[this.segmentIndex].mode;
    this.preSelectedMode = this.preSelectedMode.charAt(0).toUpperCase() + this.preSelectedMode.slice(1);
    var time = moment(this.triplogs[this.triplogIndex].segments[this.segmentIndex].dateTime).format('hh:mm: a');
    this.editTriplogForm.controls['mode'].setValue(this.preSelectedMode);
    this.editTriplogForm.controls['miles'].setValue(this.triplogs[this.triplogIndex].segments[this.segmentIndex].miles)
    this.editTriplogForm.controls['time'].setValue(time)
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
      this.triplogIndex = triplogToUpdate;
      this.segmentIndex = segmentToUpdate;
      this.openEditModal();
      this.setFormValues();
  }

  instantiateForm(){
    this.editTriplogForm = this.formBuilder.group({
      mode: ['', Validators.required],
      miles: ['', Validators.required],
      time: [' ', Validators.required]
    })
  }

  openEditModal(){
    this.editAction.emit({action:"modal",params:['open']});
  }

  completeEdit(){
    var {mode, miles, time} = this.editTriplogForm.value;
    if(miles === null && mode === "Telework" || miles !== null){
      this.formatTripLog(mode, miles, time);
    }
  }

  setDateTime(time: string) {
    var setTime = moment(time, ["h:mm A"]).format("HH:mm:ss");
    var date = moment().format('MM/DD/YYYY');
    var dateTime = moment(date + ' ' + setTime, 'MM/DD/YYYY HH:mm:ss');
     return dateTime;
   }

  formatTripLog(mode: string, miles: number, dateTime: any){
    mode = mode.toLowerCase();
    dateTime = this.setDateTime(dateTime);
    this.triplogs[this.triplogIndex].updated = this.date;
    this.triplogs[this.triplogIndex].segments[this.segmentIndex].mode = mode;
    this.triplogs[this.triplogIndex].segments[this.segmentIndex].miles = miles;
    this.triplogs[this.triplogIndex].segments[this.segmentIndex].dateTime = dateTime;
    this.updateTriplog(this.triplogs[this.triplogIndex])
  }

  cancelEdit(){
    this.editAction.emit({action:"modal",params:['close']});
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

  validate(){
    var {mode, miles, time} = this.editTriplogForm.value;
    if(time === ""){
      return "disabled waves-effect waves-light btn green"
    } else {
      if(miles === null && mode === "Telework" || miles !== null && mode !== "" || miles < 0 && mode === "Telework"){
        return "waves-effect waves-light btn green "
      }  else {
        return "disabled waves-effect waves-light btn green"
      }}
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
      this.getTriplogs();
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
    triplogToUpdate.updated = new Date();
    this.triplogsApiService.updateTriplog(triplogToUpdate, triplogToUpdate._id).subscribe(data => {
      this.getTriplogs();
      this.cancelEdit();
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
