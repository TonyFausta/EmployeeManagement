export class Employee {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  basicSalary: number;
  status: string;
  group: string;
  description: string;

  constructor(
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    birthDate: string,
    basicSalary: number,
    status: string,
    group: string,
    description: string
  ) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthDate = birthDate;
    this.basicSalary = basicSalary;
    this.status = status;
    this.group = group;
    this.description = description;
  }
}
