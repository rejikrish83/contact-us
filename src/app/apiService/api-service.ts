import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your-access-token',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    })
  };

  // Function to make a POST request
  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact-messages`, data,this.httpOptions);
  }

  postMessageToTopic(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/publish`, data,this.httpOptions);
  }
}
