import {Pipe, PipeTransform} from '@angular/core';
import { BUILDINGS } from '../datos/mock.buildings.list';
import { Building } from '../datos/class.city.building';

@Pipe({name: 'literalbuilding'})
export class LiteralBuildingPipe implements PipeTransform {
    transform(value) {
      
      if(value.charAt(value.length - 1 ) === '?') {
        value = value.slice(0, value.length - 2 ); 
        
      } 
      for (const building of BUILDINGS) {
        if (building.id === value) {      
          return building;
        }
      }

      return {
        id: '',
        name: '',
        cost: 0,
        lots: 0,
        kingdom: [],
        description: ''
      }
  }
}
