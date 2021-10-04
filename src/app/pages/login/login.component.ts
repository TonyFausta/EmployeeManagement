import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showAlert = false;
  submitted = false;

  constructor(public fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onClickedlogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    if (
      this.loginForm.value.username === 'admin' &&
      this.loginForm.value.password === 'admin'
    ) {
      this.router.navigate(['/employee-list-page']);
    } else {
      this.showAlert = true;
    }
  }
}
