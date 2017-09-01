import { Component, OnInit, Input } from '@angular/core';
import { MaterializeModule } from "angular2-materialize";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TriplogsApiService } from '../services/triplogs-api-service/triplogs-api.service';
import * as moment from 'moment'


@Component({
  selector: 'app-add-triplog',
  templateUrl: './add-triplog.component.html',
  styleUrls: ['./add-triplog.component.css']
})
export class AddTriplogComponent implements OnInit {
  private newTriplogForm: FormGroup;
  private tripModes: string[] = ["Bike", "Walk", "Carpool", "Drove Alone", "Vanpool", "Telework", "Transit"];
  private currentDate = new Date();
  private warning: string = "Please Fill Out All fields"
  private Materialize: any;
  @Input() lastTriplog: any;



  constructor(private formBuilder: FormBuilder, private triplogsApiService: TriplogsApiService) { }

  ngOnInit() {
    this.instantiateForm();
  }

  instantiateForm(){
    this.newTriplogForm = this.formBuilder.group({
      mode: ['', Validators.required],
      miles: ['', Validators.required],
      time: ['', Validators.required]
    })
  }

  validateForm(){
    var {mode, miles} = this.newTriplogForm.value;
    if(miles === null && mode === "Telework" || miles !== null && mode !== "" || miles < 0 && mode === "Telework"){
      return "waves-effect waves-light btn green right-align"
    }  else {
      return "waves-effect waves-light btn green right-align disabled"
    }
  }

  checkSaveOrUpdate(){
    var {mode, miles, time} = this.newTriplogForm.value;
    this.setDateTime(time)
    if(this.lastTriplog === undefined || this.lastTriplog.segments[0].mode === ""){
      this.createNewTriplog();
    } else {
      this.updateTriplog()
    }
  }

   setDateTime(time: string) {
     var setTime = moment(time, ["h:mm A"]).format("HH:mm:ss");
     var date = moment().format('MM/DD/YYYY');
     var dateTime = moment(date + ' ' + setTime, 'MM/DD/YYYY HH:mm:ss');
      return dateTime;
    }

  updateTriplog(){
    var {mode, miles, time} = this.newTriplogForm.value;
    var dateTime = this.setDateTime(time);
    mode = mode.toLowerCase();
    var triplogToUpdate = {
      mode: mode,
      miles: miles,
      dateTime: dateTime,
    };
    this.lastTriplog.segments.push(triplogToUpdate)
    this.lastTriplog.updated = this.currentDate;
    this.triplogsApiService.updateTriplog(this.lastTriplog, this.lastTriplog._id).subscribe(data => {
      error => console.log(error);
    })
  }

  createNewTriplog(){
    var currentDate = this.currentDate;
    var {mode, miles, time} = this.newTriplogForm.value;
    var dateTime = this.setDateTime(time);
    mode = mode.toLowerCase();
    let data: any =  {
      date: this.currentDate,
      updated: this.currentDate,
      created: this.currentDate,
      segments: [
          {
            mode: mode,
            miles: miles,
            dateTime: dateTime,
          }
      ]
    }
    this.triplogsApiService.createTripLog(data).subscribe(data => {
      error => console.log(error);
    })

  }



}
