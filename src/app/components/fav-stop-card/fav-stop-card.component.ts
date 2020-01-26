import { Component, OnInit, Input } from '@angular/core';
import { DeparturesService } from 'src/app/services/api/departures/departures.service';

@Component({
  selector: 'fav-stop-card',
  templateUrl: './fav-stop-card.component.html',
  styleUrls: ['./fav-stop-card.component.scss'],
})
export class FavStopCardComponent implements OnInit {

  @Input() favStopsData;
  favStop;

  constructor(
    private departureService: DeparturesService
  ) { }

  ngOnInit() {

    // console.log(this.favStopsData);
    this.departureService.getLinesDeparturesAtStop(this.favStopsData).
      subscribe(
        res => {
          this.favStop = res;
          // console.log(res);
      });

  }

}
