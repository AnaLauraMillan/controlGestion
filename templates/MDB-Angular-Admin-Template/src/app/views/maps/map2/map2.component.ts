import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map2',
  templateUrl: './map2.component.html',
  styleUrls: ['./map2.component.scss']
})
export class Map2Component implements OnInit {
  center: google.maps.LatLngLiteral = {
    lat: 51.678418,
    lng: 7.809007,
  };

  marker = {
    position: { lat: 51.678418, lng: 7.809007 },
  };

  constructor() { }

  ngOnInit() {
  }

}
