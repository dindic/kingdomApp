import { Component, OnInit } from '@angular/core';
import { District } from '../datos/class.city.district';
import { Neighbours } from '../datos/class.city.neighbourhood';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  neighbourhood: Neighbours;
  constructor() {
    this.neighbourhood = {
      fullLots: 3,
    };
   }

  ngOnInit() {
  }

}
