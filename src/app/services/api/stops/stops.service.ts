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
  private stopsData: any;

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

}
