import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinesService {

  public linesEndpoint = environment.apiUrl + 'lines';
  private linesData;
  public lineDirectionsEndpoint = environment.apiUrl + 'lines/line/';
  private linesDirections;

  constructor(private http: HttpClient) { }

  public fetchLines$(): Observable<any> {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Access-Control-Allow-Origin', '*');

    return this.http.get(this.linesEndpoint, {headers}).pipe(
      map(data => {
        console.log(data);
        this.linesData = data;
        return data;
      })
    );
  }

  public getLinesData() {
    return this.linesData;
  }

  public fetchLineDirections$(idLine): Observable<any> {
    return this.http.get(this.lineDirectionsEndpoint + idLine);
  }

}
