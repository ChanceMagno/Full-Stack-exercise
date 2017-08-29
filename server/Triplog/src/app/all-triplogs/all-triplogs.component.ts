import { Component, OnInit } from '@angular/core';
import { TriplogsApiService } from '../services/triplogs-api-service/triplogs-api.service';


@Component({
  selector: 'app-all-triplogs',
  templateUrl: './all-triplogs.component.html',
  styleUrls: ['./all-triplogs.component.css']
})
export class AllTriplogsComponent implements OnInit {
  private triplogs: any;

  constructor(private triplogsApiService: TriplogsApiService) { }

  ngOnInit() {
    this.getTriplogs();
  }

  getTriplogs() {
    this.triplogsApiService.getTripLogs().subscribe(data => {
      this.triplogs = Object.keys(data).map(function (key) { return data[key]; });
    })
  }

}
