import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoInterface } from '@app/domain/models/empleado.interface';
import { GetListInterface } from '@app/domain/models/get-list.interface';
import { enviroment } from '@app/infraestructure/enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoApiService {

  private BASE_URL: string = enviroment.API;

  constructor( private http: HttpClient) {}

  getEmpleados(getListInterface: GetListInterface): Observable<EmpleadoInterface>{
    return this.http.post<EmpleadoInterface>(this.BASE_URL+"/empleados/list", getListInterface);
  }
  getEmpleadosSelect(): Observable<EmpleadoInterface>{
    return this.http.get<EmpleadoInterface>(this.BASE_URL+"/empleados/select");
  }
  getEmpleadoById(empleadoId: string): Observable<EmpleadoInterface>{
    return this.http.get<EmpleadoInterface>(this.BASE_URL+"/empleado/"+empleadoId);
  }
  createEmpleado(empleadoInterface: EmpleadoInterface): Observable<EmpleadoInterface>{
    const headers = new HttpHeaders();
    const formData = this.createFormData(empleadoInterface)
    return this.http.post<EmpleadoInterface>(this.BASE_URL+"/empleados/create", formData, { headers: headers } );
  }
  updateEmpleado(empleadoInterface: EmpleadoInterface): Observable<EmpleadoInterface>{
    const formData = this.createFormData(empleadoInterface)
    return this.http.put<EmpleadoInterface>(this.BASE_URL+"/empleados/update/"+empleadoInterface.id, formData);
  }
  deleteEmpleado(empleadoId: string): Observable<EmpleadoInterface>{
    return this.http.delete<EmpleadoInterface>(this.BASE_URL+"/empleados/delete/"+empleadoId);
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
createFormData (empleadoInterface: EmpleadoInterface): any{
    const formData = new FormData();
    const fechaNacimiento = new Date(empleadoInterface.fecha_nacimiento!);
    const fechaIngreso = new Date(empleadoInterface.fecha_ingreso!);
    const fechaNacimientoFormatted = this.formatDate(fechaNacimiento);
    const fechaIngresoFormatted = this.formatDate(fechaIngreso);
    formData.append('foto', empleadoInterface.foto!);
    formData.append('cedula', empleadoInterface.nombres!);
    formData.append('nombres', empleadoInterface.nombres!);
    formData.append('apellidos', empleadoInterface.apellidos!);
    formData.append('fecha_nacimiento', fechaNacimientoFormatted);
    formData.append('id_provincia', empleadoInterface.id_provincia!.toString());
    formData.append('email', empleadoInterface.email!);
    formData.append('observaciones', empleadoInterface.observaciones!);
    formData.append('fecha_ingreso', fechaIngresoFormatted);
    formData.append('cargo', empleadoInterface.cargo!);
    formData.append('departamento', empleadoInterface.departamento!);
    formData.append('jornada_parcial', empleadoInterface.jornada_parcial ? '1' : '0');
    formData.append('id_provincia_cargo', empleadoInterface.id_provincia_cargo!.toString());
    formData.append('codigo', empleadoInterface.codigo!);
    formData.append('sueldo', empleadoInterface.sueldo!.toString());
    formData.append('estado', empleadoInterface.estado? '1' : '0');
    formData.append('observaciones_cargo', empleadoInterface.observaciones_cargo!);
}


}
