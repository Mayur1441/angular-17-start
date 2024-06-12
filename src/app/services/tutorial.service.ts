import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tutorial} from '../models/tutorial.model';
import {LocalService} from "./local.token";

const baseUrl = 'http://localhost:8080/api/rides';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private http: HttpClient, private localStore: LocalService) {
  }
  loginDetails = JSON.parse(this.localStore.getData('logindetails') + '');

  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrl);
  }

  getAllNotTakenRides(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}/nottaken`, {headers: {'x-access-token': this.loginDetails.accessToken}});
  }

  getMyAllRides(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}/getmyallrides`, {headers: {'x-access-token': this.loginDetails.accessToken}});
  }

  get(id: any): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  takeride(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/take/${id}`, data, {headers: {'x-access-token': this.loginDetails.accessToken}});
  }

  completeride(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/complete/${id}`, data, {headers: {'x-access-token': this.loginDetails.accessToken}});
  }

  cancelride(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/cancel/${id}`, data, {headers: {'x-access-token': this.loginDetails.accessToken}});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }
}
