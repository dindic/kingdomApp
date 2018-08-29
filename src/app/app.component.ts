import { animation } from '@angular/animations';
import { Component } from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';
import { RouterOutlet } from '@angular/router/src/directives/router_outlet';
import { routeSlideStateTrigger } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ routeSlideStateTrigger ]
})

export class AppComponent{
  private showMenu: boolean;
  oldPage: string;
  idc: string;

  constructor() {
    this.oldPage = 'rootPage';
    this.showMenu = false;
  }



  public getAnimationData(outlet: RouterOutlet) {

    const routeData = outlet.activatedRouteData['animation'];

    if (!routeData) {
      return 'rootPage';
    }

    if (this.oldPage !== routeData['page']) {
      window.scrollTo(0, 0);
      this.oldPage = routeData['page'];
    }
    // console.log('routeData :' + routeData['page'] + ' oldPage ' + this.oldPage);
    return routeData['page'];
  }

  public toggleMenu(event: boolean) {
    this.showMenu = event;
  }
}
