import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { GetListInterface } from '@app/domain/models/get-list.interface';
import { EmpleadoInterface } from '@app/domain/models/empleado.interface';
import { EmpleadoApiService } from '@app/infraestructure/driven-adapter/empleado-api-service';

@Component({
  selector: 'app-empleado-report',
  templateUrl: './empleado-report.component.html',
  styleUrls: ['./empleado-report.component.scss'],
})
export class EmpleadoReportComponent {
  getListInterface: GetListInterface = {
    NumPage: 1,
    NumRecordsPage: 10,
    Order: 'desc',
    Sort: 'apellidos',
    NumFilter: 0,
    AllRegisters: true,
  };

  totalRecords = 0;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  empleadosList: EmpleadoInterface[] = [];

  constructor(
    private router: Router,
    private empleadoApiService: EmpleadoApiService
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }
  onSearch() {
    this.getListInterface.NumFilter = 1;
    this.getEmpleados();
  }

  goToEmployees() {
    this.router.navigate(['/empleados']);
  }

  updateEmpleado(id: any) {
    this.router.navigate(['/empleados/' + id]);
  }

  deleteEmpleado(empleado: any) {
    this.empleadoApiService
      .deleteEmpleado(empleado.id)
      .subscribe(() => {
        this.getEmpleados();
      });
  }

  onPageChange(page: any) {
    this.getListInterface.NumPage = page;
    this.totalPagesArray = [];
    this.getEmpleados();
  }
  
  calculatePages() {
    for (let i = 1; i <= this.totalPages; i++) {
      this.totalPagesArray.push(i);
    }
  }

  private getEmpleados() {
    this.empleadoApiService
      .getEmpleados(this.getListInterface)
      .subscribe((empleadoResponse: any) => {
        this.empleadosList = empleadoResponse.data;
        this.calculatePages();
      });
  }

  orderBy(sort: any) {
    if (this.getListInterface.Order == 'desc'){
      this.getListInterface.Order = 'asc';
    } else {
      this.getListInterface.Order = 'desc';
    }
    this.getListInterface.Sort = sort;
    this.totalPagesArray = [];
    this.getEmpleados();
  }
}
