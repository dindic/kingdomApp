import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../datos/class.user';
import { SignInService } from '../../auth/signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  providers: [SignInService],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private signInService: SignInService, private router: Router) { }

  ngOnInit() {
    if (this.signInService.isLoggedIn()) {
      const idc = this.signInService.toUser(localStorage.getItem('user'))._id;
      this.router.navigateByUrl(`/saved`);
    }

    this.signinForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
      ]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required
      ])
    });
  }

  public signIn() {

    this.signInService.signIn(this.signinForm.value.email, this.signinForm.value.password).subscribe(
      res => {
        if (!res || res.headers.get('x-auth') === '') {
          // no acces
        } else {
          // reroute to saved kingdoms
          console.log(res.body._id);
          this.router.navigateByUrl(`/saved`);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}

