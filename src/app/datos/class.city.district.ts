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
  };

  constructor(city?: string) {
    this.name = 'New District';
    if (city) {
      this.city = city;
    }
    this.population = 0;
    this.baseValue = 0;
    this.defenseValue = 0;
    this.buildings = [];
    this.neighbours = [];
    this.wall = {
              north: false,
              east: false,
              south: false,
              west: false,
    };
    this.water = {
        north: false,
        east: false,
        south: false,
        west: false
    };
  }
}
