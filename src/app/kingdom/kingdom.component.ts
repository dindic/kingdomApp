import { animation } from '@angular/core/src/animation/dsl';
import { KINGDOM } from './../datos/mock.kingdom';
import { KingdomService } from '../kingdom.service';
import { Edict } from './../datos/class.edict';
import { Consumption } from './../datos/class.consumption';
import { ControlCheck } from './../datos/class.control_check';
import { Kingdom } from './../datos/class.kingdom';
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Leader } from '../datos/class.leader';
import { slideTrigger, ngIfAnimationTrigger } from '../../app/animations';
import { OpticonsDirective } from './../directives/opticons.directive';

import { Observable} from 'rxjs';
import { Observer} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Promise } from 'q';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { City } from '../datos/class.city';
import { BUILDINGS } from '../datos/mock.buildings.list';
import { Building } from '../datos/class.city.building';
import { ControlEditables } from '../datos/class.control_check';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-kingdom',
  templateUrl: './kingdom.component.html',
  styleUrls: ['./kingdom.component.css'],
  providers: [KingdomService],
  animations: [ slideTrigger, ngIfAnimationTrigger ]
})
export class KingdomComponent implements OnInit, OnDestroy {

  // @HostBinding('@routeSlideState') routeAnimation = true;
  private kingdomId = ''; // '5b290ff2d2b3e739f9f6934c';
  // private creatorId = '5b2380c9d6dddc3b84dda381';
  kingdom: Kingdom; // = KINGDOM;
  kingdom$: Observable<Kingdom>;
  kingdomForm: FormGroup;
  private controlDC: number;
  public cities: number;
  public districts: number;
  public fullLots: number;
  public population: number;
  public consum: Consumption = new Consumption();

  // Edicts
  public holidayEdict: Edict[];
  private holidaySelected: Edict;
  public taxationEdict: Edict[];
  private taxationSelected: Edict;
  public promotionEdict: Edict[];
  private promotionSelected: Edict;


  // Flags show/hide
  public mostrar_leaders: boolean;
  private show_economy: boolean;
  private show_loyalty: boolean;
  private show_stability: boolean;
  private show_consumption: boolean;
  private show_cities: boolean;
  private show_buttons: boolean;
  private show_controls: boolean;
  private show_edicts: boolean;

  economyStats: ControlCheck = new ControlCheck();
  loyaltyStats: ControlCheck = new ControlCheck();
  stabilityStats: ControlCheck = new ControlCheck();

  octi = 'arrow-up';
  public _economy: number;
  public get economy(): number {
    return this._economy;
  }
  public set economy(v: number) {
    this._economy = v;
  }

  rulerModifier = 0;
  consortModifier = 0;
  spyMasterModifier = 0;


  // Subscipcions
  taxationSubscription: Subscription;
  holidaySubscription: Subscription;
  promotionSubscription: Subscription;
  unrestSubscription: Subscription;
  kingdomSubscription: Subscription;
  kingdomUpSubscription: Subscription;

  constructor(private route: ActivatedRoute, private kingdomService: KingdomService) {

    this.holidayEdict = [
      { value: 'None',
        bonus: -1,
        cost: 0
       },
       { value: '1',
        bonus: 1,
        cost: 1
       },
       { value: '6',
        bonus: 2,
        cost: 2
       },
       { value: '12',
        bonus: 3,
        cost: 4
       },
       { value: '24',
        bonus: 4,
        cost: 8
       }
    ];

    this.taxationEdict = [
      { value: 'None',
        bonus: 0,
        cost: 1
       },
       { value: 'Light',
        bonus: 1,
        cost: -1
       },
       { value: 'Normal',
        bonus: 2,
        cost: -2
       },
       { value: 'Heavy',
        bonus: 3,
        cost: -4
       },
       { value: 'Overwhelming',
        bonus: 4,
        cost: -8
       }
    ];

    this.promotionEdict = [
      { value: 'None',
        bonus: -1,
        cost: 0
       },
       { value: 'Token',
        bonus: 1,
        cost: 1
       },
       { value: 'Standard',
        bonus: 2,
        cost: 2
       },
       { value: 'Aggressive',
        bonus: 3,
        cost: 4
       },
       { value: 'Expansionist',
        bonus: 4,
        cost: 8
       }
    ];

    this.holidaySelected = this.holidayEdict[0];
    this.taxationSelected = this.taxationEdict[0];
    this.promotionSelected = this.promotionEdict[0];
    // Initialize Values
    this.mostrar_leaders = false;
    this.show_economy = false;
    this.show_loyalty = false;
    this.show_stability = false;
    this.show_consumption = false;
    this.show_cities = false;
    this.show_buttons = true;
    this.show_controls = true;
    this.show_edicts = true;

    this.controlDC = 20;

  }

