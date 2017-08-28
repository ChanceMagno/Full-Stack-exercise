import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public Server = 'http://localhost:3000/';
  public ApiUrl = 'api/triplogs';
  public ServerWithApiUrl = this.Server + this.ApiUrl;
  private data: any = {};
  private headers = new Headers();
  private authToken = '';
  private options;

  constructor(public http: Http) {
    console.log("constructor");
    this.authToken = "Bearer BIFLE";
    this.headers.append("authorization",this.authToken);
    this.options = new RequestOptions({headers: this.headers})
    this.getData();
  }

  getData(){
    this.http.get(this.ServerWithApiUrl, this.options).map((res: Response) => res.json()).subscribe(data =>{
      console.log(data);
      this.data = data;
    })
  }



}
