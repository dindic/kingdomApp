import { District } from './../datos/class.city.district';
import { KingdomService } from './../kingdom.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Neighbours } from '../datos/class.city.neighbourhood';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { Kingdom } from './../datos/class.kingdom';
import { forEach } from '@angular/router/src/utils/collection';
import { BUILDINGS_STRUCTURE } from '../datos/mock.buildings.structure';
import { Building } from '../datos/class.city.building';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BuildingGridUnit } from '../datos/class.building.grid';
import { Subscription } from 'rxjs/Subscription';
import { BUILDINGS } from '../datos/mock.buildings.list';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css'],
  providers: [ KingdomService ]
})
export class DistrictComponent implements OnInit, OnDestroy {
  neighbourhoods: Neighbours[];
  b = BUILDINGS_STRUCTURE;
  districts:  District[];
  districSelected: District;
  kingdom$: Observable<Kingdom>;
  errors: string[];
  modalRef: NgbModalRef;
  lotSelected: number;

  idCity: any;
  idKing: any;
  idDistrict: any;

  districtSubscription: Subscription;

  constructor(private route: ActivatedRoute, public kingdomService: KingdomService, private modalService: NgbModal) {
    
   }


  ngOnInit() {
    this.idDistrict = this.route.snapshot.params['idd'];
    this.idCity = this.route.snapshot.params['idc'];
    this.idKing = this.route.snapshot.params['idk'];

    this.kingdom$ = this.kingdomService.getKingdomById(this.idKing);
    this.kingdom$.subscribe((kingdom) => {

      this.districts = kingdom.cities[this.idCity].districts;
      this.districSelected = this.districts[this.idDistrict];
      console.log(this.districts[this.idDistrict].buildingGrid );
      this.b.forEach(b => b.value = '');
      if ( this.districts[this.idDistrict].buildingGrid ) {
        this.districts[this.idDistrict].buildingGrid.forEach(bgrid => {
          for (let i = 0; i < this.b.length; i++) {
            if (this.b[i].id === bgrid.id) {
              console.log('One found:' + bgrid.id + ' --- ' + bgrid.value);
              this.b[i].value = bgrid.value;
            }
          }
        });
      }
      console.log(this.b);
    });

    //this.district = this.kingdomService.getDistrict(idCity, idDistrict);
  }



  addBuilding(content, lot: number): void {
    this.lotSelected = lot;
    console.log(lot);
    this.modalRef = this.modalService.open(content);
  }

  addBuildingAccept(building: Building) {

    let auxId = this.b[this.lotSelected].id;
    //Comprovamos que tiene espacio para poner el edificio
    let auxY =  auxId.substr(1,2);
    let auxX = auxId.substr(0,1);
    let Y: number = +auxY;
    let X: number = +auxX;
    console.log(Y);
    this.errors = [];
    
    if(building.lots == 2 ) {
      if(Y + 1 < 6 ) {
        let p: string = auxX + (Y + 1)
        //alert(X + '  --  ' + Y);
        //alert(p + '  -->' +this.b.find(b => b.id == p).value);
        if(this.b.find(b => b.id == p).value !== '') {
          this.errors.push('11El edificio seleccionado ocupa 2 espacios. Seleccione una casilla correcta, o elimine el edificio contiguo');
        }
      } else {
        this.errors.push('22El edificio seleccionado ocupa 2 espacios. Seleccione una casilla correcta, o elimine el edificio contiguo');
      }
    }
    
    if (building.lots == 4) {
      let valid: boolean = false;
      Y = +auxY;
      if(Y+1 < 6 && this.b.find(b => b.id == (auxX + (Y + 1))).value !== '' && this.b.find(b => b.id == ((X + 1).toString() + (Y).toString())).value !== '' &&
        this.b.find(b => b.id == ((X + 1).toString() + (Y + 1).toString())).value !== '') {
          this.errors.push('El edificio seleccionado ocupa 4 espacios. Seleccione una casilla correcta, o elimine el edificio contiguo');
        }
    }

    //Si no hay eerores seguimos validaciones
    if (this.errors.length === 0) {
      this.checkLimit(building, this.lotSelected, X, Y, auxX, auxY);
    }


    if (this.errors.length === 0) {
      this.b[this.lotSelected].value = building.id;

      // Si el edificio ocupa mas de un espacio, calculamos
      if(building.lots == 2) {
        this.b.find(b => b.id == (auxX + (Y + 1))).value = building.id + '1?';
      }
      if(building.lots == 4) {
        this.b.find(b => b.id == ((X + 1).toString() + (Y).toString())).value = building.id + '1?' ;
        this.b.find(b => b.id == ((X + 1).toString() + (Y + 1).toString())).value = building.id + '2?';
        this.b.find(b => b.id == (auxX + (Y + 1))).value = building.id  + '3?';
        
        

      }
    }

    this.modalRef.close();
  }

