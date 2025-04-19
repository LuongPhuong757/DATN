import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {createRequestOption} from "../../create-request-option";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class ManageOrderService {

  constructor(private http: HttpClient) { }

  getOrder(req: any): Observable<any> {
    const params = createRequestOption(req);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.get<any>(`${environment.url}/order`, {headers, params, observe: 'response' });
  }

  deleteOrder(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.delete<any>(`${environment.url}/order/${id}`, {headers, observe: 'response' });
  }
}
