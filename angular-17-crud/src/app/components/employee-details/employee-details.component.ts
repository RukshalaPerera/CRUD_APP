import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from './../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './../../../app/models/employee.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentEmployee: Employee = {
    nic: '',
    description: '',
    name: ''
  };
  
  message = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getEmployee(this.route.snapshot.params["id"]);
    }
  }

  getEmployee(id: string): void {
    this.employeeService.get(id)
      .subscribe({
        next: (data) => {
          this.currentEmployee = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateName(status: String): void {
    const data = {
      title: this.currentEmployee.nic,
      description: this.currentEmployee.description,
      name: status
    };

    this.message = '';

    this.employeeService.update(this.currentEmployee.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentEmployee.name = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateEmployee(): void {
    this.message = '';

    this.employeeService.update(this.currentEmployee.id, this.currentEmployee)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This employee was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteEmployee(): void {
    this.employeeService.delete(this.currentEmployee.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/employees']);
        },
        error: (e) => console.error(e)
      });
  }

}