import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {createRequestOption} from "../../create-request-option";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getOrderStatistical(): Observable<any> {
    return this.http.get<any>(`${environment.url}/order/statistical`, {  observe: 'response' });
  }

  getRevenue(): Observable<any> {
    return this.http.get<any>(`${environment.url}/order/statistical-revenue`, {  observe: 'response' });
  }

  getUserStatistical(): Observable<any> {
    return this.http.get<any>(`${environment.url}/user/statistical`, {  observe: 'response' });
  }
}
