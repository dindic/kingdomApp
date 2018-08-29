import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorFn } from '@angular/forms/src/directives/validators';
import { AbstractControl } from '@angular/forms/src/model';
import { User } from '../../datos/class.user';
import { SignInService } from '../../auth/signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  providers: [SignInService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private signInService: SignInService, private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
      ]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required
      ]),
      rePassword: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
      ]),
    });
  }

  public signUp() {
    const user: User = new User(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password , '' );
    this.signInService.signUp(user).subscribe(
      res => {
        if (!res || res.headers.get('x-auth') === '') {
          console.log('no auth');
        } else {
          console.log('theres auth');
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
