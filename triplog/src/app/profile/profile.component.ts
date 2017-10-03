import { Component, OnInit } from '@angular/core';
import { TriplogsApiService } from '../services/triplogs-api-service/triplogs-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private stats: any;
  private triplogs: any;
  private dollarsSaved: number;
  private bikeKiloTravelled: any;
  private totalKiloTravelled: any;

  constructor(private triplogsApiService: TriplogsApiService, private router: Router) { }

  ngOnInit() {
    this.getUserStats();
    this.getAllTriplogs();
  }

  getUserStats(){
    this.triplogsApiService.getTriplogsStats().subscribe(data => this.formatStats(data),
    err => this.handleError(err)
    );
  }

  formatStats(data: any){
     this.dollarsSaved = Math.round(data.dollarsSaved);
     this.bikeKiloTravelled = this.toKilo(data.bikeMiles);
     this.totalKiloTravelled = this.toKilo(data.totalMiles);
  }

  toKilo(miles: number){
    return (miles * 1.60934).toFixed(2);
  }

  getAllTriplogs(){
    this.triplogsApiService.getTripLogs().subscribe(data => console.log(data), 
    err => this.handleError(err)
    );
  }

  handleError(error: any) {
    if(error.status === 401) {
      this.router.navigate(['/']);
    }
  }

}
