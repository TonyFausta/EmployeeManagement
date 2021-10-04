import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeData } from 'src/app/assets/data';
import { Page } from '../models/Page';
import { PagedData } from '../models/pagedData';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // public getResults(page: Page): Observable<PagedData<Employee>> {
  //   return Observable.of(EmployeeData).map(() => this.getPagedData(page));
  // }
  /**
   * Package companyData into a PagedData object based on the selected Page
   * @param page The page data used to get the selected data from companyData
   * @returns {PagedData<Employee>} An array of the selected data and page
   */
  // public getPagedData(page: Page): PagedData<Employee> {
  //   let pagedData = new PagedData<Employee>();
  //   page.totalElements = EmployeeData.length;
  //   page.totalPages = page.totalElements / page.size;
  //   let start = page.pageNumber * page.size;
  //   let end = Math.min(start + page.size, page.totalElements);
  //   for (let i = start; i < end; i++) {
  //     let jsonObj = EmployeeData[i];
  //     let employee = new Employee(
  //       jsonObj.userName,
  //       jsonObj.firstName,
  //       jsonObj.lastName,
  //       jsonObj.email,
  //       jsonObj.birthDate,
  //       jsonObj.basicSalary,
  //       jsonObj.status,
  //       jsonObj.group,
  //       jsonObj.description
  //     );
  //     pagedData.data.push(employee);
  //   }
  //   pagedData.page = page;
  //   return pagedData;
  // }
  // names = [
  //   'Maia',
  //   'Asher',
  //   'Olivia',
  //   'Atticus',
  //   'Amelia',
  //   'Jack',
  //   'Charlotte',
  //   'Theodore',
  //   'Isla',
  //   'Oliver',
  //   'Isabella',
  //   'Jasper',
  //   'Cora',
  //   'Levi',
  //   'Violet',
  //   'Arthur',
  //   'Mia',
  //   'Thomas',
  //   'Elizabeth'
  // ];
  // createNewUser(id: number) {
  //   const firstName = this.names[
  //     Math.round(Math.random() * (this.names.length - 1))
  //   ];
  //   const lastName = this.names[
  //     Math.round(Math.random() * (this.names.length - 1))
  //   ].charAt(0);
  //   const email = name + '@gmail.com';
  //   const birthDate = '2020-06-12T16:59:59.000Z';
  //   const basicSalary = 12000000;
  //   const status = 'single';
  //   const group = 'IT';
  //   const description = '2020-06-12T16:59:59.000Z';
  //   return {
  //     id: id.toString(),
  //     name: firstName + lastName,
  //     firstName: firstName,
  //     lastName: lastName,
  //     email: email,
  //     birthDate: birthDate,
  //     basicSalary: basicSalary,
  //     status: status,
  //     group: group,
  //     description: description
  //   };
  // }
}
