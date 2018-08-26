import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Kingdom } from '../datos/class.kingdom';
import { ControlEditables } from '../datos/class.control_check';
import { KingdomService } from '../kingdom.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-kingdom',
  providers: [KingdomService],
  templateUrl: './new-kingdom.component.html',
  styleUrls: ['./new-kingdom.component.sass']
})
export class NewKingdomComponent implements OnInit, OnDestroy {
  alignments = [
   {id: 'LG' , name: 'Lawful Good'},
   {id: 'NG' , name: 'Neutral Good'},
   {id: 'CG' , name: 'Chaotic Good'},
   {id: 'LN' , name: 'Lawful Neutral'},
   {id: 'N' ,  name: 'Neutral'},
   {id: 'CN' , name: 'Chaotic Neutral'},
   {id: 'LE' , name: 'Lawful Evil'},
   {id: 'NE' , name: 'Neutral Evil'},
   {id: 'CE' , name: 'Chaotic Evil'}];

  defaultAlignment = 'LG';
  
  nameRepeated = false;
  kingdomSubscription: Subscription;
  newKingdomSubscription: Subscription;

  constructor(private kingdomService: KingdomService, private router: Router) {}

  ngOnInit() {
  }

  setNewUser(id: any): void {
    console.log(id);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    //If valid()

    //Check name in service
    //findKingdomByNameAndCreator()

    //if not kingdom

    let auxEcon: ControlEditables = new ControlEditables( 0,0,0);

    let auxLoy: ControlEditables = new ControlEditables( 0,0,0);

    let auxStab: ControlEditables = new ControlEditables( 0,0,0);

    if(!form.value.startingSize || form.value.startingSize < 1) {
      form.value.startingSize = 1;
    }

    let newKingdom: Kingdom = new Kingdom(
      form.value.startingSize,
      0,
      form.value.startingBP,
      'None',
      'None',
      'None',
      auxEcon,
      auxLoy,
      auxStab,
      form.value.name,
      form.value.capitalName,
      form.value.rulerName,
      form.value.alignment
    );

    //create new kingdom
    this.kingdomSubscription = this.kingdomService.newKingdom(newKingdom).subscribe(
      (kingdom) => {
        //S'ha creat correctament el kingdom
        if(kingdom) {
          //redirigim a la vista kingdom
          this.router.navigateByUrl(`/kingdom/${kingdom._id}`);
        }

      });
  }

  checkName(f) {
    console.log(f.value.name);
    this.newKingdomSubscription = this.kingdomService.getKingdomByCreatorAndName('5b2380c9d6dddc3b84dda381', f.value.name).subscribe((kingdom) => {
      // this.kingdom = kingdom;
      if(kingdom) {
        this.nameRepeated = true;
      } else {
        this.nameRepeated = false;
      }
    });
    
  }

  ngOnDestroy() {
    if(this.newKingdomSubscription){
      this.newKingdomSubscription.unsubscribe();
    }
    
    if(this.kingdomSubscription){
      this.kingdomSubscription.unsubscribe();
    }
    
  }
}