  ngOnInit() {
    this.kingdomId = this.route.snapshot.params['idk'];
    this.kingdomSubscription = this.getKingdom().subscribe((kingdom) => {
      console.log('in');
      // this.kingdom = kingdom;
      this.kingdom = kingdom;
      console.log(kingdom);
      this.kingdomForm = new FormGroup({
        'size': new FormControl(kingdom.size),
        'unrest' : new FormControl(kingdom.unrest),
        'bps' : new FormControl(kingdom.bps),
        'promotion' : new FormControl(kingdom.promotion),
        'taxation' : new FormControl(kingdom.taxation),
        'holiday' : new FormControl(kingdom.holiday),
        'consOther' : new FormControl(0)
        //  kingdom.size, kingdom.unrest, kingdom.bps, kingdom.promotion,
        //                              kingdom.taxation, kingdom.holiday
      });

      this.kingdomForm.controls['promotion'].setValue(kingdom.promotion);

      this.economyStats.bonuses.events = this.kingdom.economy.bonuses.events;
      this.economyStats.bonuses.others = this.kingdom.economy.bonuses.other;
      this.economyStats.penalties.other = this.kingdom.economy.penalties.other;

      this.loyaltyStats.bonuses.events = this.kingdom.loyalty.bonuses.events;
      this.loyaltyStats.bonuses.others = this.kingdom.loyalty.bonuses.other;
      this.loyaltyStats.penalties.other = this.kingdom.loyalty.penalties.other;

      this.stabilityStats.bonuses.events = this.kingdom.stability.bonuses.events;
      this.stabilityStats.bonuses.others = this.kingdom.stability.bonuses.other;
      this.stabilityStats.penalties.other = this.kingdom.stability.penalties.other;

      this.calculateBuildings(kingdom.cities);

      this.traspasarDatosLeaders();
      this.calcularTotalsEconomy();
      this.calcularImprovements();

      // Event emiters subscriptions!
      this.holidaySubscription = this.kingdomForm.controls['holiday'].valueChanges.subscribe((hol) => {
        if (hol) { this.holidayOnChange(hol); }
      });
      this.taxationSubscription = this.kingdomForm.controls['taxation'].valueChanges.subscribe((tax) => {
        if (tax) { this.taxationOnChange(tax); }
      });
      this.promotionSubscription = this.kingdomForm.controls['promotion'].valueChanges.subscribe((prom) => {
        if (prom) { this.promotionOnChange(prom); }
      });
      if (!kingdom.holiday || kingdom.holiday === '') {
        kingdom.holiday = 'None';
      }

      this.kingdomForm.controls['holiday'].setValue(
        this.holidayEdict.find( e => e.value === kingdom.holiday), {onlySelf: true}
      );

      if (!kingdom.taxation || kingdom.taxation === '') {
        kingdom.taxation = 'None';
      }
      this.kingdomForm.controls['taxation'].setValue(
        this.taxationEdict.find( e => e.value === kingdom.taxation), {onlySelf: true}
      );

      if (!kingdom.promotion || kingdom.promotion === '') {
        kingdom.promotion = 'None';
      }

      this.kingdomForm.controls['promotion'].setValue(
        this.promotionEdict.find( e => e.value === kingdom.promotion), {onlySelf: true}
      );

      this.unrestSubscription = this.kingdomForm.controls['unrest'].valueChanges.subscribe((unrest) => {
        if (unrest) { this.unrestOnChange(unrest); }
      });
    });
  }

  public showLeaders() {
    if (this.mostrar_leaders) {
      this.mostrar_leaders = false;
    } else {
      this.mostrar_leaders = true;
    }
  }

  public showEconomy() {
    if (this.show_economy) {
      this.show_economy = false;
    } else {
      this.show_economy = true;
    }
    this.calcularShowButtons();
  }

  public showLoyalty() {
    if (this.show_loyalty) {
      this.show_loyalty = false;
    } else {
      this.show_loyalty = true;
    }
    this.calcularShowButtons();
  }

