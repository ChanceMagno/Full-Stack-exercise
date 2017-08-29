import { Component, OnInit } from '@angular/core';
import { TriplogsApiService } from '../services/triplogs-api-service/triplogs-api.service';
import { DatePipe } from '@angular/common';
import { DayLimitPipe } from '../day-limit.pipe'
import { Router } from '@angular/router';



@Component({
  selector: 'app-all-triplogs',
  templateUrl: './all-triplogs.component.html',
  styleUrls: ['./all-triplogs.component.css']
})
export class AllTriplogsComponent implements OnInit {
  private triplogs: any;
  private sortedTripLogs: any = [];

  constructor(private triplogsApiService: TriplogsApiService, private router: Router) { }

  ngOnInit() {
    this.getTriplogs();
  }

  getTriplogs() {
    this.triplogsApiService.getTripLogs().subscribe(data => {
      this.triplogs = Object.keys(data).map(function (key) { return data[key]; });
      error => console.log(error);
    })
  }

  editTripLog(id: string){
   this.router.navigate(['triplogs/:id']);
  }


}
