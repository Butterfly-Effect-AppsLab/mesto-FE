import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlovnaftService {

  public urlEndpoint = 'https://gate.slovnaftbajk.sk/AppGate2.php';
  private listBikesSpots;

  constructor(private http: HttpClient) { }

// service ma svoje api, toto vytaiohnut do zlvast suboru slovnaft.api.ts
// dolar za nazov metody hovori, ze return type je observable
  private fetchData$(): Observable<any> {

    this.listBikesSpots = this.http.post(this.urlEndpoint,
      {
        Cmd : 'GetAllStationInfo',
        Area: 'BA'
      }
    );

    return this.listBikesSpots;
  }

  public getData() {

    const pom = this.fetchData$().pipe(
      map(response => {
        return response;
      })
    );
    return pom;
  }

}
