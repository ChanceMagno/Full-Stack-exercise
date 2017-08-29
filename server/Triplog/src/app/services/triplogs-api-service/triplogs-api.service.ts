import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TriplogsApiService {
  private baseUrl = 'http://localhost:3000/api/';
  private authTokenUrl = this.baseUrl + 'token';
  private triplogsUrl = this.baseUrl + 'triplogs';
  private data: any = {};
  private headers = new Headers();
  private authToken = '';
  private options;


  constructor(public http: Http) {
    // this.authToken = 'Bearer BIFLE';
    // this.headers.append("authorization", this.authToken);
    // this.options = new RequestOptions({headers: this.headers})
  }

  getAuthToken(){
    this.http.get(this.authTokenUrl).map((res: Response) => res.json())
    .subscribe(data =>{
      // TODO:  need to store token
      this.authToken = "Bearer " + data.token;
      this.headers.append("authorization", this.authToken);
      this.options = new RequestOptions({headers: this.headers})
      })
  }

  getTripLogs(){
    return this.http.get(this.triplogsUrl, this.options)
   .map(res => res.json())
  }

  deleteTripLog(id : string){
    return this.http.delete(this.triplogsUrl + '/' + id).map((res: Response) => res.text()).subscribe(data =>{
      this.data = data;
    })
  }

  createTripLog(data: any){
    this.authToken = 'Bearer BIFLE';
    this.headers.append("authorization", this.authToken);
    this.options = new RequestOptions({headers: this.headers})
    this.http.post(this.triplogsUrl, data, this.options).map((res: Response) => res.json()).subscribe(data => {
      this.data = data;
    })
  }

  updateTriplog(data: any, id){
    this.http.put(this.triplogsUrl + id, data).map((res: Response) => res.json()).subscribe(data =>{
      this.data = data;
    })
  }
}
