import { Component, OnInit } from '@angular/core';
import { MaterializeModule } from "angular2-materialize";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-triplog',
  templateUrl: './add-triplog.component.html',
  styleUrls: ['./add-triplog.component.css']
})
export class AddTriplogComponent implements OnInit {
  newTriplogForm: FormGroup;
  tripModes: string[] = ["Bike", "Walk", "Carpool", "Drove Alone", "Vanpool", "Telework", "Transit"];
  currentDate = new Date();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.instantiateForm();
  }

  instantiateForm(){
    this.newTriplogForm = this.formBuilder.group({
      category: ['', Validators.required],
    })
  }

}
