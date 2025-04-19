import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import {createRequestOption} from "../../create-request-option";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(public http: HttpClient) { }

  getCart(req: any): Observable<any> {
    const params = createRequestOption(req);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '  + sessionStorage.getItem('token')
      }),
      params: params
    };
    return this.http.get<any>(`${environment.url}/cart`, httpOptions);
  }

  updateProductToCart(id: string, req: any):Observable<any> {
    const params = createRequestOption(req);
    return this.http.put<any>(`${environment.url}/cart/${id}`, params);
  }

  deleteProductInCart(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '  + sessionStorage.getItem('token')
      })
    };
    return this.http.delete<any>(`${environment.url}/cart/${id}`, httpOptions);
  }

  public addOrder(req: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '  + sessionStorage.getItem('token')
      })
    };
    return this.http.post<any>(`${environment.url}/order`, req, httpOptions);
  }
}
