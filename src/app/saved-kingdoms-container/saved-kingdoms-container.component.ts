import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignInService } from '../auth/signin.service';
import { User } from '../datos/class.user';

@Component({
  selector: 'app-saved-kingdoms-container',
  templateUrl: './saved-kingdoms-container.component.html',
  styleUrls: ['./saved-kingdoms-container.component.sass']
})
export class SavedKingdomsContainerComponent implements OnInit {
  idCreator: string;
  user: string = '';

  constructor(private signInService: SignInService) { }

  ngOnInit() {
    const idC = this.signInService.toUser(localStorage.getItem('user'))._id;
    this.idCreator = idC;
  }

}
