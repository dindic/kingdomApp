import { Building } from './class.city.building';

export const BUILDINGS: Building[] = [
  // {
  //   id: '',
  //   name: '',
  //   cost: 0,
  //   lots: 0,
  //   kingdom: [{ type: '' , bonus: 0}],
  //   discount: [''],
  //   limit: '',
  //   special: '',
  //   upgradesTo: '',
  //   upgradesFrom: '',
  //   magicItems: '',
  //   settlement: '',
  //   description: ''
  // },
  {
    id: 'acady',
    name: 'Academy',
    cost: 52,
    lots: 2,
    kingdom: [{ type: 'E' , bonus: 2}, { type: 'L' , bonus: 2}],
    discount: ['castr', 'libry', 'magip'],
    upgradesTo: 'univy',
    upgradesFrom: 'libry',
    magicItems: '3 minor scrolls or wondorous items, 2 medium scrolls or wondorous items',
    settlement: 'Lore +2, Productivity +1, Society +2;' +
                'increase Lore bonus by 2 for questions relating to one knowledge or Profession skill',
    description: 'An institution of higher learning'
  },
  {
    id: 'alcht',
    name: 'Alchemy',
    cost: 18,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}],
    limit: 'H1',
    special: 'Base value +1,000 gp',
    magicItems: '1 minor potion or wondorous items',
    description: 'The laboratory and home of a crafter of poisons, potions, or alchemical items'
  },
  {
    id: 'arena',
    name: 'Arena',
    cost: 40,
    lots: 4,
    kingdom: [{ type: 'S' , bonus: 4}, { type: 'F' , bonus: 1}],
    discount: ['brotl', 'garrn', 'inn', 'stabe', 'theae'],
    limit: 'S1',
    upgradesFrom: 'theae',
    settlement: 'Crime +1',
    description: 'A large public structure for competitions and team sports'
  },
  {
    id: 'bank',
    name: 'Bank',
    cost: 28,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 4}],
    special: 'Base value +2,000gp',
    description: 'A secure building for storing valuables and granting loans'
  },
  {
    id: 'barde',
    name: 'Bardic College',
    cost: 40,
    lots: 2,
    kingdom: [{ type: 'E' , bonus: 1},  { type: 'L' , bonus: 3}, { type: 'S' , bonus: 1}, { type: 'F' , bonus: 1}],
    discount: ['libry', 'musem', 'theae'],
    magicItems: '2 minor scrolls or wondorous items',
    description: 'A center for artistic learning. Education in a Bardic College also includes research into' +
                ' a wide range of historical topics'
  },
  {
    id: 'barrs',
    name: 'Barracks',
    cost: 6,
    lots: 1,
    kingdom: [{ type: 'U' , bonus: -1}],
    special: 'Defense +2',
    upgradesTo: 'garrn',
    settlement: 'Law +1',
    description: 'A building to house conscripts, guards, militia, soldiers, or similar military forces'
  },
  {
    id: 'blact',
    name: 'Black Market',
    cost: 50,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 2}, { type: 'S' , bonus: 1}, { type: 'U' , bonus: 1}],
    discount: ['brotl'],
    limit: 'H2',
    special: 'Base value + 2,000 gp',
    magicItems: '2 minor items, 1 medium item, 1 major item',
    settlement: 'Corruption +1, Crime +2',
    description: 'A number of shops with secret and usually illegal wares'
  },
  {
    id: 'brewy',
    name: 'Brewery',
    cost: 6,
    lots: 1,
    kingdom: [{ type: 'L' , bonus: 1}, { type: 'S' , bonus: 1}],
    description: 'A building for beer brewing, winemaking, or some similar use'
  },
  {
    id: 'bride',
    name: 'Bridge',
    cost: 6,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}],
    special: 'Shares space with a river or Waterway lot',
    description: ''
  },
  {
    id: 'brotl',
    name: 'Brothel',
    cost: 6,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}],
    special: 'Sa de buscar al web pq no estava a la app',
    description: ''
  },
  {
    id: 'bureu',
    name: 'Bureau',
    cost: 10,
    lots: 2,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'L' , bonus: -1}, { type: 'S' , bonus: 1}],
    settlement: 'Corruption +1, Law +1',
    description: ''
  },
  {
    id: 'castr',
    name: 'Caster\'s Tower',
    cost: 30,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'L' , bonus: 1}],
    magicItems: '3 minor items, 2 medium items',
    description: ''
  },
  {
    id: 'caste',
    name: 'Castle',
    cost: 54,
    lots: 4,
    kingdom: [{ type: 'E' , bonus: 2}, { type: 'L' , bonus: 2}, { type: 'S' , bonus: 2},
               { type: 'U' , bonus: -4}, { type: 'F' , bonus: 1}],
    discount: ['nobla', 'townl'],
    limit: 'S1',
    special: 'Defense +8',
    description: ''
  },
  {
    id: 'cathl',
    name: 'Cathedral',
    cost: 58,
    lots: 4,
    kingdom: [{ type: 'L' , bonus: 4}, { type: 'S' , bonus: 4}, { type: 'U' , bonus: -4}, { type: 'F' , bonus: 1}],
    discount: ['acady', 'tempe'],
    limit: 'S1',
    special: 'Halves consumption increase for Promotion Edicts',
    magicItems: '3 minor potions or wondorous items, 2 medium potions or wondorous items',
    settlement: 'Law +2',
    description: ''
  },
  {
    id: 'cistn',
    name: 'Cistern',
    cost: 6,
    lots: 1,
    kingdom: [{ type: 'S' , bonus: 1}],
    limit: 'ND',  // :dump:gravd:stabe:stocd:tanny',
    special: 'Can share lot with another building',
    description: ''
  },
  {
    id: 'cityl',
    name: 'City Wall',
    cost: 2,
    lots: 0,
    kingdom: [{ type: 'I' , bonus: -2}],
    limit: 'LB',
    special: 'Defense +1',
    description: ''
  },
  {
    id: 'dancl',
    name: 'Dance Hall',
    cost: 4,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'L' , bonus: 2}, { type: 'U' , bonus: 1}],
    limit: 'H1',
    settlement: 'Corruption +1, Crime +1',
    description: ''
  },
  {
    id: 'dump',
    name: 'Dump',
    cost: 4,
    lots: 1,
    kingdom: [{ type: 'S' , bonus: 1}],
    limit: 'NV', // :house:mansn:nobla',
    description: ''
  },
  {
    id: 'exotn',
    name: 'Exotic Artisan',
    cost: 10,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'S' , bonus: 1}],
    limit: 'H1',
    magicItems: '1 minor ring, wand or wondorous item',
    description: ''
  },
  {
    id: 'forer',
    name: 'Foreign Quarter',
    cost: 30,
    lots: 4,
    kingdom: [{ type: 'E' , bonus: 3}, { type: 'S' , bonus: -1}],
    special: 'Increase value of trade routes (see Trade Edicts) by 5% (maximum 100%)',
    settlement: 'Crime +1, Lore +1, Society +2',
    description: ''
  },
  {
    id: 'founy',
    name: 'Foundry',
    cost: 16,
    lots: 2,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'S' , bonus: 1}, { type: 'U' , bonus: 1}],
    discount: ['smity'],
    limit: 'W1',
    special: 'Increase the Economy and BP earned per turn by 1 for 1 Mine connected to this settlement by a river or Road',
    settlement: 'Productivity +1',
    description: ''
  },
  {
    id: 'garrn',
    name: 'Garrison',
    cost: 28,
    lots: 2,
    kingdom: [{ type: 'L' , bonus: 2}, { type: 'S' , bonus: 2}, { type: 'U' , bonus: -2}],
    discount: ['cityl', 'grany', 'jail'],
    upgradesFrom: 'barrs',
    description: ''
  },
  {
    id: 'grany',
    name: 'Granary',
    cost: 12,
    lots: 1,
    kingdom: [{ type: 'L' , bonus: 1}, { type: 'S' , bonus: 1}],
    special: 'bla de blaaaa',
    description: ''
  },
  {
    id: 'gravd',
    name: 'Graveyard',
    cost: 4,
    lots: 1,
    kingdom: [{ type: 'L' , bonus: 1}],
    description: ''
  },
  {
    id: 'guill',
    name: 'Guild Hall',
    cost: 34,
    lots: 2,
    kingdom: [{ type: 'E' , bonus: 2}, { type: 'L' , bonus: 2}],
    discount: ['pier', 'stabe', 'tradp'],
    special: 'Base value +1,000 gp',
    upgradesFrom: 'tradp',
    settlement: 'Law +1, Productivity +2',
    description: ''
  },
  {
    id: 'herbt',
    name: 'Herbalist',
    cost: 10,
    lots: 1,
    kingdom: [{ type: 'L' , bonus: 1}, { type: 'S' , bonus: 1}],
    limit: 'H1',
    magicItems: '1 minor potion or wondorous item',
    description: ''
  },
  {
    id: 'hospl',
    name: 'Hospital',
    cost: 30,
    lots: 2,
    kingdom: [{ type: 'L' , bonus: 1}, { type: 'S' , bonus: 2}],
    special: 'Increase Stability by 2 suring plague events',
    settlement: 'Lore +1, Productivity +2',
    description: ''
  },
  {
    id: 'house',
    name: 'House',
    cost: 3,
    lots: 1,
    kingdom: [{ type: 'U' , bonus: -1}],
    special: 'bla de blaaa',
    upgradesFrom: 'tenet',
    description: ''
  },
  {
    id: 'inn',
    name: 'Inn',
    cost: 10,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'L' , bonus: 1}],
    limit: 'H1',
    special: 'Base Value +500 gp',
    settlement: 'Society +1',
    description: ''
  },
  {
    id: 'jail',
    name: 'Jail',
    cost: 14,
    lots: 1,
    kingdom: [{ type: 'L' , bonus: 2}, { type: 'S' , bonus: 2}, { type: 'U' , bonus: -2}],
    settlement: 'Crime -1, Law +1',
    description: ''
  },
  {
    id: 'libry',
    name: 'Library',
    cost: 6,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'L' , bonus: 1}],
    upgradesTo: 'acady',
    settlement: 'Lore +1',
    description: ''
  },
  {
    id: 'luxue',
    name: 'Luxury Store',
    cost: 28,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}],
    limit: 'H1',
    special: 'Base Value +2,000 gp',
    upgradesTo: 'magip',
    upgradesFrom: 'shop',
    magicItems: '2 minor rings, wands, or wondorous items',
    description: ''
  },
  {
    id: 'magip',
    name: 'Magic Shop',
    cost: 68,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}],
    limit: 'H2',
    special: 'Base Value +2,000 gp',
    upgradesFrom: 'luxue',
    magicItems: '4 minor wondorous items, 2 medium wondorous items, 1 major wondorous items',
    description: ''
  },
  {
    id: 'magiy',
    name: 'Magic Academy',
    cost: 58,
    lots: 2,
    kingdom: [{ type: 'E' , bonus: 2}, { type: 'F' , bonus: 1}],
    discount: ['castr', 'libry', 'magip'],
    magicItems: '3 minor potions, scrolls, or wondorous items, 1 medium potion, scroll or wondorous item',
    settlement: 'Lore +2, Society +1, increase Lore bonus by 2 for questions relating to Knowledge (arcana)',
    description: ''
  },
  {
    id: 'mansn',
    name: 'Mansion',
    cost: 10,
    lots: 1,
    kingdom: [{ type: 'S' , bonus: 1}],
    upgradesTo: 'nobla',
    settlement: 'Law +1,Society +1',
    description: ''
  },
  {
    id: 'markt',
    name: 'Market',
    cost: 48,
    lots: 2,
    kingdom: [{ type: 'E' , bonus: 2}, { type: 'S' , bonus: 2}],
    discount: ['blact', 'inn', 'shop'],
    limit: 'H2',
    special: 'Base Value +2,000 gp',
    upgradesFrom: 'shop',
    magicItems: '2 minor wondorous items',
    description: ''
  },
  {
    id: 'menage',
    name: 'Menagerie',
    cost: 16,
    lots: 4,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'L' , bonus: 0}, { type: 'F' , bonus: 1}],
    special: 'Increase Loyalty by 1/4 the CR of the highest-CR creature in the Menagerie',
    description: ''
  },
  {
    id: 'miliy',
    name: 'Military Academy',
    cost: 36,
    lots: 2,
    kingdom: [{ type: 'L' , bonus: 2}, { type: 'S' , bonus: 1}, { type: 'F' , bonus: 1}],
    discount: ['barrs'],
    limit: 'S1',
    special: 'Armies and commanders recruited at the settlement gain one bonus tactic',
    magicItems: '1 minor armor, shield, or weapon, 1 medium armor shield or weapon',
    settlement: 'Law +1, Lore +1',
    description: ''
  },
  {
    id: 'mill',
    name: 'Mill',
    cost: 6,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'S' , bonus: 1}],
    limit: 'W1',
    settlement: 'Productivity +1',
    description: ''
  },
  {
    id: 'mint',
    name: 'Mint',
    cost: 30,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 3}, { type: 'L' , bonus: 3}, { type: 'S' , bonus: 1}, { type: 'F' , bonus: 1}],
    description: ''
  },
  {
    id: 'moat',
    name: 'Moat',
    cost: 2,
    lots: 0,
    kingdom: [{ type: 'U' , bonus: -1}],
    limit: 'LB',
    special: 'Defense +1; cannot be damaged by siege engines',
    description: ''
  },
  {
    id: 'monay',
    name: 'Monastery',
    cost: 16,
    lots: 2,
    kingdom: [{ type: 'S' , bonus: 1}],
    settlement: 'Law +1, Lore +1',
    description: ''
  },
  {
    id: 'monut',
    name: 'Monument',
    cost: 6,
    lots: 1,
    kingdom: [{ type: 'L' , bonus: 1}, { type: 'U' , bonus: -1}],
    description: ''
  },
  {
    id: 'musem',
    name: 'Museum',
    cost: 30,
    lots: 2,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'L' , bonus: 1}, { type: 'F' , bonus: 1}],
    settlement: 'bla de blaaaa',
    description: ''
  },
  {
    id: 'nobla',
    name: 'Noble Villa',
    cost: 24,
    lots: 2,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'L' , bonus: 1}, { type: 'S' , bonus: 1}, { type: 'F' , bonus: 1}],
    discount: ['exotn', 'luxue', 'mansn'],
    upgradesFrom: 'mansn',
    settlement: 'Society +1',
    description: ''
  },
  {
    id: 'obsey',
    name: 'Observatory',
    cost: 12,
    lots: 1,
    kingdom: [{ type: 'S' , bonus: 1}],
    magicItems: '1 minor scroll or wondorous item',
    settlement: 'Lore +2',
    description: ''
  },
  {
    id: 'orphe',
    name: 'Orphanage',
    cost: 6,
    lots: 1,
    kingdom: [{ type: 'S' , bonus: 1}, { type: 'U' , bonus: -1}],
    description: ''
  },
  {
    id: 'palae',
    name: 'Palace',
    cost: 108,
    lots: 4,
    kingdom: [{ type: 'E' , bonus: 2}, { type: 'L' , bonus: 6}, { type: 'S' , bonus: 2}, { type: 'F' , bonus: 1}],
    discount: ['mansn', 'mint', 'nobla'],
    special: 'bla de blaaa',
    settlement: 'Law +2',
    description: ''
  },
  {
    id: 'park',
    name: 'Park',
    cost: 4,
    lots: 1,
    kingdom: [{ type: 'L' , bonus: 1}, { type: 'U' , bonus: -1}],
    description: ''
  },
  {
    id: 'paves',
    name: 'Paved Streets',
    cost: 24,
    lots: 0,
    kingdom: [{ type: 'E' , bonus: 2}, { type: 'S' , bonus: 1}],
    limit: 'D1',
    settlement: 'Productivity +2',
    description: ''
  },
  {
    id: 'pier',
    name: 'Pier',
    cost: 16,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'S' , bonus: 1}],
    limit: 'W1',
    special: 'Base Value +1,000 gp',
    upgradesTo: 'watet',
    settlement: 'Crime +1',
    description: ''
  },
  {
    id: 'sewem',
    name: 'Sewer System',
    cost: 24,
    lots: 0,
    kingdom: [{ type: 'L' , bonus: 1}, { type: 'S' , bonus: 2}],
    discount: ['cistn', 'dump'],
    limit: 'D1',
    settlement: 'Crime +1, Productivity +1',
    description: ''
  },
  {
    id: 'shop',
    name: 'Shop',
    cost: 8,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}],
    limit: 'H1',
    special: 'Base Value +500 gp',
    upgradesTo: 'markt',
    settlement: 'Productivity +1',
    description: ''
  },
  {
    id: 'shrie',
    name: 'Shrine',
    cost: 8,
    lots: 1,
    kingdom: [{ type: 'L' , bonus: 1}, { type: 'U' , bonus: -1}],
    upgradesTo: 'tempe',
    magicItems: '1 minor potion, scroll, or wondorous item',
    description: ''
  },
  {
    id: 'smity',
    name: 'Smithy',
    cost: 6,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'S' , bonus: 1}],
    description: ''
  },
  {
    id: 'stabe',
    name: 'Stable',
    cost: 10,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'L' , bonus: 1}],
    limit: 'V1',
    special: 'Base Value +500 gp',
    description: ''
  },
  {
    id: 'stocd',
    name: 'Stockyard',
    cost: 20,
    lots: 4,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'S' , bonus: -1}],
    discount: ['stabe', 'tanny'],
    special: 'Farms in this hex or adjacent hexes reduce Consumption by 3 instead of 2',
    settlement: 'Productivity +1',
    description: ''
  },
  {
    id: 'tanny',
    name: 'Tannery',
    cost: 6,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'S' , bonus: 1}],
    special: 'NV',
    settlement: 'Society -1',
    description: ''
  },
  {
    id: 'taven',
    name: 'Tavern',
    cost: 12,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'L' , bonus: 1}],
    limit: 'H1',
    special: 'Base Value +500gp',
    settlement: 'Corruption +1',
    description: ''
  },
  {
    id: 'tempe',
    name: 'Temple',
    cost: 32,
    lots: 2,
    kingdom: [{ type: 'L' , bonus: 2}, { type: 'S' , bonus: 2}, { type: 'U' , bonus: -2}],
    discount: ['gravd', 'monut', 'shrie'],
    upgradesFrom: 'shrie',
    magicItems: '2 minor items',
    description: ''
  },
  {
    id: 'tenet',
    name: 'Tenement',
    cost: 1,
    lots: 1,
    kingdom: [{ type: 'U' , bonus: 2}],
    special: 'Counts a House',
    upgradesTo: 'house',
    description: ''
  },
  {
    id: 'theae',
    name: 'Theatre',
    cost: 24,
    lots: 2,
    kingdom: [{ type: 'E' , bonus: 2}, { type: 'S' , bonus: 2}],
    discount: ['brotl', 'exotn', 'inn', 'park', 'taven'],
    upgradesTo: 'arena',
    description: ''
  },
  {
    id: 'townl',
    name: 'Town Hall',
    cost: 22,
    lots: 2,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'L' , bonus: 1}, { type: 'S' , bonus: 1}],
    discount: ['barrs', 'cistn', 'dump', 'jail', 'watcr'],
    settlement: 'Law +1',
    description: ''
  },
  {
    id: 'tradp',
    name: 'Trade Shop',
    cost: 10,
    lots: 1,
    kingdom: [{ type: 'E' , bonus: 1}, { type: 'S' , bonus: 1}],
    limit: 'H1',
    special: 'Base Value + 500gp',
    upgradesTo: 'guill',
    settlement: 'Productivity +1',
    description: ''
  },
  {
    id: 'univy',
    name: 'University',
    cost: 78,
    lots: 4,
    kingdom: [{ type: 'E' , bonus: 3}, { type: 'L' , bonus: 3}, { type: 'F' , bonus: 1}],
    discount: ['acady', 'barde', 'libry', 'magiy', 'miliy', 'musem'],
    upgradesFrom: 'acady',
    magicItems: '4 minor scrolls or wondorous items, 2 medium scrolls or wondorous items,  ',
    settlement: 'bla de bla',
    description: ''
  },
  {
    id: 'watcr',
    name: 'Watchtower',
    cost: 12,
    lots: 1,
    kingdom: [{ type: 'S' , bonus: 1}, { type: 'U' , bonus: -1}],
    special: 'Defense +2',
    description: ''
  },
  {
    id: 'watet',
    name: 'Waterfront',
    cost: 90,
    lots: 4,
    kingdom: [{ type: 'E' , bonus: 4}],
    discount: ['blact', 'guill', 'markt', 'pier'],
    limit: 'P1',
    special: 'bla de bla',
    upgradesFrom: 'pier',
    magicItems: '2 minor wondorous items, 1 medium wondorous item, 1 major wondorous item',
    settlement: 'Productivity +2',
    description: ''
  }
];

// name: string;
// cost: number;
// spaces: string;
// bonus: string[];
// reqs: string;
