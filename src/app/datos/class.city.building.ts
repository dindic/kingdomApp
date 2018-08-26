export class Building {
  id: string;
  name: string;
  cost: number;
  lots: number;
  kingdom?: [{type: string, bonus: number}];
  discount?: string[];
  limit?: string;
  special?: string;
  upgradesTo?: string;
  upgradesFrom?: string;
  magicItems?: string;
  settlement?: string;
  description?: string;

}
