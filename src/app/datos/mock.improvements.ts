import { TerrainImprovement } from './class.improvement';

export const TERRAIN_IMPROVEMENTS: TerrainImprovement[] = [
  {
    id: 'aque',
    name: 'Aqueduct',
    terrain: ['H', 'M'],
    effect: 'Loyalty +1, Stability +1, allows settlement to build water-dependent buildings',
    cost: 'As road except cost is not doubled for hexes with rivers',
    total: 0
  },
  {
    id: 'brid',
    name: 'Bridge',
    terrain: ['R'],
    effect: 'Counts as a road (this counter is only to keep the count of bridges in your kindom, add the road properly in order to calculate improvements)',
    cost: 'Costs double of what a road would cost',
    total: 0
  },
  {
    id: 'cana',
    name: 'Canal',
    terrain: ['D', 'H', 'P'],
    effect: 'Settlements in a hex with a Canal treat the hex as if it had a river',
    cost: 'Twice the cost of a Road',
    total: 0
  },
  {
    id: 'farm',
    name: 'Farm',
    terrain: ['D', 'H', 'P'],
    effect: 'Consumption decreases by 2BP',
    cost: 'See the Terrain and Terrain Improvements table',
    total: 0
  },
  {
    id: 'fish',
    name: 'Fishery',
    terrain: ['C', 'W', 'R', 'S'],
    effect: 'Consumption decreases by 1BP',
    cost: '4BP',
    total: 0
  },
  {
    id: 'fort',
    name: 'Fort',
    terrain: ['A'],
    effect: 'Stability +2, Defense +4, Consumption 1BP, Unrest -1 when completed. *Can be upgraded from Watchtower',
    cost: '24BP',
    total: 0
  },
  {
    id: 'high',
    name: 'Highway',
    terrain: ['A'],
    effect: 'Economy +1 for every 4 Highway hexes. Stability +8 for every 8 hexes. Improves overland speed',
    cost: 'Twice the cost of a Road',
    total: 0
  },
  {
    id: 'mine',
    name: 'Mine',
    terrain: ['V', 'D', 'H', 'M'],
    effect: 'Economy +1, earn +1BP per turn when collecting taxes during income phase',
    cost: '6BP',
    total: 0
  },
  {
    id: 'quar',
    name: 'Quarry',
    terrain: ['V', 'H', 'M'],
    effect: 'Stability +1, earn +1BP per turn when collecting taxes during income phase',
    cost: '6BP',
    total: 0
  },
  {
    id: 'road',
    name: 'Road',
    terrain: ['A'],
    effect: 'Economy +1 for every 4 hexes of Road, Stability +1 for every 8 hexes. Improves overland travel speed',
    cost: 'See the table or tooltips',
    total: 0
  },
  {
    id: 'sawm',
    name: 'Sawmill',
    terrain: ['F', 'J'],
    effect: 'Stability +1, earn 1BP per turn when collecting taxes during income phase',
    cost: '3BP',
    total: 0
  },
  {
    id: 'watc',
    name: 'Watchtower',
    terrain: ['A'],
    effect: 'Stability +1, Defense +2, Unrest -1 when completed. *Can be upgraded to Fort',
    cost: '12BP',
    total: 0
  }
];

// A: All Terrains, D: Desert, H: Hill, P: Plains, C: Costline, W: Water, R: River, S: Marsh, V: Cavern, M: Mountain, F: Forest, J: Jungle