  private checkLimit(building: Building, lot: number, X: number, Y: number, auxX: string, auxY: string) {
    let error = '';
    
    switch (building.limit) {
      case 'H1':
        let houseFound = false;
        let housesFound 
        if(Y + 1 < 7 &&  this.b.find(b => b.id == (auxX + (Y + 1))).value === 'house') {
          houseFound = true;
        }
        
        if(!houseFound && X + 1 < 7 && this.b.find(b => b.id == ((X + 1).toString() + (Y).toString())).value === 'house' ) {
          houseFound = true;
        }
        if(!houseFound && Y -1 > 0 && this.b.find(b => b.id == (auxX + (Y - 1))).value === 'house'){
          houseFound = true;
        } 
        if(!houseFound && X -1 > 0 &&this.b.find(b => b.id == ((X - 1).toString() + (Y).toString())).value === 'house') {
          houseFound = true;
        }
        
        if(!houseFound){
          error = "Has to be adjacent to a house";
        }
      break;

      case 'H2':
        housesFound = 0;
        if(Y + 1 < 7 &&  this.b.find(b => b.id == (auxX + (Y + 1))).value === 'house') {
          housesFound += 1;
        }
        
        if(X + 1 < 7 && this.b.find(b => b.id == ((X + 1).toString() + (Y).toString())).value === 'house' ) {
          housesFound += 1;
        }
        if(!houseFound && Y -1 > 0 && this.b.find(b => b.id == (auxX + (Y - 1))).value === 'house'){
          housesFound += 1;
        } 
        if(!houseFound && X -1 > 0 &&this.b.find(b => b.id == ((X - 1).toString() + (Y).toString())).value === 'house') {
          housesFound += 1;
        }

        if(building.lots === 2) {
          console.log('Es un lot de 2-->' + housesFound);
          //Calculamos adyacencia del segundo
          let Y2 = Y + 1;
          console.log(X.toString() + Y2.toString() );
          if(Y + 1 < 7 &&  this.b.find(b => b.id == (auxX + (Y2 + 1))).value === 'house') {
            housesFound += 1;
          }
          
          if(X + 1 < 7 && this.b.find(b => b.id == ((X + 1).toString() + (Y2).toString())).value === 'house' ) {
            housesFound += 1;
          }
          if(!houseFound && Y -1 > 0 && this.b.find(b => b.id == (auxX + (Y2 - 1))).value === 'house'){
            housesFound += 1;
          } 
          if(!houseFound && X -1 > 0 &&this.b.find(b => b.id == ((X - 1).toString() + (Y2).toString())).value === 'house') {
            housesFound += 1;
          }
        }
        console.log('houses found? ' + housesFound);
        if(housesFound < 2){
          error = "Has to be adjacent to 2 houses";
        }
        
      case 'D1':
        if(this.b.find(b => b.value === building.id)) {
          error = "Limited to 1 for distric";
        };
      break;  

      case 'NV':
        
        if(Y + 1 < 7 ) {
          const auxV = this.b.find(b => b.id == (auxX + (Y + 1))).value;
          if(auxV === 'house' || auxV === 'mansn' || auxV === 'nobla' ){
            error = "Cant be placed next to a house, mansion or noble villa";
          }
        }  
       
      
        if(error === '' && X + 1 < 7){
          const auxV =  this.b.find(b => b.id == ((X + 1).toString() + (Y).toString())).value;
          if(auxV === 'house' || auxV === 'mansn' || auxV === 'nobla' ){
            error = "Cant be placed next to a house, mansion or noble villa";
          }
        }

        if(error === '' && Y -1 > 0 ) {
          const auxV =  this.b.find(b => b.id == (auxX + (Y - 1))).value;
          if(auxV === 'house' || auxV === 'mansn' || auxV === 'nobla' ){
            error = "Cant be placed next to a house, mansion or noble villa";
          }
        } 

        if(error === '' && X -1 > 0) {
          const auxV = this.b.find(b => b.id == ((X - 1).toString() + (Y).toString())).value;
          if(auxV === 'house' || auxV === 'mansn' || auxV === 'nobla' ){
            error = "Cant be placed next to a house, mansion or noble villa";
          }
        }
      break;  

    case 'NV':
        
      if(Y + 1 < 7 ) {
          const auxV = this.b.find(b => b.id == (auxX + (Y + 1))).value;
          if(auxV === 'house' || auxV === 'mansn' || auxV === 'nobla' ){
            error = "Cant be placed next to a house, mansion or noble villa";
          }
        }  
       
      
      if(error === '' && X + 1 < 7){
        const auxV =  this.b.find(b => b.id == ((X + 1).toString() + (Y).toString())).value;
        if(auxV === 'house' || auxV === 'mansn' || auxV === 'nobla' ){
          error = "Cant be placed next to a house, mansion or noble villa";
        }
      }

      if(error === '' && Y -1 > 0 ) {
        const auxV =  this.b.find(b => b.id == (auxX + (Y - 1))).value;
        if(auxV === 'house' || auxV === 'mansn' || auxV === 'nobla' ){
          error = "Cant be placed next to a house, mansion or noble villa";
        }
      } 

      if(error === '' && X -1 > 0) {
        const auxV = this.b.find(b => b.id == ((X - 1).toString() + (Y).toString())).value;
        if(auxV === 'house' || auxV === 'mansn' || auxV === 'nobla' ){
          error = "Cant be placed next to a house, mansion or noble villa";
        }
      }
      break; 
      
    case 'V1':
        houseFound = false;
        if(Y + 1 < 7 ) {
          const auxV = this.b.find(b => b.id == (auxX + (Y + 1))).value;
          if(auxV === 'house' || auxV === 'mansn' || auxV === 'nobla' ){
            houseFound = true;
          }
        }  
      
      
      if(!houseFound && X + 1 < 7){
        const auxV =  this.b.find(b => b.id == ((X + 1).toString() + (Y).toString())).value;
        if(auxV === 'house' || auxV === 'mansn' || auxV === 'nobla' ){
          houseFound = true;
        }
      }

      if(!houseFound && Y -1 > 0 ) {
        const auxV =  this.b.find(b => b.id == (auxX + (Y - 1))).value;
        if(auxV === 'house' || auxV === 'mansn' || auxV === 'nobla' ){
          houseFound = true;
        }
      } 

      if(!houseFound && X -1 > 0) {
        const auxV = this.b.find(b => b.id == ((X - 1).toString() + (Y).toString())).value;
        if(auxV === 'house' || auxV === 'mansn' || auxV === 'nobla' ){
          houseFound = true;
        }
      }

      if(!houseFound) {
        error = "Has to be placed next to a house, mansion or noble villa";
      }
      break;  

    }

    if(error) {
      this.errors.push(error);
    }
  }

