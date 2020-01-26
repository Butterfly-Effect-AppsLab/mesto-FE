import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DeparturesService {

  public lineDeparturesEndpoint = environment.apiUrl + 'line_departures/';
  public linesAtStopDeparturesEndpoint = environment.apiUrl + 'departures/';
  public platformsEndpoint = environment.apiUrl + 'platform/directions';
  public platformDirectionsEndpoint = environment.apiUrl + 'platform/directions/';
  public lineDepartures: any;
  public linesAtStopsDepartures: any;
  public platform: any = [];
  public platformDirs: any;

  constructor(public http: HttpClient) { }

  /*
  *   Data service to fetch data about departures single line
  *   Usage at Favourite page
  *
  */
  private fetchLineDepartures$(idLine, idDirection, idStop): Observable<any> {
    return this.http.get(
      this.lineDeparturesEndpoint + idLine + '/' + idDirection + '/' + idStop).pipe(
        map(data1 => {
          this.lineDepartures = data1;
          return data1;
        })
    );
  }

  public getLineDepartures(idLine, idDirection, idStop) {
    return this.fetchLineDepartures$(idLine, idDirection, idStop);
  }

  /*
  *   Data service to consume data about lines at one stop.
  *   Usage at Favourite page, Virtual table at stop detail page
  *
  */
  private fetchLinesDeparturesAtStop$(idStop): Observable<any> {
    return this.http.get(this.linesAtStopDeparturesEndpoint + idStop).pipe(
      map(data => {
        this.linesAtStopsDepartures = data;
        return data;
      })
    );
  }

  public getLinesDeparturesAtStop(idStop) {
    return this.fetchLinesDeparturesAtStop$(idStop);
  }

  public fetchPlatform$(): Observable<any> {
    return this.http.get(this.platformsEndpoint).pipe(
      map(dataP => {
        this.platform = dataP;
        console.log(dataP);
        return dataP;
      })
    );
  }

  public getPlatforms() {
    return this.fetchPlatform$();
  }

  private fetchDirectionsInOneDir$(idPlatform): Observable<any> {
    return this.http.get(this.platformDirectionsEndpoint + idPlatform).pipe(
      map(datas => {
        this.platformDirs = datas;
        // console.log('serv: ' + ;
        return datas;
      })
    );
  }

  public getVirtualTableOneDirection(idPlatform) {
    return this.fetchDirectionsInOneDir$(idPlatform);
  }
}
