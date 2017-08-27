import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public Server = 'http://localhost:5000/';
  public ApiUrl = 'api/';
  public ServerWithApiUrl = this.Server + this.ApiUrl;

  constructor(public http: Http) {
    
  }
}
