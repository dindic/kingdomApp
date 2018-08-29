import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SignInService } from '../auth/signin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lateral-menu',
  providers: [SignInService],
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.sass']
})
export class LateralMenuComponent implements OnInit {

  idc: string;
  loggedIn = false;
  collapsed = true;

  @Output() closeMenu = new EventEmitter();

  constructor(private authService: SignInService, private router: Router) { }

  ngOnInit() {

    this.idc = this.authService.toUser(localStorage.getItem('user'))._id;
    if (!this.idc) {
      this.idc = '';
    }
    this.loggedIn = this.authService.isLoggedIn();
  }

  private showMenu(event: boolean) {

    this.closeMenu.emit(event);
  }

  private onLogout() {
    this.authService.logout();
    this.router.navigateByUrl(`/signin`);
  }

  private onSaveData() {}

  private onFetchData() {}

  alert() {
    console.log('ieo');
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

}
