import { District } from './class.city.district';

export class City {
  name: string;
  defenseValue: number;
  population: number;
  baseValue: number;
  alignment: string;

  // TO-DO: Afegir valors de settlements

  districts: District[];

  constructor(name, alignment) {
    this.name = name;
    this.defenseValue = 0;
    this.population = 0;
    this.baseValue = 0;
    this.alignment = alignment;
    this.districts = [{
      name: "District1",
      city: name,
      population: 0,
      baseValue: 0,
      defenseValue: 0,
      buildings: [],
      wall: {
              north: false,
              east: false,
              south: false,
              west: false,
      },
      water: {
        north: false,
        east: false,
        south: false,
        west: false
      }      
    }]
  }
}
