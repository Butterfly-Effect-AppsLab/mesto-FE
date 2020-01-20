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
  public singleLineEndpoint = environment.apiUrl + 'lines/line/';
  private singleLine;

  constructor(private http: HttpClient) { }

  public fetchLines$(): Observable<any> {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Access-Control-Allow-Origin', '*');

    return this.http.get(this.linesEndpoint, {headers}).pipe(
      map(data => {
        // console.log(data);
        this.linesData = data;
        return data;
      })
    );
  }

  public getLinesData() {
    return this.linesData;
  }

  public fetchLineDirections$(lineNumber, idDirection): Observable<any> {
    return this.http.get(
      this.lineDirectionsEndpoint + lineNumber + '/' + idDirection).pipe(
      map(data => {
        this.linesDirections = data[0];
        // console.log(data[0].stops);
        return data[0];
      })
    );
  }

  public fetchSingleLine$(lineNumber): Observable<any> {
    return this.http.get(this.singleLineEndpoint + lineNumber).pipe(
      map(data => {
        this.singleLine = data;
        return data;
      })
    );
  }

}
