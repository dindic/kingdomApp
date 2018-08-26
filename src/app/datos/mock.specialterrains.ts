import { SpecialTerrain } from './class.special_terrain';


export const SPECIAL_TERRAIN: SpecialTerrain[] = [
  {
    id: 'brid',
    name: 'Brige',
    description: 'The hex contains an existing Bridge over a waterway.',
    effect: 'If you build in this hex, you do not have to double the cost of the Road',
    total: 0
  },
  {
    id: 'buil',
    name: 'Building',
    description: 'The hex contains an existing building',
    effect: 'If you build in this hex,------',
    total: 0
  },
  {
    id: 'free',
    name: 'Free City',
    description: 'Free city description',
    effect: 'Free city effect',
    total: 0
  },
  {
    id: 'lair',
    name: 'Lair',
    description: 'A Lair is usually a cave or defensible shelter that can be used as a defensive fallback point, a storage location,'
                  + 'or even a guardpost or prison',
    effect: 'Stability +1. If you construct a Fort or Watchtower defense increases +1. * Might allow undreground cavern hex.',
    total: 0
  },
  {
    id: 'land',
    name: 'Landmark',
    description: 'Bla bla',
    effect: 'Bla bla',
    total: 0
  },
  {
    id: 'reso',
    name: 'Resource',
    description: 'If you bla bla bla',
    effect: 'bla bla bla',
    total: 0
  },
  {
    id: 'river',
    name: 'River',
    description: 'Bla bla bla',
    effect: 'If you build in this hex, bla bla bla',
    total: 0
  },
  {
    id: 'ruin',
    name: 'Ruin',
    description: 'Bla bla bla',
    effect: 'Bla bla bla',
    total: 0
  }
];
