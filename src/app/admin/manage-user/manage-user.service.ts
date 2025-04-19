import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/create-request-option';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private http: HttpClient) { }

  getUser(req: any): Observable<any> {
    const params = createRequestOption(req);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.get<any>(`${environment.url}/user/list`, {headers, params, observe: 'response' });
  }

  public getUserId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url}/user/${id}`);
  }

  deleteUser(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.delete<any>(`${environment.url}/user/${id}`, {headers});
  }
}
