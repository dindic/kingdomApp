export class Bonuses {
    buildings: number;
    edicts: number;
    events: number;
    leadership: number;
    resources: number;
    alignment: number;
    others: number;

    constructor() {
      this.buildings = 0;
      this.edicts = 0;
      this.events = 0;
      this.leadership = 0;
      this.resources = 0;
      this.alignment = 0;
      this.others = 0;
    }
}

export class Penalties {
  edicts: number;
  unrest: number;
  vacancies: number;
  other: number;

  constructor() {
    this.edicts = 0;
    this.unrest = 0;
    this.vacancies = 0;
    this.other = 0;
  }
}
export class ControlCheck {
  bonuses: Bonuses = new Bonuses();
  penalties: Penalties = new Penalties();

  constructor() {
  }

}

export class ControlEditables {
  bonuses : { events : number, other : number};
  penalties : { other: number };

 
  constructor(event: number, otherBonus: number, otherMalus: number) {
    this.bonuses = {events: event, other: otherBonus};
    this.penalties = { other: otherMalus};
  }

}