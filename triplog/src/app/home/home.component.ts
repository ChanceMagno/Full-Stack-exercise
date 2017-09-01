import { Component, OnInit } from '@angular/core';
import { TriplogsApiService } from '../services/triplogs-api-service/triplogs-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private triplogsApiService: TriplogsApiService, private router: Router) { }

  ngOnInit() {
    this.getAuthToken();
  }

  getAuthToken(){
    this.triplogsApiService.getAuthToken();
  }

  routeToTriplogs(){
    this.router.navigate(['triplogs/']);
  }

}
