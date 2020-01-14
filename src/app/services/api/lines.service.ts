import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinesService {

  public linesEndpoint =
         'http://test-env.dvjtpw52wm.us-east-1.elasticbeanstalk.com/lines';
  private linesData;
  public lineDirectionsEndpoint =
      'http://test-env.dvjtpw52wm.us-east-1.elasticbeanstalk.com/lines/line/';
  private lineDirections;

  constructor(private http: HttpClient) { }

  private fetchLines$(): Observable<any> {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Access-Control-Allow-Origin', '*');

    this.linesData = this.http.get(this.linesEndpoint, {headers});
    console.log(this.linesData);
    return this.linesData;
  }

  public getLinesData() {
    const lines = this.fetchLines$().pipe(
      map(response => {
        return response;
      })
    );
    // console.log(lines);
    return lines;
  }

  public fetchLineDirections$(idLine): Observable<any> {
    this.lineDirections = this.http.get(this.lineDirectionsEndpoint + idLine);
    // console.log(this.lineDirections);
    return this.linesDirections;
  }

}
