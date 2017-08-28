import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Triplog } from '../../Triplog';
import 'rxjs/add/operator/map';

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
    this.http.get(this.authTokenUrl).map((res: Response) => res.json()).subscribe(data =>{
      // TODO:  need to store token
      this.authToken = data.token;
      this.headers.append("authorization", this.authToken);
      this.options = new RequestOptions({headers: this.headers})
      console.log(this.authToken);
    })
  }

  getTripLogs(){
    this.http.get(this.triplogsUrl, this.options).map((res: Response) => res.json()).subscribe(data =>{
    this.data = data;
    console.log(data);
      })
  }

  deleteTripLog(Id : string){
    this.http.delete(this.triplogsUrl + '/' + Id).map((res: Response) => res.text()).subscribe(data =>{
      this.data = data;
    })
  }

  createTripLog(data: any){
    //TODO: convert Triplog to JSON
    this.authToken = 'Bearer BIFLE';
    this.headers.append("authorization", this.authToken);
    this.options = new RequestOptions({headers: this.headers})
    this.http.post(this.triplogsUrl, data, this.options).map((res: Response) => res.json()).subscribe(data => {
      this.data = data;
    })
  }

  updateTriplog(updatedTripLog: Triplog, id){
    //TODO: convert Triplog to JSON
    this.http.put(this.triplogsUrl + id, updatedTripLog).map((res: Response) => res.json()).subscribe(data =>{
      this.data = data;
    })
  }
}