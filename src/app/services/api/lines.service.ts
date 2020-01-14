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