  public showStability() {
    if (this.show_stability) {
      this.show_stability = false;
    } else {
      this.show_stability = true;
    }
    this.calcularShowButtons();
  }

  public showConsumption() {

    this.consum.edicts = this.holidaySelected.cost + 0;

    if (this.show_consumption) {
      this.show_consumption = false;
    } else {
      this.show_consumption = true;
    }
  }

  public calcularShowButtons() {
     // console.log('calcularShowButtons: ' + this.show_economy + ' -- ' + this.show_stability + ' -- ' + this.show_loyalty);
    if (this.show_economy || this.show_stability || this.show_loyalty ) {
      this.show_buttons = false;
    } else {
      this.show_buttons = true;
    }
  }

  private resetDatosLeaders() {
    this.economyStats.bonuses.leadership = 0;
    this.stabilityStats.bonuses.leadership = 0;
    this.loyaltyStats.bonuses.leadership = 0;
    this.economyStats.penalties.vacancies = 0;
    this.stabilityStats.penalties.vacancies = 0;
    this.loyaltyStats.penalties.vacancies = 0;
  }
  private traspasarDatosLeaders() {
    // Reseteamos datos primero y luego asignamos
    this.resetDatosLeaders();

    // Traspasar datos leaders
    for (let i = 0; i < this.kingdom.leaders.length; i++) {
      const lead = this.kingdom.leaders[i];

      switch (lead.id) {
        case 'Ruler':
          if (lead.ruler != null && lead.presence) {
            // for (let j = 0; j < lead.ruler.length; j++ ) {
            //   switch (lead.ruler[j]) {
            //     case 'E':
            //       this.economyStats.bonuses.leadership += lead.modifier;
            //     break;
            //     case 'S':
            //       this.stabilityStats.bonuses.leadership += lead.modifier;
            //     break;
            //     case 'L':
            //       this.loyaltyStats.bonuses.leadership += lead.modifier;
            //     break;
            //     default:
            //       break;
            //   }
            // }
            this.rulerModifier = lead.modifier;
          }

          if (lead.vacancy) {
            this.kingdom.unrest += 4;
          }

        break;
        case 'Consort':
          if (lead.presence) {
            // if (lead.ruler != null) {
            //   for (let j = 0; j < lead.ruler.length; j++ ) {
            //     switch (lead.ruler[j]) {
            //       case 'E':
            //           this.economyStats.bonuses.leadership += lead.modifier;
            //         break;
            //       case 'S':
            //         this.stabilityStats.bonuses.leadership += lead.modifier;
            //       break;
            //       case 'L':
            //           this.loyaltyStats.bonuses.leadership += lead.modifier;
            //         break;
            //       default:
            //         break;
            //     }
            //   }
            // }

            this.consortModifier = Math.trunc(lead.modifier / 2);
          }
          if (lead.vacancy) {
            // None
          }
        break;
        case 'Councilor':
          if (lead.presence) {
            this.loyaltyStats.bonuses.leadership += lead.modifier;
          }
          if (lead.vacancy) {
            this.loyaltyStats.penalties.vacancies += 2;
            this.kingdom.unrest += 1;
          }
          // TO DO: Afegir flag de holiday edicts y si s'implementa sistema de torns sumar unrest
        break;
        case 'General':
          if (lead.presence) {
            this.stabilityStats.bonuses.leadership += lead.modifier;
          }
          if (lead.vacancy) {
            this.loyaltyStats.penalties.vacancies += 4;
          }
        break;
        case 'Grand Diplomat':
          if (lead.presence) {
            this.stabilityStats.bonuses.leadership += lead.modifier;
          }
          if (lead.vacancy) {
            this.stabilityStats.penalties.vacancies += 2;
            // TO DO: Afegir flag de diplomatic o eploration edicts
          }
        break;
        case 'High Priest':
          if (lead.presence) {
            this.stabilityStats.bonuses.leadership += lead.modifier;
          }
          if (lead.vacancy) {
            this.loyaltyStats.penalties.vacancies += 2;
            this.stabilityStats.penalties.vacancies += 2;
            this.kingdom.unrest += 1;
          }
          // TO DO: Si s'implementa sistema de torns sumar unrest
        break;
        case 'Magister':
          if (lead.presence) {
            this.economyStats.bonuses.leadership += lead.modifier;
          }
          if (lead.vacancy) {
            this.economyStats.penalties.vacancies += 4;
          }
        break;
        case 'Marshal':
          if (lead.presence) {
            this.economyStats.bonuses.leadership += lead.modifier;
          }
          if (lead.vacancy) {
            this.economyStats.penalties.vacancies += 4;
          }
        break;
        case 'Royal Assassin':
          if (lead.presence) {
            this.loyaltyStats.bonuses.leadership += lead.modifier;
          }
          if (lead.vacancy) {
            // None
          }
        break;
        case 'Spymaster':
          if (lead.presence) {
            this.spyMasterModifier = lead.modifier;
          }
          if (lead.vacancy) {
            this.economyStats.penalties.vacancies += 4;
            this.kingdom.unrest += 1;
          }
          // TO DO: Si s'implementa sistema de torns sumar unrest
        break;
        case 'Treasurer':
          if (lead.presence) {
            this.economyStats.bonuses.leadership += lead.modifier;
          }
          if (lead.vacancy) {
            this.economyStats.penalties.vacancies += 4;
          }
          // TO DO: implementar flag no pot coleccionar taxes
        break;
        case 'Warden':
          if (lead.presence) {
            this.loyaltyStats.bonuses.leadership += lead.modifier;
          }
          if (lead.vacancy) {
            this.loyaltyStats.penalties.vacancies += 2;
            this.stabilityStats.penalties.vacancies += 2;
          }
        break;

        default:
          break;
      }
    }
  }

