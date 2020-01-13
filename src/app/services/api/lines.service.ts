import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinesService {

  public linesEndpoint =
         '/lines';
  private linesData;

  constructor(private http: HttpClient) { }

  public fetchLines(): Observable<any> {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Access-Control-Allow-Origin', '*');


    this.linesData = this.http.get(this.linesEndpoint, {headers});

    return this.linesData;
  }


}
