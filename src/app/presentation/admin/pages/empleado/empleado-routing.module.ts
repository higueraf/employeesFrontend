import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpleadoFormComponent } from './empleado-form/empleado-form.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';


const routes: Routes = [
  { path:'', component: EmpleadoListComponent },
  { path:':id', component: EmpleadoFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