  getKingdom() {

    console.log(this.kingdomId);
    this.kingdom$ = this.kingdomService.getKingdomById(this.kingdomId);
    console.log(this.kingdom$);
    return this.kingdom$;
    // console.log(this.kingdom$);
    // const id = '5b290ff2d2b3e739f9f6934c';
    // this.kingdom$ = this.kingdomService.getKingdom(id);
  }

  calculateBuildings(cities: City[]) {
    cities.forEach( city => {
      city.districts.forEach( district => {
        district.buildingGrid.forEach( o => {

          if (o.value.charAt(o.value.length - 1 ) !== '?') {

            const kingdomModis = BUILDINGS.find( build => {
              return o.value === build.id;
            }).kingdom;

            if (kingdomModis) {
              kingdomModis.forEach( modis => {
                console.log(modis.bonus);
                switch (modis.type) {
                  case 'E':

                    if (modis.bonus > 0) {
                      this.economyStats.bonuses.buildings += modis.bonus;
                    } else {
                      this.economyStats.penalties.edicts += modis.bonus; // FIXME
                    }
                    break;

                  case 'L':
                    if (modis.bonus > 0) {
                      this.loyaltyStats.bonuses.buildings += modis.bonus;
                    } else {
                      this.loyaltyStats.penalties.edicts += modis.bonus; // FIXME
                    }
                    break;

                  case 'S':
                    if (modis.bonus > 0) {
                      this.stabilityStats.bonuses.buildings += modis.bonus;
                    } else {
                      this.stabilityStats.penalties.edicts += modis.bonus; // FIXME
                    }
                    break;

                  case 'U':
                    // this.kingdomForm.controls['unrest'].setValue(this.kingdomForm.controls['unrest'].value + modis.bonus);
                    break;

                  default:
                    break;
                }
              });
            }
          }
        });
      });
    });
  }
  private calcularTotalsEconomy() {

    this.economyStats.penalties.unrest = this.kingdom.unrest;
    this.loyaltyStats.penalties.unrest = this.kingdom.unrest;
    this.stabilityStats.penalties.unrest = this.kingdom.unrest;

  }

  calcularEconomy() {
    let total = this.economyStats.bonuses.buildings +
                this.economyStats.bonuses.edicts +
                this.economyStats.bonuses.events +
                this.economyStats.bonuses.leadership +
                this.economyStats.bonuses.resources +
                this.economyStats.bonuses.alignment +
                this.economyStats.bonuses.others
                - this.economyStats.penalties.edicts
                - this.economyStats.penalties.unrest
                - this.economyStats.penalties.vacancies
                - this.economyStats.penalties.other;
    if (this.economyStats.bonuses.ruler ) {
      total += this.rulerModifier;
    }
    if (this.economyStats.bonuses.consort ) {
      total += this.consortModifier;
    }
    if (this.economyStats.bonuses.spymaster ) {
      total += this.spyMasterModifier;
    }

    return total;
  }

