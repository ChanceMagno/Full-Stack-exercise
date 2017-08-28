import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class TriplogsApiService {
  private Server = 'http://localhost:3000/';
  private ApiUrl = 'api/token';
  private ServerWithApiUrl = this.Server + this.ApiUrl;
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
