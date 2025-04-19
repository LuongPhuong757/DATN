import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { createRequestOption } from 'src/app/create-request-option';

export interface database {
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiProcessService {

  constructor(public http: HttpClient) { }

  getProduct(req: any): Observable<any> {
    const params = createRequestOption(req);
    return this.http.get<any>(`${environment.url}/product`, { params, observe: 'response' });
  }

  public getProductDetail(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url}/product/${id}`);
  }

  public addProductToCart(req: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '  + sessionStorage.getItem('token')
      })
    };
    return this.http.post<any>(`${environment.url}/cart`, req, httpOptions);
  }

  getProject(req: any): Observable<any> {
    const params = createRequestOption(req);
    return this.http.get<any>(`${environment.url}/product`, { params, observe: 'response' });
  }

}
