import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { EmployeeData } from 'src/app/assets/data';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  fg!: FormGroup;
  submitted = false;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  today = dayjs().format('YYYY-MM-DDTHH:mm');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.fg = this.fb.group({
      users: this.fb.array([this.newFormGroup()])
    });
  }

  newFormGroup(): FormGroup {
    return this.fb.group({
      username: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      basicSalary: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      group: [null, [Validators.required]],
      status: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  getUserControls(): AbstractControl[] {
    return (this.fg.controls['users'] as FormArray).controls;
  }

  onClickedSave() {
    this.submitted = true;

    this.getUserControls().forEach(data => {
      if (data.get('birthDate')?.value > this.today) {
        data.get('birthDate')?.setErrors({ moreThanToday: true });
      }
    });

    if (this.fg.invalid) {
      return;
    }

    const stringId = EmployeeData.length + 1;
    const newUser = {
      id: stringId.toString(),
      username: this.fg.value.users[0].username,
      firstName: this.fg.value.users[0].firstName,
      lastName: this.fg.value.users[0].lastName,
      birthDate: this.fg.value.users[0].birthDate,
      email: this.fg.value.users[0].email,
      group: this.fg.value.users[0].group,
      basicSalary: this.fg.value.users[0].basicSalary,
      description: this.fg.value.users[0].description,
      status: this.fg.value.users[0].status
    };
    EmployeeData.push(newUser);

    this.toast.success('Add Data Berhasil');
    this.router.navigate(['/employee-list-page']);
  }

  backToList() {
    this.router.navigate(['employee-list-page']);
  }
}
