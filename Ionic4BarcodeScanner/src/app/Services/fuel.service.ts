import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {FuelType} from '../Entities/fuel-type.enum';
@Injectable({
  providedIn: 'root'
})
export class FuelService {

  constructor(private http: HttpClient ) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers' : '*'
    })
  }
 
  getFuelPricePerLiter()
  {
    return this.http.get("http://192.168.1.2/FuelPricePerLiterByFuelType.php",this.httpOptions);
  }
}
