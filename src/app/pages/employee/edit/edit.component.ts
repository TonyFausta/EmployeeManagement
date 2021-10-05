import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeData } from 'src/app/assets/data';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  fg!: FormGroup;
  submitted = false;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  today = dayjs().format('YYYY-MM-DDTHH:mm');
  id: any;
  data: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });

    this.data = EmployeeData.find(o => o.id === this.id);
  }

  ngOnInit(): void {
    this.initForm();
    this.getDataForm(this.data);
  }

  initForm() {
    this.fg = this.fb.group({
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

  getDataForm(data: any) {
    const birthDate = dayjs(data.birthDate).format('YYYY-MM-DDTHH:mm');
    const description = dayjs(data.description).format('YYYY-MM-DDTHH:mm');

    this.fg.patchValue({
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      basicSalary: data.basicSalary,
      birthDate: birthDate,
      group: data.group,
      status: data.status,
      description: description
    });
  }

  get f() {
    return this.fg.controls;
  }

  onClickedSave() {
    this.submitted = true;

    if (this.fg.controls.birthDate.value > this.today) {
      this.fg.controls.birthDate.setErrors({ moreThanToday: true });
    }

    if (this.fg.invalid) {
      return;
    }

    const newUser = {
      id: this.data.id,
      username: this.fg.value.username,
      firstName: this.fg.value.firstName,
      lastName: this.fg.value.lastName,
      birthDate: this.fg.value.birthDate,
      email: this.fg.value.email,
      group: this.fg.value.group,
      basicSalary: this.fg.value.basicSalary,
      description: this.fg.value.description,
      status: this.fg.value.status
    };

    //timpah data dengan data baru susuai indeny
    EmployeeData[this.data.id - 1] = newUser;

    this.toast.success('Edit Data Berhasil');
    this.router.navigate(['/employee-list-page']);
  }

  backToList() {
    this.router.navigate(['employee-list-page']);
  }
}
