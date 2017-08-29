import { Component, OnInit } from '@angular/core';
import { TriplogsApiService } from './services/triplogs-api-service/triplogs-api.service';
import { Router } from '@angular/router';

// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  private triplogs: any;
  constructor(private triplogsApiService: TriplogsApiService, private router: Router) {
  }

  ngOnInit(){
    this.getAuthToken();
  }

  getAuthToken(){
    this.triplogsApiService.getAuthToken();
  }

  getTriplogs() {
    this.triplogsApiService.getTripLogs().subscribe(data => {
      this.triplogs = Object.keys(data).map(function (key) { return data[key]; });
    })
  }

  routeToTriplogs(){
    // this.router.navigate(['triplogs/']);
  }


}
