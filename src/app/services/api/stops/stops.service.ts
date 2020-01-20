import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StopsService {

  public stopsEndpoint = environment.apiUrl + 'stops';
  public stopLinesEndpoint = environment.apiUrl;
  private stopsData: any;
  private stopLines: any;
  private stopId: any;

  constructor(private http: HttpClient) { }

  private fetchStops$(): Observable<any> {

    return this.http.get(this.stopsEndpoint).pipe(
      map(data => {
        this.stopsData = data;
        return data;
      })
    );
  }

  public getStopsData() {

    return this.fetchStops$();

  }

  private fetchStopLines$(stopId): Observable<any> {

    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    headers.set('Content-Type', 'application/json');

    return this.http.get(
      this.stopLinesEndpoint + 'stops/stop/' + stopId + '/lines', {headers}).
      pipe(
        map( data => {
          this.stopLines = data;
          return data;
        })
    );

  }

  public getStopLines(stopId) {
    return this.fetchStopLines$(stopId);
  }

}
