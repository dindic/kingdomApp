import { Bonuses } from './../datos/class.control_check';
import { Leader } from './../datos/class.leader';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {

  habilities: string;
  sign: string;
  modifier = 0;
  @Input() leader: Leader;

  @Output() leaderCallback = new EventEmitter();
  @Output() changeLeaderCallback = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('Leader Name:'  + this.leader.name);
    console.log('Leader Leadership:'  + this.leader.leadership);
    switch (this.leader.id) {
      case 'Ruler':
          this.habilities = 'Cha';
          this.leader.hability = this.habilities;
      break;
      case 'Consort':
        this.habilities = 'Cha(Half)';
        this.leader.hability = this.habilities;
      break;
      case 'Councilor':
      this.habilities = 'Cha/Wis';
      this.leader.hability = this.habilities;
      break;
      case 'General':
      this.habilities = 'Cha/Str';
      this.leader.hability = this.habilities;
      break;
      case 'Grand Diplomat':
      this.habilities = 'Cha/Int';
      this.leader.hability = this.habilities;
      break;
      case 'High Priest':
      this.habilities = 'Cha/Wis';
      this.leader.hability = this.habilities;
      break;
      case 'Magister':
      this.habilities = 'Cha/Int';
      this.leader.hability = this.habilities;
      break;
      case 'Marshal':
      this.habilities = 'Dex/Wis';
      this.leader.hability = this.habilities;
      break;
      case 'Royal Assassin':
      this.habilities = 'Dex/Str';
      this.leader.hability = this.habilities;
      break;
      case 'Spymaster':
      this.habilities = 'Dex/int';
      this.leader.hability = this.habilities;
      break;
      case 'Treasurer':
      this.habilities = 'Int/Wis';
      this.leader.hability = this.habilities;
      break;
      case 'Warden':
      this.habilities = 'Con/Str';
      this.leader.hability = this.habilities;
      break;

      default:
        break;
    }

  }

  getVal() {
    this.modifier = this.leader.modifier;

    if (this.leader.leadership) {

      this.modifier ++;
      // console.log('modifier: ' + this.modifier);
    }

    return this.modifier;
  }

  getSign() {
    if (this.leader.modifier >= 0) {
      this.sign = '+';
    } else {
      this.sign = '';
    }
    return this.sign;
  }

  public toggleVacancy() {
    if (this.leader.vacancy) {
      this.leader.vacancy = false;
    } else {
      this.leader.vacancy = true;
      this.leader.presence = false;
    }
    this.leaderCallback.emit(this.leader);
  }

  public togglePresence() {
    if (this.leader.presence) {
      this.leader.presence = false;
    } else {
      this.leader.presence = true;
    }
    this.leaderCallback.emit(this.leader);
  }

  public changeLeader(id) {
    console.log(id);
    this.changeLeaderCallback.emit(id);
  }

}
