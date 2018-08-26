import { City } from './class.city';
import { Leader } from './class.leader';
import { ControlEditables } from './class.control_check';
import { District } from './class.city.district';

export class Kingdom {
  _id: string;
  _creator: string;
  name: string;
  capital: string;
  ruler: string;
  alignment: string;
  population: number;
  promotion: string;
  taxation: string;
  holiday: string;
  governmentType?: string;
  size: number;
  consumption: number;
  bps: number;
  unrest: number;
  // Tiradas de control
  loyalty: ControlEditables;
  economy: ControlEditables;
  stability: ControlEditables;



  cities?: City[];
  leaders?: Leader[];
  improvements?: [{id: string, total: number}];

  specialTerrain?: [{id: string, total: number}];

  // constructor(size: number, unrest: number, bps: number, promotion: string, taxation: string, holiday: string ) {
  //   this.size = size;
  //   this.unrest = unrest;
  //   this.bps = bps;
  //   this.promotion = promotion;
  //   this.taxation = taxation;
  //   this.holiday = holiday;
  // }

  constructor(size: number, unrest: number, bps: number, promotion: string, taxation: string, holiday: string,
    economy: ControlEditables, loyalty: ControlEditables,  stability: ControlEditables, 
    name?: string, capital?: string, ruler?: string, alignment?: string  ) {
    
    this.size = size;
    this.unrest = unrest;
    this.bps = bps;
    
    this.promotion = promotion;
    this.taxation = taxation;
    this.holiday = holiday;
    
    this.economy = economy;
    this.loyalty = loyalty;
    this.stability = stability;

    if(name){
      this.name = name;
    }

    if(capital){
      this.capital = capital;
      this.cities = [];
      this.cities.push({
        name: capital,
        defenseValue:0,
        population:0,
        baseValue: 0,
        alignment: alignment,
        districts: [{
          name: 'District 1',
          city: capital,
          population: 0,
          baseValue: 0,
          defenseValue: 0,
          buildings: [],
          wall : {
            north : false,
            west : false,
            east : false,
            south : false
          },
          water : {
            north : false,
            west : false,
            east : false,
            south : false
          },
        }]
      });
    }

    if(ruler) {
      this.ruler = ruler;
      this.leaders = [];
      this.leaders.push(
      {
        id: 'Ruler',
        name: ruler,
        hability: 'Cha',
        modifier: 0,
        vacancy: false,
        presence: true,
        leadership: false
      }, 
      {id: 'Consort',
        name: '',
        modifier: 0,
        hability: '',
        presence: false,
        vacancy: true,
        leadership: false
      },
      {
        id: 'Councilor',
        name: '',
        modifier: 0,
        hability: '',
        presence: false,
        vacancy: true,
        leadership: false
      },
      {
        id: 'General',
        name: '',
        modifier: 0,
        hability: '',
        presence: false,
        vacancy: true,
        leadership: false
      },
      {
        id: 'Grand Diplomat',
        name: '',
        modifier: 0,
        hability: '',
        presence: false,
        vacancy: true,
        leadership: false
      },
      {
        id: 'High Priest',
        name: '',
        modifier: 0,
        hability: '',
        presence: false,
        vacancy: true,
        leadership: false
      },
      {
        id: 'Magister',
        name: '',
        modifier: 0,
        hability: '',
        presence: false,
        vacancy: true,
        leadership: false
      },
      {
        id: 'Marshal',
        name: '',
        modifier: 0,
        hability: '',
        presence: false,
        vacancy: true,
        leadership: false
      },
      {
        id: 'Royal Assassin',
        name: '',
        modifier: 0,
        hability: '',
        presence: false,
        vacancy: true,
        leadership: false
      },
      {
        id: 'Spymaster',
        name: '',
        modifier: 0,
        hability: '',
        presence: false,
        vacancy: true,
        leadership: false
      },
      {
        id: 'Treasurer',
        name: '',
        modifier: 0,
        hability: '',
        presence: false,
        vacancy: true,
        leadership: false
      },
      {
        id: 'Warden',
        name: '',
        modifier: 0,
        hability: '',
        presence: false,
        vacancy: true,
        leadership: false
      })
    }

    if(alignment) {
      this.alignment = alignment;
    }
  }
}
