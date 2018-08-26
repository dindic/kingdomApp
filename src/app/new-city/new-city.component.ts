import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { City } from '../datos/class.city';


@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.sass']
})

export class NewCityComponent implements OnInit {


  @Output() addCityEvent = new EventEmitter();
  @Output() closeModalCity = new EventEmitter();
  @Output() deleteCityEvent = new EventEmitter();

  newCityForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.newCityForm = new FormGroup({
      'name': new FormControl(null),
      'alignment': new FormControl('LG')
    })
  }

  private close() {
    this.closeModalCity.emit();
  }

  private addNewCity() {
    const newCity: City = new City(
      this.newCityForm.value.name,
      this.newCityForm.value.alignment
    );

    //console.log(newCity);
    this.addCityEvent.emit(newCity);
    this.closeModalCity.emit();
  }

}
