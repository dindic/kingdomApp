import { Kingdom } from './class.kingdom';

export const KINGDOM: Kingdom = {
    _id: '5b290ff2d2b3e739f9f6934c',
    _creator: '5b290ff2d2b3e739f9f6934c',
    name : 'TestKingdom',
    capital: 'TestCapital',
    ruler: 'TestRuler',
    alignment: 'LN',
    size: 1,
    consumption: 0,
    bps: 30,
    unrest: 2,
    loyalty : {
          bonuses : {
              events : 0,
              other : 0
          },
          penalties : {
              other : 0
          }
      },
      stability : {
        bonuses : {
              events : 0,
              other : 0
          },
          penalties : {
              other : 0
          }
      },
      economy : {
          bonuses : {
              events : 0,
              other : 0
          },
          penalties : {
              other : 0
          }
      },
    population: 0,
    promotion: 'None',
    taxation: 'None',
    holiday: 'None',
    cities: [{name: 'City1',
              defenseValue: 0,
              baseValue: 0,
              population: 0,
              alignment: 'LN',
              districts: [{ name: 'District1',
                            city: 'City1',
                            defenseValue: 0,
                            baseValue: 0,
                            population: 0,
                            neighbours: [
                              {
                              fullLots: 1
                              }
                            ],
                            buildings: ['house']}
                          ]
              },
              {name: 'Rodinia',
              defenseValue: 0,
              baseValue: 0,
              population: 0,
              alignment: 'LN',
              districts: [{ name: 'District1',
                            city: 'Rodinia',
                            defenseValue: 0,
                            baseValue: 0,
                            population: 0,
                            neighbours: [
                              {
                              fullLots: 1,
                         
                              },
                              
                            ],    buildings: ['house']},
                            { name: 'District2',
                            city: 'Rodinia',
                            defenseValue: 0,
                            baseValue: 0,
                            population: 0,
                            neighbours: [
                              {
                              fullLots: 1,
                          
                              }
                            ],    buildings: ['house']},
                            { name: 'District3',
                            city: 'Rodinia',
                            defenseValue: 0,
                            baseValue: 0,
                            population: 0,
                            neighbours: [
                              {
                              fullLots: 1,
                           
                              }
                            ],    buildings: ['house']}]
              }],
     leaders: [{id: 'Ruler',
                name: 'Gunnar Hojaverde',
                modifier: 4,
                hability: 'Cha',
                presence: true,
                vacancy: false,
                leadership: false,
                ruler: ['E', 'S']},
                {id: 'Consort',
                name: 'Helaine LaBelle',
                modifier: 2,
                hability: 'Cha',
                presence: true,
                vacancy: false,
                leadership: true},
                {id: 'Councilor',
                name: 'Perro Sarnoso',
                modifier: 2,
                hability: 'Cha',
                presence: true,
                vacancy: false,
                leadership: false},
                {id: 'General',
                name: 'Grunt Mamut',
                modifier: 2,
                hability: 'Cha',
                presence: true,
                vacancy: false,
                leadership: false},
                {id: 'Grand Diplomat',
                name: 'Herrardone',
                modifier: 2,
                hability: 'Cha',
                presence: true,
                vacancy: false,
                leadership: false},
                {id: 'High Priest',
                name: 'Helaine Laforette',
                modifier: 2,
                hability: 'Cha',
                presence: true,
                vacancy: false,
                leadership: false},
                {id: 'Magister',
                name: 'Hanelius Fithc',
                modifier: 2,
                hability: 'Cha',
                presence: true,
                vacancy: false,
                leadership: false},
                {id: 'Marshal',
                name: 'Peppery Longfarts',
                modifier: 2,
                hability: 'Cha',
                presence: true,
                vacancy: false,
                leadership: false},
                {id: 'Royal Assassin',
                name: 'Quizzito',
                modifier: 2,
                hability: 'Cha',
                presence: true,
                vacancy: false,
                leadership: false},
                {id: 'Spymaster',
                name: 'Ahgdvard Relle',
                modifier: 2,
                hability: 'Cha',
                presence: true,
                vacancy: false,
                leadership: false},
                {id: 'Treasurer',
                name: 'Mr. Pugg',
                modifier: 2,
                hability: 'Cha',
                presence: true,
                vacancy: false,
                leadership: false},
                {id: 'Warden',
                name: 'Barnabas Harrigan',
                modifier: 2,
                hability: 'Cha',
                presence: false,
                vacancy: true,
                leadership: false}],
     improvements: [{id: 'mine', total: 2}, {id: 'farm', total: 6}, {id: 'fish', total: 3}],
     specialTerrain: [{id: 'lair', total: 2}, {id: 'rive', total: 6}, {id: 'econ', total: 1},  {id: 'cons', total: 1}]
};
