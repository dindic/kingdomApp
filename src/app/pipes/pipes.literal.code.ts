import {Pipe, PipeTransform} from '@angular/core';
import { BUILDINGS } from '../datos/mock.buildings.list';
import { Building } from '../datos/class.city.building';

@Pipe({name: 'literalcode'})
export class LiteralCodePipe implements PipeTransform {
    transform(value) {
      let result = '';
      switch (value) {
        case ('E'):
          result = 'Economy';
          break;
        case ('L'):
          result = 'Loyalty';
          break;
        case ('S'):
          result = 'Stability';
          break;
        case ('F'):
          result = 'Fame';
          break;
        case ('U'):
          result = 'Unrest';
          break;
        case ('H1'):
          result = 'Adjacent to 1 House';
          break;
        case ('H2'):
          result = 'Adjacent to 2 Houses';
          break;
        case ('S1'):
          result = 'One per settlement';
          break;


        default:
          result = value;
          break;
      }
      return result;
    }
}