  calcularLoyalty() {
    let total = this.loyaltyStats.bonuses.buildings +
                this.loyaltyStats.bonuses.edicts +
                this.loyaltyStats.bonuses.events +
                this.loyaltyStats.bonuses.leadership +
                this.loyaltyStats.bonuses.resources +
                this.loyaltyStats.bonuses.alignment +
                this.loyaltyStats.bonuses.others
                - this.loyaltyStats.penalties.edicts
                - this.loyaltyStats.penalties.unrest
                - this.loyaltyStats.penalties.vacancies
                - this.loyaltyStats.penalties.other;
    if (this.loyaltyStats.bonuses.ruler ) {
      total += this.rulerModifier;
    }
    if (this.loyaltyStats.bonuses.consort ) {
      total += this.consortModifier;
    }
    if (this.loyaltyStats.bonuses.spymaster ) {
      total += this.spyMasterModifier;
    }

    return total;
  }

  calcularStability() {
    let total = this.stabilityStats.bonuses.buildings +
                this.stabilityStats.bonuses.edicts +
                this.stabilityStats.bonuses.events +
                this.stabilityStats.bonuses.leadership +
                this.stabilityStats.bonuses.resources +
                this.stabilityStats.bonuses.alignment +
                this.stabilityStats.bonuses.others
                - this.stabilityStats.penalties.edicts
                - this.stabilityStats.penalties.unrest
                - this.stabilityStats.penalties.vacancies
                - this.stabilityStats.penalties.other;
    if (this.stabilityStats.bonuses.ruler ) {
      total += this.rulerModifier;
    }
    if (this.stabilityStats.bonuses.consort ) {
      total += this.consortModifier;
    }
    if (this.stabilityStats.bonuses.spymaster ) {
      total += this.spyMasterModifier;
    }

    return total;
  }

  private calcularImprovements() {
    // Consumption modifiers
    // let raods = 0;
    this.kingdom.improvements.forEach(improv => {

      switch (improv.id) {
        case 'farm':
          this.consum.farms += (-2 * improv.total);
        break;

        case 'fish':
          this.consum.farms += (-1 * improv.total);
        break;

        case 'aque':
          this.loyaltyStats.bonuses.resources += improv.total; // FIXME
          this.stabilityStats.bonuses.resources += improv.total; // FIXME
        break;

        case 'brid':
          // if (improv.total > 0) {
          //   raods =+ improv.total;
          // }

        break;

        case 'cana':

        break;

        case 'fort':
          this.stabilityStats.bonuses.resources += (improv.total * 2); // FIXME
          this.consum.miscelanea += improv.total;
        break;

        case 'high':
          if (improv.total > 0) {
            this.economyStats.bonuses.resources += Math.floor(improv.total / 4 ); // FIXME
            this.stabilityStats.bonuses.resources += Math.floor(improv.total / 8 ); // FIXME
          }
        break;

        case 'mine':
          this.economyStats.bonuses.resources  += improv.total; // FIXME
        break;

        case 'quar':
          this.stabilityStats.bonuses.resources  += improv.total; // FIXME
        break;

        case 'road':
          if (improv.total > 0) {
            this.economyStats.bonuses.resources += Math.floor(improv.total / 4 ); // FIXME
            this.stabilityStats.bonuses.resources += Math.floor(improv.total / 8 ); // FIXME
          }
        break;

        case 'sawm':
          this.stabilityStats.bonuses.resources += improv.total; // FIXME
        break;

        case 'watc':
          this.stabilityStats.bonuses.resources += improv.total;
        break;

        default:
          break;
      }
    });
  }

  private econBonusChange(event) {
    this.economyStats.bonuses = event;
    this.calcularTotalsEconomy();
  }

  private econPenaltyChange(event) {
    this.economyStats.penalties = event;
    this.calcularTotalsEconomy();
  }

  private loyalBonusChange(event) {
    this.loyaltyStats.bonuses = event;
    this.calcularTotalsEconomy();
  }

  private loyalPenaltyChange(event) {
    this.loyaltyStats.penalties = event;
    this.calcularTotalsEconomy();
  }

  private stabilityBonusChange(event) {
    this.stabilityStats.bonuses = event;
    this.calcularTotalsEconomy();
  }

