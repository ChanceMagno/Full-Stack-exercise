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
  }

  checkToken(){
     if(this.authToken === ""){
       return false;
    } else return true;
  }

  getAuthToken(){
    this.http.get(this.authTokenUrl).map((res: Response) => res.json())
    .subscribe(data =>{
      if(this.authToken !== data.token){
        console.log("token is same")
        this.authToken = "Bearer " + data.token;
        this.headers.append("authorization", this.authToken);
        this.options = new RequestOptions({headers: this.headers});
      } else {console.log("error")}
    });
  }

  getTripLogs(){
    return this.http.get(this.triplogsUrl, this.options)
   .map(res => res.json());
  }

  deleteTripLog(id : string){
    return this.http.delete(this.triplogsUrl + '/' + id, this.options).map(res => res);
  }

  createTripLog(data: any){
    return this.http.post(this.triplogsUrl, data, this.options).map(res => res.json());
  }

  updateTriplog(data: any, id){
    return this.http.put(this.triplogsUrl + '/' + id, data, this.options)
    .map( res => res.json());
  }
}
