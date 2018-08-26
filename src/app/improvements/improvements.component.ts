import { Component, OnInit } from '@angular/core';
import { Kingdom } from './../datos/class.kingdom';
import { TerrainImprovement } from '../datos/class.improvement';
import { KingdomService } from '../kingdom.service';
import { TERRAIN_IMPROVEMENTS } from '../datos/mock.improvements';
import { routeSlideStateTrigger } from '../../app/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-improvements',
  providers: [KingdomService],
  templateUrl: './improvements.component.html',
  styleUrls: ['./improvements.component.css'],
  animations: [ routeSlideStateTrigger ]
})
export class ImprovementsComponent implements OnInit {
  idKing: string;
  kingdomImprovements: [{id: string, total: number}];
  improvements: TerrainImprovement[] = [];
  constructor(private route: ActivatedRoute, private kingdomService: KingdomService) { }

  ngOnInit() {
    this.improvements = TERRAIN_IMPROVEMENTS;
    this.idKing = this.route.snapshot.params['idc'];

    this.getKingdom(this.idKing).subscribe((kingdom) => {

        this.kingdomImprovements = kingdom.improvements;

        this.kingdomImprovements.forEach(improv => {
          for (let i = 0; i < this.improvements.length; i++) {
            if (this.improvements[i].id === improv.id) {
              this.improvements[i].total = improv.total;
            }
          }
        });
    });
    // this.getKingdoms();
  }
  // getKingdoms(): void {
  //   console.log(this.kingdomService.getKingdoms());
  // }
  getKingdom(kingdomId: string): Observable<Kingdom> {
    return this.kingdomService.getKingdomById(kingdomId);

    // this.kingdomImprovements = this.kingdomService.getKingdom().improvements;

    // this.improvements = this.improvements.filter(function(el) {
    //   console.log('id?:' + el.id + '  total?:' + el.total);
    //   return el.total !== 0;
    // });
  }

  saveData(): void {
    console.log('Save data click');
    this.improvements.forEach(kImprov => {
      let found = false;
      for (let i = 0; i < this.kingdomImprovements.length; i++) {

        if (this.kingdomImprovements[i].id === kImprov.id) {
          
          this.kingdomImprovements[i].total = kImprov.total;
          found = true;
        }
      }
      if (!found) {
        this.kingdomImprovements.push({
          id: kImprov.id,
          total: kImprov.total
        });
      }
    });
    this.kingdomService.updateImprovementsById(this.kingdomImprovements, this.idKing).subscribe();
  }

}
