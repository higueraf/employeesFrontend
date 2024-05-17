import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoApiService } from '@app/infraestructure/driven-adapter/empleado-api-service';
import { ProvinciaApiService } from '@app/infraestructure/driven-adapter/provincia-api-service';
import { EmpleadoInterface } from '@app/domain/models/empleado.interface';
import { ProvinciaInterface } from '@app/domain/models/provincia.interface';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrl: './empleado-form.component.scss',
})
export class EmpleadoFormComponent {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private empleadoApiService: EmpleadoApiService,
    private provinciaApiService: ProvinciaApiService,
  ) {}

  modeNew = false;
  activeTab: string = 'personal';
  fotoTemp: any = null;
  empleadoInterface: EmpleadoInterface = {
    id: 0,
    nombres: '',
    apellidos: '',
  };
  saveEnabled: boolean = false;
  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.modeNew = id === 'new';
    if (!this.modeNew && id) {
      this.empleadoApiService
        .getEmpleadoById(id)
        .subscribe((empleadoResponse: any) => {
          const empleado = empleadoResponse.data;
          this.empleadoInterface.id = empleado.id;
          this.empleadoInterface.cedula = empleado.cedula;
          this.empleadoInterface.nombres = empleado.nombres;
          this.empleadoInterface.apellidos = empleado.apellidos;
          this.empleadoInterface.fecha_nacimiento = empleado.fecha_nacimiento;
          this.empleadoInterface.email = empleado.email;
          this.empleadoInterface.id_provincia = empleado.id_provincia;
          this.empleadoInterface.observaciones = empleado.observaciones;
          this.empleadoInterface.foto = empleado.foto;
          this.empleadoInterface.fecha_ingreso = empleado.fecha_ingreso;
          this.empleadoInterface.cargo = empleado.cargo;
          this.empleadoInterface.departamento = empleado.departamento;
          this.empleadoInterface.jornada_parcial = empleado.jornada_parcial ? 'si' : 'no';
          this.empleadoInterface.id_provincia_cargo = empleado.id_provincia_cargo;
          this.empleadoInterface.codigo = empleado.codigo;
          this.empleadoInterface.sueldo = empleado.sueldo;
          this.empleadoInterface.estado = empleado.estado;
          this.empleadoInterface.observaciones_cargo = empleado.observaciones_cargo;
          
        });

    }
    this.provinciaApiService
    .getProvinciasSelect()
    .subscribe((provinciasResponse: any) => {
      this.provincias = provinciasResponse.data;
    });
    
  }
  @Output()
  empleado = new EventEmitter<boolean>();
  provincias: ProvinciaInterface[] = [];

  save() {
    if (this.modeNew) {
      this.empleadoApiService
        .createEmpleado(this.empleadoInterface)
        .subscribe((empleadoResponse: any) => {
          this.empleadoInterface = empleadoResponse.data;
          this.router.navigate(['/empleados']);
        });
    } else {
      this.empleadoApiService
        .updateEmpleado(this.empleadoInterface)
        .subscribe((empleadoResponse: any) => {
          this.empleadoInterface = empleadoResponse.data;
          this.router.navigate(['/empleados']);
        });
    }
  }
  showPersonalDataTab() {
    this.activeTab = 'personal';
  }

  showWorkDataTab() {
    this.activeTab = 'work';
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.empleadoInterface.foto = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoTemp = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  changeProvinciaCargoId(event: any) {
    this.empleadoInterface.id_provincia_cargo = event.target.value;
  }
  changeProvinciaId(event: any) {
    this.empleadoInterface.id_provincia = event.target.value;
  }
  goToReport() {
    this.router.navigate(['/empleados/report']);
  }
  goToEmployees() {
    this.router.navigate(['/empleados']);
  }
}
