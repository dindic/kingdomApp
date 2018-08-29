import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bonuses, Penalties } from '../datos/class.control_check';

@Component({
  selector: 'app-control-bonus',
  templateUrl: './control-bonus.component.html',
  styleUrls: ['./control-bonus.component.css']
})
export class ControlBonusComponent implements OnInit {

  @Input() bonus: Bonuses;
  @Input() penalties: Penalties;

  @Output()
  bonusChange: EventEmitter<Bonuses> = new EventEmitter<Bonuses>();
  @Output()
  penaltiesChange: EventEmitter<Penalties> = new EventEmitter<Penalties>();

  constructor() {
    // this.penalties.unrest = this.unrest;
  }

  ngOnInit() {
  }

  public onBonusChange() {
    //console.log(this.bonus.others)
    this.bonusChange.emit(this.bonus);
  }

  public onPenaltyChange() {
    //console.log(this.penalties.other)
    this.penaltiesChange.emit(this.penalties);
  }

}
