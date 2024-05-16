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
          this.empleadoInterface.nombres = empleado.nombres;
          this.empleadoInterface.apellidos = empleado.apellidos;
        });

    }
    this.provinciaApiService
    .getProvinciasSelect()
    .subscribe((provinciasResponse: any) => {
      this.provincias = provinciasResponse.data;
    });
    this.verifyFields();
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
  verifyFields(): void {
    
  const values = Object.values(this.empleadoInterface);

  this.saveEnabled = values.every(value => !!value);
    
    
  }
}
