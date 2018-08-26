import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Neighbours } from '../datos/class.city.neighbourhood';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Building } from '../datos/class.city.building';


@Component({
  selector: 'app-neighbourhood',
  templateUrl: './neighbourhood.component.html',
  styleUrls: ['./neighbourhood.component.css']
})
export class NeighbourhoodComponent implements OnInit {
  buildingXX: string;
  buildingXY: string;
  buildingYX: string;
  buildingYY: string;

  modalRef: NgbModalRef;
  lotSelected: string;

  errors: string[];

  @Input() neighbourhood: Neighbours;
  @Output() errorsEmitter: EventEmitter<string[]> = new EventEmitter();
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    
    // if (this.neighbourhood) {
    //   if(this.neighbourhood.lotXX) {
    //     this.buildingXX = this.neighbourhood.lotXX;
    //   } else {
    //     this.buildingXX = '';
    //   }
    //   if(this.neighbourhood.lotXY) {
    //     this.buildingXY = this.neighbourhood.lotXY;
    //   } else {
    //     this.buildingXY = '';
    //   }
    //   if(this.neighbourhood.lotYX) {
    //     this.buildingYX = this.neighbourhood.lotYX;
    //   } else {
    //     this.buildingYX = '';
    //   }
    //   if(this.neighbourhood.lotYY) {
    //     this.buildingYY = this.neighbourhood.lotYY;
    //   } else {
    //     this.buildingYY = '';
    //   }
    // }
  }

  addBuilding(content, lot: string): void {
    console.log(lot);
    this.lotSelected = lot;
    this.modalRef = this.modalService.open(content);
  }

  addBuildingAccept(building: Building) {
    console.log(this.lotSelected);
    console.log(building);
    this.errors = [];
    switch (this.lotSelected) {
      case 'XX':
        console.log(this.buildingXY);
        if(building.lots == 2 && this.buildingYX !== '') {
          this.errors.push('El edificio seleccionado ocupa 2 espacios. Seleccione una casilla correcta, o elimine el edificio contiguo');
        }
        if (building.lots == 4 && (this.buildingXY !== '' || this.buildingYX !== '' || this.buildingYY !== '')) {
          this.errors.push('El edificio seleccionado ocupa 4 espacios. Seleccione una casilla correcta, o elimine los edificios contiguos');
        }

        if(this.errors.length === 0) {
          this.checkLimit(building, this.lotSelected);
        }

        if(this.errors.length === 0) {
          this.buildingXX = building.id;
          if(building.lots == 2) {
            this.buildingXY = building.id;
          }
          if(building.lots == 4) {
            this.buildingXY = building.id;
            this.buildingYX = building.id;
            this.buildingYY = building.id;
          }
        }
        
        break;
      
      case 'XY':

        if(building.lots == 2) {
          this.errors.push('El edificio seleccionado ocupa 2 espacios. Seleccione una casilla correcta');
        } else if (building.lots == 4) {
          this.errors.push('El edificio seleccionado ocupa 4 espacios. Seleccione una casilla correcta');
        }

        if(this.errors.length === 0) {
          this.checkLimit(building, this.lotSelected);
        }

        if(this.errors.length === 0) {
          this.buildingXY = building.id;
        }
        
        break;
      
      case 'YX':
        if(building.lots == 2 && this.buildingYY !== '') {
          this.errors.push('El edificio seleccionado ocupa 2 espacios. Seleccione una casilla correcta, o elimine el edificio contiguo');
        }
        if (building.lots == 4) {
          this.errors.push('El edificio seleccionado ocupa 4 espacios. Seleccione una casilla correcta');
        }

        if(this.errors.length === 0) {
          this.checkLimit(building, this.lotSelected);
        }
        
        if(this.errors.length === 0) {
          if(building.lots == 2) {
            this.buildingYY = building.id;
          }
          this.buildingYX = building.id;
        }
        break;

      case 'YY':

        if(building.lots == 2) {
          this.errors.push('El edificio seleccionado ocupa 2 espacios. Seleccione una casilla correcta');
        } else if (building.lots == 4) {
          this.errors.push('El edificio seleccionado ocupa 4 espacios. Seleccione una casilla correcta');
        }

        if(this.errors.length === 0) {
          this.checkLimit(building, this.lotSelected);
        }

        if(this.errors.length === 0) {
          this.buildingYY = building.id;
        }
       
        break;

      default:
        break;
    }
   
    if (this.errors.length === 0) {
      //this.neighbourhood.buildings.push(building.id);
    }

    this.errorsEmitter.emit(this.errors);

    this.modalRef.close();
  }

  private checkLimit(building: Building, lot: string) {
    let error = '';

    switch (building.limit) {
      case 'H1':
        
        switch (lot) {
          case 'XX' || 'YY':
            if (this.buildingXY !== 'house' && this.buildingYX !== 'house') {
              error = "Has to be adjacent to a house";
            }
            break;
          
          case 'XY' || 'YX':
            if (this.buildingXX !== 'house' && this.buildingYY !== 'house') {
              error = "Has to be adjacent to a house";
            }
            break;
          
          default:
            break;
        }
      break;
      
      case 'H2':
        let housesInLot = 0;
        if(this.buildingXX == 'house') {
          housesInLot += 1;
        }
        if(this.buildingXY == 'house') {
          housesInLot += 1;
        }
        if(this.buildingXX == 'house') {
          housesInLot += 1;
        }
        if(this.buildingXX == 'house') {
          housesInLot += 1;
        }
        
      break;  
      
      case 'S1':
        // only one for settlement. Validated in globals

        break;
      
     

      default:
        break;
    }
    
    if(error) {
      this.errors.push(error);
    }
  }

}
