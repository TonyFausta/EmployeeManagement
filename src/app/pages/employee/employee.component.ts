import { Component, OnInit, ViewChild } from '@angular/core';
import { Page } from 'src/app/shared/models/Page';
import { Router } from '@angular/router';
import { EmployeeData } from 'src/app/assets/data';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @ViewChild(DatatableComponent)
  myTable!: DatatableComponent;
  rows: any;
  cache: any = {};

  page = new Page();
  offset = 0;
  tempDataReverse: any;
  search: any;

  constructor(private router: Router, private toast: ToastrService) {
    this.page.pageNumber = 1 + this.offset;
    this.page.size = 5;
    this.page.totalPages = EmployeeData.length;
  }

  ngOnInit(): void {
    //reverse data list id besar ke kecil
    this.tempDataReverse = [...EmployeeData].reverse();
    this.rows = this.tempDataReverse;
    if (localStorage.getItem('searchParam')) {
      const param: any = JSON.parse(
        localStorage.getItem('searchParam') || '{}'
      );
      this.search = param.search;
      const temp = this.tempDataReverse.filter(function(d: any) {
        return (
          d.firstName.toLowerCase().indexOf(param.search) !== -1 ||
          !param.search ||
          d.lastName.toLowerCase().indexOf(param.search) !== -1 ||
          !param.search
        );
      });

      // update the rows
      this.rows = temp;
      localStorage.removeItem('searchParam');
    }
  }

  changePage(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset + 1;
    // this.page.size = pageInfo.pageSize;
    const tempDataReverse = [...EmployeeData].reverse();

    this.rows = tempDataReverse.slice(
      (this.page.pageNumber - 1) * pageInfo.pageSize,
      this.page.pageNumber * pageInfo.pageSize
    );
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    this.search = val;
    const tempDataReverse = [...EmployeeData].reverse();

    // filter our data
    const temp = tempDataReverse.filter(function(d: any) {
      return (
        d.firstName.toLowerCase().indexOf(val) !== -1 ||
        !val ||
        d.lastName.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });

    // update the rows
    this.rows = temp;
    this.page.totalPages = temp.length;
    // Whenever the filter changes, always go back to the first page
    this.myTable.offset = 0;
  }

  changeSelect(event: any) {
    this.page.size = event.target.value;
  }

  goToAddPage() {
    this.router.navigate([`/employee-list-page/add`]);
  }

  goToDetailPage(id: any) {
    const dataSearch = {
      search: this.search
    };
    localStorage.setItem('searchParam', JSON.stringify(dataSearch));
    this.router.navigate([`/employee-list-page/detail/${id}`]);
  }

  goToEditPage(id: any) {
    this.router.navigate([`/employee-list-page/edit/${id}`]);
  }

  goToDeletePage(id: any) {
    //remove data yang dipilih dari total data
    for (let i = 0; i < EmployeeData.length; i++) {
      if (EmployeeData[i].id === id) {
        EmployeeData.splice(i, 1);
      }
    }

    this.toast.success('Delete Data Berhasil');

    const tempDataReverse = [...EmployeeData].reverse();
    this.rows = tempDataReverse;
    this.page.totalPages = EmployeeData.length;
  }
}
