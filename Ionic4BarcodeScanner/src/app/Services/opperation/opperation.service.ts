import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OpperationService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers' : '*'
    })
  }
  payOpperation(opperation)
  {
     return this.http.post("http://192.168.43.23:3000/fuel-invoice",opperation,this.httpOptions);
  }
}
