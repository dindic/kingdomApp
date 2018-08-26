import { KingdomService } from './../kingdom.service';
import { Kingdom } from './../datos/class.kingdom';
import { Bonuses } from './../datos/class.control_check';
import { Leader } from './../datos/class.leader';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { routeSlideStateTrigger } from '../../app/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable} from 'rxjs';
import { PLATFORM_BROWSER_ID } from '@angular/common/src/platform_id';


@Component({
  selector: 'app-leaders',
  providers: [KingdomService],
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.css'],
  animations: [
    routeSlideStateTrigger
  ]
})
export class LeadersComponent implements OnInit {
  // @HostBinding('@routeSlideState') routeAnimation = true;

  kingdom$: Observable<Kingdom>;
  // kingdom: Kingdom;
  idKing: String;

  newLeader: {
    name: string,
    hability: string,
    value: number,
    leadership: boolean
  };
  public leaders: Leader[];
  public changeLeader: string;

  constructor(private route: ActivatedRoute, private kingdomService: KingdomService, private modalService: NgbModal) {
    this.newLeader = {name: '', hability: '', value: 0, leadership: false };
  }

  ngOnInit() {
    this.idKing = this.route.snapshot.params['idc'];
    console.log('Id kingdom????' + this.idKing);
    this.getKingdom(this.idKing).subscribe((kingdom) => {
      // this.kingdom = kingdom;
      this.leaders = kingdom.leaders;
    });
  }

  getKingdom(idCity) {
    this.kingdom$ = this.kingdomService.getKingdomById(idCity);
    return this.kingdom$;
  }

  setKingdom(): void {
    // this.kingdomService.setKingdomLeaders(this.leaders);
  }

  updateLeader(leader: Leader) {

    for (let i = 0; i < this.leaders.length; i++) {
      if (this.leaders[i].id === leader.id) {
        this.leaders[i] = leader;
        console.log(this.leaders[i].vacancy);
      }
    }
    this.leaders.forEach(function (value) {
      if ( value.id === leader.id) {
        console.log('Value: ' + value.vacancy);
      }
    });
    // this.setKingdom();
  }

  changeLeaderCallback(id: string, content): void {
    console.log('Arriba:' + id);
    this.changeLeader = id;
    for (let i = 0; i < this.leaders.length; i++) {
      if (this.leaders[i].id === id) {
        this.newLeader.name = this.leaders[i].name;
        this.newLeader.value = this.leaders[i].modifier;
        this.newLeader.hability = this.leaders[i].hability;
        this.newLeader.leadership = this.leaders[i].leadership;
        console.log(this.newLeader.hability);
        break;
      }
    }

    this.modalService.open(content);
  }

  addNewLeader(id) {
    console.log(id);
    console.log(this.newLeader.name);
    console.log(this.newLeader.value);
    console.log(this.newLeader.hability);
    for (let i = 0; i < this.leaders.length; i++) {
      if (this.leaders[i].id === id) {
        this.leaders[i].name = this.newLeader.name;
        this.leaders[i].modifier = this.newLeader.value;
        this.leaders[i].hability = this.newLeader.hability;
        this.leaders[i].leadership = this.newLeader.leadership;
        break;
      }
    }
  }

  saveData() {
    console.log('Save data');
    this.leaders.forEach(function (value) {
      if ( value.vacancy === true) {
        console.log('Value: ' + value.vacancy);
      }
    });
    // this.kingdom.leaders = this.leaders;
    // this.kingdomService.updateKingdomById(this.kingdom, this.idKing).subscribe();
     this.kingdomService.updateLeadersById(this.leaders, this.idKing).subscribe();
    // this.kingdomService.updateLeadersById(leaders, this.idKing);
  }
}
