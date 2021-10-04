import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { AddComponent } from './add/add.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  }
];

@NgModule({
  declarations: [EmployeeComponent, DetailComponent, AddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule
  ]
})
export class EmployeeModule {}