  private deleteBuilding() {
    //Mirem quin edifici hi havia
    let old_b = this.b[this.lotSelected].value;
    let clean_id = "";
    if(old_b.charAt(old_b.length - 1 ) === '?') {
      clean_id = old_b.slice(0, old_b.length - 2 ); 
    } else {
      clean_id = old_b;
    }

    let numlots = 0;
    for (let i = 0; i < BUILDINGS.length; i++) {
      const e = BUILDINGS[i];
      if(e.id === clean_id) {
        numlots = e.lots;
        break;
      }
    }
    
    if(numlots > 1) {

        let auxId = this.b[this.lotSelected].id;
        let auxY = auxId.substr(1,2);
        let auxX = auxId.substr(0,1);
        let Y: number = +auxY;
        let X: number = +auxX;

        if(numlots === 2) {
          if(old_b.charAt(old_b.length - 1 ) === '?'){
            this.b.find(b => b.id == ((X).toString() + (Y - 1).toString())).value = "";
          } else {
            this.b.find(b => b.id == ((X).toString() + (Y + 1).toString())).value = "";
          }
          
        }
        
        if(numlots === 4){
          let ln = old_b.charAt(old_b.length - 2 );

          switch (ln) {
            case '3':
            this.b.find(b => b.id == ((X).toString() + (Y -1).toString())).value = "";
            this.b.find(b => b.id == ((X + 1).toString() + (Y -1).toString())).value = "";
            this.b.find(b => b.id == ((X + 1).toString() + (Y).toString())).value = "";
              break;
            
            case '2':
            this.b.find(b => b.id == ((X).toString() + (Y -1).toString())).value = "";
            this.b.find(b => b.id == ((X - 1).toString() + (Y -1).toString())).value = "";
            this.b.find(b => b.id == ((X - 1).toString() + (Y).toString())).value = "";
              break;

            case '1':
            this.b.find(b => b.id == ((X).toString() + (Y + 1).toString())).value = "";
            this.b.find(b => b.id == ((X - 1).toString() + (Y).toString())).value = "";
            this.b.find(b => b.id == ((X - 1).toString() + (Y + 1).toString())).value = "";
              break;  

            default:
            this.b.find(b => b.id == ((X).toString() + (Y + 1).toString())).value = "";
            this.b.find(b => b.id == ((X + 1).toString() + (Y).toString())).value = "";
            this.b.find(b => b.id == ((X + 1).toString() + (Y + 1).toString())).value = "";  
              break;
          }
        }

        this.b[this.lotSelected].value = "";
    } else {

      this.b[this.lotSelected].value = "";

    }

    this.modalRef.close();
  }