  private stabilityChange(event) {
    this.stabilityStats.penalties = event;
    this.calcularTotalsEconomy();
  }

  countChange(event) {
    console.log(event);
    this.economyStats.penalties = event;
    this.calcularTotalsEconomy();
  }

  // On change Events!
  holidayOnChange(edict: Edict) {
    this.holidaySelected = edict;
    if (edict.bonus >= 0) {
      this.loyaltyStats.penalties.edicts = 0;
      this.loyaltyStats.bonuses.edicts = this.holidaySelected.bonus;
    } else {
      this.loyaltyStats.bonuses.edicts = 0;
      this.loyaltyStats.penalties.edicts = Math.abs(this.holidaySelected.bonus);
    }

    this.consum.edicts = this.holidaySelected.cost;
    console.log('Event triggered :' + this.holidaySelected.bonus);
  }

  taxationOnChange(edict: Edict) {
    this.taxationSelected = edict;
    console.log('Event triggered :' + this.taxationSelected.bonus);
    this.economyStats.bonuses.edicts = this.taxationSelected.bonus;
    this.loyaltyStats.penalties.edicts = Math.abs(this.taxationSelected.cost);
  }

  promotionOnChange(edict: Edict) {
    this.promotionSelected = edict;
    console.log('Event triggered :' + this.promotionSelected.bonus);
    if (edict.bonus >= 0) {
      this.stabilityStats.penalties.edicts = 0;
      this.stabilityStats.bonuses.edicts = this.promotionSelected.bonus;
    } else {
      this.stabilityStats.bonuses.edicts = 0;
      this.stabilityStats.penalties.edicts = Math.abs(this.promotionSelected.bonus);
    }

    this.consum.edicts = this.promotionSelected.cost;
  }
  unrestOnChange(unrest: number) {
    this.stabilityStats.penalties.unrest = unrest;
    this.economyStats.penalties.unrest = unrest;
    this.loyaltyStats.penalties.unrest = unrest;
  }

  saveData() {
    // const kingo = this.kingdom$.map(kingdom => { // console.log(kingdom.size);
    //                               return new Kingdom(kingdom.size, kingdom.unrest, kingdom.bps, kingdom.promotion,
    //                              kingdom.taxation, kingdom.holiday); });
    console.log('SaveData : ' + this.economyStats.bonuses.others);
    const auxEcon: ControlEditables = new ControlEditables( this.economyStats.bonuses.events,
                                                            this.economyStats.bonuses.others,
                                                            this.economyStats.penalties.other);

    const auxLoy: ControlEditables = new ControlEditables(  this.loyaltyStats.bonuses.events,
                                                            this.loyaltyStats.bonuses.others,
                                                            this.loyaltyStats.penalties.other);

    const auxStab: ControlEditables = new ControlEditables( this.stabilityStats.bonuses.events,
                                                            this.stabilityStats.bonuses.others,
                                                            this.stabilityStats.penalties.other);

    this.kingdom = new Kingdom(this.kingdomForm.value.size, this.kingdomForm.value.unrest, this.kingdomForm.value.bps,
                               this.kingdomForm.value.promotion.value, this.kingdomForm.value.taxation.value,
                               this.kingdomForm.value.holiday.value, auxEcon, auxLoy, auxStab );

    console.log('Just abans: ' + this.kingdom.economy.bonuses.other);
    this.kingdom$ = this.kingdomService.updateKingdomById(this.kingdom, this.kingdomId);
    this.kingdomUpSubscription = this.kingdom$.subscribe(
      kingdom => {
        this.kingdom = kingdom;
        console.log(this.kingdom.cities);
      }
    );
    // console.log(this.kingdomForm);
  }

  private getPopulation() {

    let aux = 0;
    this.kingdom.cities.forEach(city =>  {
      aux = + city.population;
    });
    this.population = aux + this.kingdomForm.get('size').value * 250;
    console.log('getPopulation : ' + this.population);
    return this.population;
  }

  ngOnDestroy(): void {
    this.promotionSubscription.unsubscribe();
    this.taxationSubscription.unsubscribe();
    this.holidaySubscription.unsubscribe();
    this.unrestSubscription.unsubscribe();
    this.kingdomSubscription.unsubscribe();
    // if(this.kingdomUpSubscription) {
    //   this.kingdomUpSubscription.unsubscribe();
    // }
  }

}
