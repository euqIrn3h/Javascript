import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  public roles: any;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public singupService: SignupService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      username: [''],
      password: [''],
      role: [null]
    });

    this.getRoles();
  }

  ngOnInit() {
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res) {
        this.signupForm.reset();
        this.router.navigate(['log-in']);
      }
    });
  }

  getRoles(){
    return this.singupService.getRoles().subscribe((res) =>{
      this.roles = res;
    })
  }

}