  public saveCity(m: string): void {
    // alert('saveCity!');
    this.districts[this.idDistrict].buildingGrid = [];
    this.b.forEach(b => { 
      if(b.value !== ''){
        this.districts[this.idDistrict].buildingGrid.push(b);
      }
    });
    this.districtSubscription = this.kingdomService.updateDistrictById(this.districts, this.idKing, this.idCity).subscribe();
  }

  private addWall(e: any) {
    console.log(e.target.attributes.id.nodeValue);
    let onOf = false;
    if(e.target.value === 'on') {
      onOf = true;
    };
    switch (e.target.attributes.id.nodeValue) {
      case 'north':
        //this.districSelected.wall.north = onOf;
        if(onOf) {
          this.districSelected.buildings.push('cityl');
        } else {
          this.districSelected.buildings.splice(this.districSelected.buildings.lastIndexOf('cityl'),1);
        }
        
        break;
      case 'west':
        this.districSelected.wall.west = onOf;
        break;
      
      case 'south':
        this.districSelected.wall.south = onOf;
        break;

      case 'east':
        this.districSelected.wall.east = onOf;
        break;
    
      default:
        break;
    }

    if(onOf) {
      // add wall
      // this.districSelected.
    } else {

    }
    console.log(e.target.value);
  }

  ngOnDestroy()  {
    if(this.districtSubscription){
      this.districtSubscription.unsubscribe();
    }
    
  }

}
