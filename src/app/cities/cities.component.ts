import { City } from './../datos/class.city';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { KingdomService } from './../kingdom.service';
import { Kingdom } from './../datos/class.kingdom';
import { District } from '../datos/class.city.district';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { BUILDINGS } from '../datos/mock.buildings.list';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Neighbours } from '../datos/class.city.neighbourhood';
import { ViewChild } from '@angular/core';
import { AddBuildingComponent } from '../add-building/add-building.component';

@Component({
  selector: 'app-cities',
  providers: [KingdomService],
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.sass']
})
export class CitiesComponent implements OnInit, OnDestroy {

  public cities: City[];
  public show_city = false;
  public markedCity = 0;
  public markedDistrict = -1;

  public buildings: String[];
  public BUILDINGS = BUILDINGS;
  show_district = false;

  modalRef: NgbModalRef;

  kingdom$: Observable<Kingdom>;
  kingdomSubscription: Subscription;
  kingdomSubscriptionUpdate: Subscription;
  // kingdom: Kingdom;
  idKing: String;
 
  errors: String[];

  iconColorGrey = true;
  iconColorGrey2 = true;

  @ViewChild(AddBuildingComponent) 
  private addBuildModal: AddBuildingComponent;

  constructor(private route: ActivatedRoute, private kingdomService: KingdomService, private modalService: NgbModal) { }

  ngOnInit() {
    this.idKing = this.route.snapshot.params['idc'];

    this.kingdomSubscription = this.getKingdom(this.idKing).subscribe((kingdom) => {
      // this.kingdom = kingdom;
      this.cities = kingdom.cities;

      this.cities.forEach((city) => {
        city.districts.forEach((district) => {
          this.calculateDistrict(district);
        });
      });

    });
  }

  getKingdom(ididKingdom) {
    this.kingdom$ = this.kingdomService.getKingdomById(ididKingdom);
    return this.kingdom$;
  }

  setKingdom(): void {
    this.kingdomService.setKingdomCities(this.cities);
  }

  updateCity(city: City) {
    // this.cities.forEach(function (value) {
    //   if (value.id === leader.id) {
    //     value = leader;
    //     console.log('Value: ' + value.id + ' -- ' + leader.id);
    //   }
    // });
    // this.leaders.forEach(function (value) {
    //   if ( value.id === 'Ruler') {
    //     console.log('Value: ' + value.vacancy);
    //   }
    // });
    // this.setKingdom();
  }

  public showCity() {
    if (this.show_city) {
      this.show_city = false;
    } else {
      this.show_city = true;
    }
  }

  getBuildings(district: District): number {
    let total = 0;
    district.neighbours.forEach(neigh => {
      //total += neigh.buildings.length;
    });
    return total;
  }

  markCity(i) {
    if (this.markedCity !== i ) {
      this.markedCity = i;
      this.markedDistrict = -1;
    }
  }

  getValD(j) {
    this.markedDistrict = j;
  }

  addBuilding(content): void {
    // this.buildingForm.controls['name'].setValue();
    //this.addBuildModal.addBuilding(content);
    this.modalRef = this.modalService.open(content);
  }

  addBuildingAccept(id) {
    console.log('Add building' + id);
   
    this.cities[this.markedCity].districts[this.markedDistrict].buildings.push(this.BUILDINGS[id].id);

    // console.log(this.cities);
    this.updateCitiesById(true);
    //this.addBuildModal.close();
    this.modalRef.close();
  }

  deleteBulding(nId: number) {
    console.log(nId + ' ---- ');
   
    this.cities[this.markedCity].districts[this.markedDistrict].buildings.splice(nId, 1);
    console.log(this.cities[this.markedCity].districts[this.markedDistrict].neighbours[nId]);
    this.updateCitiesById(true);
  }

  updateCitiesById(validar: boolean) {
    if (!validar || this.validarDistrict(this.cities[this.markedCity].districts[this.markedDistrict])) {
      console.log('Es valid');
      console.log(this.cities);
      this.kingdomSubscriptionUpdate = this.kingdomService.updateCitiesById(this.cities, this.idKing).subscribe((kingdom) => {

        this.cities[this.markedCity].districts[this.markedDistrict] =
                this.calculateDistrict(kingdom.cities[this.markedCity].districts[this.markedDistrict]);
      });
    }
  }

  validarDistrict(district: District): Boolean {
    let valid = true;
    let totalLots = 0;
    this.errors = [];
    if (district.neighbours.length > 9) {
      this.errors.push('This building doesnt fit in this city');
      valid = false;
    }

    if (valid) {
      for (let i = 0; i < district.neighbours.length; i++) {
        const dist = district.neighbours[i];
        totalLots += dist.fullLots;
      }
      if (totalLots > 36 ) {
        valid = false;
        this.errors.push('This district is full. Demolish first');
      }
    }

    return valid;
  }

  private calculateDistrict(district: District): District {

    // Calculate population
    district.population = 0;
    for (let i = 0; i < district.neighbours.length; i++) {
      if (district.neighbours[i].fullLots === 4) {
        district.population += 250;
      }
    }
    return district;
  }

  private addCity(content) {
    this.modalRef = this.modalService.open(content);
  }

  ngOnDestroy(): void {
    
    this.kingdomSubscription.unsubscribe();
  

    if(this.kingdomSubscriptionUpdate) {
      this.kingdomSubscriptionUpdate.unsubscribe();
    }
  }

  addNewCity(newCity: City) {
    this.cities.push(newCity);
  }

  private toggleColor() {
    console.log('toggle');
    this.iconColorGrey = !this.iconColorGrey;
  }

  public editCity(nId: number) {
    console.log('Edit mode');
  }

  public deleteCity(nId: number) {
    console.log('Delete mode');
    if(confirm('You sure?')){
      this.cities.splice(nId,1);
    }
  }

}
