import { Component, OnInit, OnDestroy } from '@angular/core';
import { KingdomService } from '../kingdom.service';
import { SPECIAL_TERRAIN } from '../datos/mock.specialterrains';
import { SpecialTerrain } from '../datos/class.special_terrain';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Kingdom } from '../datos/class.kingdom';

@Component({
  selector: 'app-special-terrain',
  providers: [KingdomService],
  templateUrl: './special-terrain.component.html',
  styleUrls: ['./special-terrain.component.css']
})
export class SpecialTerrainComponent implements OnInit, OnDestroy {
  
  kingdomTerrains: [{id: string, total: number}];
  specialTerrains: SpecialTerrain[] = [];
  idKing: string;

  // Datos Modal
  modalTitle: string;
  modalDesc: string;

  // Kinds of modal
  addRemove = '';
  modal_resources = false;

  kingdom$: Observable<Kingdom>;
  kingdomSubscription: Subscription;

  constructor(private kingdomService: KingdomService, private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit() {
    this.specialTerrains = SPECIAL_TERRAIN;

    this.idKing = this.route.snapshot.params['idk'];
    this.getKingdomTerrains(this.idKing);
  }

  getKingdomTerrains(kingdomId): void {
    this.kingdom$ = this.kingdomService.getKingdomById(kingdomId);

    this.kingdomSubscription = this.kingdom$.subscribe(
      kingdom => {
        this.kingdomTerrains = kingdom.specialTerrain;

        let auxResources = 0;
        this.kingdomTerrains.forEach(terrain => {
          for (let i = 0; i < this.specialTerrains.length; i++) {
            if (this.specialTerrains[i].id === terrain.id) {
              this.specialTerrains[i].total = terrain.total;
            }
          }
          if (terrain.id === 'econ' || terrain.id === 'cons' ) {
            auxResources += terrain.total;
          }
        });
        console.log('resources a aquest punt? :' + auxResources);
        if ( auxResources > 0) {
          for (let i = 0; i < this.specialTerrains.length; i++) {
            if (this.specialTerrains[i].id === 'reso') {
              this.specialTerrains[i].total = auxResources;
              break;
            }
          }
        }

      }
    )
    
  }

  addRemoveTerrain(id: string, content): void {
    let addRemoveDesc = '';
    if (this.addRemove === 'A') {
      addRemoveDesc = 'Add';
    } else {
      addRemoveDesc = 'Remove';
    }
    this.modalService.open(content);
    switch (id) {
      case 'reso':
        this.modal_resources = true;
        this.modalTitle = addRemoveDesc + ' Resource';
        this.modalDesc = 'Choose a type of resource you built in';
        break;
      default:
        break;
    }
  }

  addRemoveResource(id: string): void {
    console.log('add resource: ' + id + 'AddRemove? :' + this.addRemove);
    if (id === 'econ' || id === 'cons') {
      for ( let i = 0; i < this.kingdomTerrains.length; i++) {
        if (this.kingdomTerrains[i].id === id) {
          if (this.addRemove === 'A') {
            this.kingdomTerrains[i].total += 1;
          } else {
            console.log('Remove if total-->' + this.kingdomTerrains[i].total);
            if (this.kingdomTerrains[i].total > 0) {
              this.kingdomTerrains[i].total -= 1;
            }
          }
          break;
        }
      }
      for ( let j = 0; j < this.specialTerrains.length; j++) {
        if (this.specialTerrains[j].id === 'reso') {
          if (this.addRemove === 'A') {
            this.specialTerrains[j].total += 1;
          } else {
            if (this.specialTerrains[j].total > 0) {
              this.specialTerrains[j].total -= 1;
            }
          }
          break;
        }
      }
    }
  }

  saveData(): void {
    this.specialTerrains.forEach(kTerrain => {
      for (let i = 0; i < this.kingdomTerrains.length; i++) {
        if (this.kingdomTerrains[i].id === kTerrain.id) {
          this.kingdomTerrains[i].total = kTerrain.total;
        }
      }
    });
    this.kingdomService.setKingdomTerrains(this.kingdomTerrains);
  }

  ngOnDestroy() {
    this.kingdomSubscription.unsubscribe();
  }

}
