import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { GetListInterface } from '@app/domain/models/get-list.interface';
import { EmpleadoInterface } from '@app/domain/models/empleado.interface';
import { EmpleadoApiService } from '@app/infraestructure/driven-adapter/empleado-api-service';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.scss'],
})
export class EmpleadoListComponent {
  getListInterface: GetListInterface = {
    NumPage: 1,
    NumRecordsPage: 10,
    Order: 'desc',
    Sort: 'id',
    NumFilter: 0,
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

  createEmpleado() {
    this.router.navigate(['/empleados/new']);
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
  buscar() {
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
        this.empleadosList = empleadoResponse.data.data;
        this.totalRecords = empleadoResponse.data.total;
        this.totalPages = empleadoResponse.data.last_page;
        this.calculatePages();
      });
  }
}
