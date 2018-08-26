import { Component, OnInit } from '@angular/core';
import { KingdomService } from '../kingdom.service';
import { Observable } from 'rxjs/Observable';
import { Kingdom } from '../datos/class.kingdom';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-kingdoms',
  providers: [KingdomService],
  templateUrl: './saved-kingdoms.component.html',
  styleUrls: ['./saved-kingdoms.component.sass']
})
export class SavedKingdomsComponent implements OnInit, OnDestroy {
  
  kingdomList$: Observable<Kingdom[]>;
  kingdomsSubscription: Subscription;
  
  @Input() idc: string;

  constructor(private kingdomService: KingdomService, private router: Router ) {}

  ngOnInit() {
    this.kingdomsSubscription = this.getKingdoms().subscribe();
  }

  getKingdoms() {
    console.log('saved--> get kigndoms');
    this.kingdomList$ = this.kingdomService.getKingdomsByCreator(this.idc);
    return this.kingdomList$;
  }

  onClick(id) {
    console.log(id);
    this.router.navigateByUrl(`/kingdom/${id}`);
  }

  ngOnDestroy() {
    this.kingdomsSubscription.unsubscribe();
  }
}
