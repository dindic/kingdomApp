import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { City } from '../datos/class.city';


@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.sass']
})

export class NewCityComponent implements OnInit {

  @Input() city: City;
  @Input() mode: string;

  @Output() addCityEvent = new EventEmitter();
  @Output() modifyCityEvent = new EventEmitter();
  @Output() addDistrictEvent = new EventEmitter();
  @Output() closeModalCity = new EventEmitter();
  @Output() deleteCityEvent = new EventEmitter();

  newCityForm: FormGroup;

  constructor() { }

  ngOnInit() {

    if (this.mode === 'new') {
      this.newCityForm = new FormGroup({
        'name': new FormControl(null),
        'alignment': new FormControl('LG')
      });
    } else {
      this.newCityForm = new FormGroup({
        'name': new FormControl(this.city.name),
        'alignment': new FormControl(this.city.alignment)
      });
    }
  }

  private close() {
    this.closeModalCity.emit();
  }

  private aceptarCity() {
    if (this.mode === 'new') {
      const newCity: City = new City(
        this.newCityForm.value.name,
        this.newCityForm.value.alignment
      );

      this.addCityEvent.emit(newCity);
    } else {
      this.city.name = this.newCityForm.value.name;
      this.city.alignment = this.newCityForm.value.alignment;

      this.modifyCityEvent.emit(this.city);
    }

    this.closeModalCity.emit();
  }

  private addDistrict() {
    this.addDistrictEvent.emit();
    this.closeModalCity.emit();
  }
}
