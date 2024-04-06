import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employee: Employee = {
    nic: '',
    description: '',
    name: ''
  };
  submitted = false;

  constructor(private employeeService: EmployeeService){}

  // Angular component (AddEmployeeComponent)
saveEmployee(): void {
  const data = {
    NIC: this.employee.nic,
    description: this.employee.description,
    name: this.employee.name
  };

  console.log(data,'THis is employee data')
  this.employeeService.create(data)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
}


  newEmployee(): void {
    this.submitted = false;
    this.employee = {
      nic: '',
      description: '',
      name: ''
    };
  }
}
