import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';




@Injectable()
export class TriplogsApiService {
  private baseUrl = 'http://localhost:3000/api/';
  private authTokenUrl = this.baseUrl + 'token';
  private triplogsUrl = this.baseUrl + 'triplogs';
  private triplogsStatsUrl = this.baseUrl + "/stats";
  private data: any = {};
  private headers = new Headers();
  private authToken: string;
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
        this.headers = new Headers();
        this.authToken = "Bearer " + data.token;
        this.headers.append("authorization", this.authToken);
        this.options = new RequestOptions({headers: this.headers});
    });
  }

  getTripLogs(){
    return this.http.get(this.triplogsUrl, this.options)
   .map(res => res.json()).catch(this.handleError);
  }

  getTriplogsStats(){
    return this.http.get(this.triplogsStatsUrl, this.options)
    .map(res => res.json()).catch(this.handleError)
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

  handleError(error: Response){
    console.log(error);
    return Observable.throw(error || 'Server Error');
  }
}
