import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';

import { FormsModule } from '@angular/forms';
import { EmpleadoFormComponent } from './empleado-form/empleado-form.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { AdminModule } from '../../admin.module';



@NgModule({
  declarations: [
    
    
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    FormsModule,
    AdminModule,

  ]
})
export class EmpleadoModule { }
