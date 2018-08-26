import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorFn } from '@angular/forms/src/directives/validators';
import { AbstractControl } from '@angular/forms/src/model';
import { User } from '../../datos/class.user';
import { SignInService } from '../../auth/signin.service';

@Component({
  selector: 'app-signup',
  providers: [SignInService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private signInService: SignInService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*") 
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

  private signUp() {
    const user: User = new User(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password ,'' );
    this.signInService.signUp(user).subscribe();
  }

}
