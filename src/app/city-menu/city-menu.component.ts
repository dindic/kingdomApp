import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-city-menu',
  templateUrl: './city-menu.component.html',
  styleUrls: ['./city-menu.component.css']
})
export class CityMenuComponent implements OnInit {
  
  @Input() idKing;
  @Output() saveCityEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public saveCity(){
    this.saveCityEvent.emit('Save');
  }
}
