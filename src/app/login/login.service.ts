import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(public http: HttpClient) {}

  public login(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url}/user/login`, data);
  }

  public signUp(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url}/user/signup`, data);
  }
}
