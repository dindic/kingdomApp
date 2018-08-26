import { Neighbours } from './class.city.neighbourhood';
import { BuildingGridUnit } from './class.building.grid';

export class District {
  name: string;
  city: string;
  population: number;
  baseValue: number;
  defenseValue: number;
  neighbours?: Neighbours[];
  buildings: string[];
  buildingGrid?: BuildingGridUnit[];
  wall?: {
          north: boolean,
          east: boolean,
          south: boolean,
          west: boolean
  };
  water?: {
    north: boolean,
    east: boolean,
    south: boolean,
    west: boolean
  }      
}
