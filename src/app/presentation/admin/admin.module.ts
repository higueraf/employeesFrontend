import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LogInAdminComponent } from './pages/log-in-admin/log-in-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RowActionsComponent } from './common/row-actions/row-actions.component';
import { RegisterComponent } from './pages/register/register.component';
import { EmpleadoFormComponent } from './pages/empleado/empleado-form/empleado-form.component';
import { EmpleadoListComponent } from './pages/empleado/empleado-list/empleado-list.component';

@NgModule({
  declarations: [
    AdminComponent,
    LogInAdminComponent,
    RegisterComponent,
    DashboardComponent,
    RowActionsComponent,
    EmpleadoFormComponent,
    EmpleadoListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AdminRoutingModule,
  ],
  exports: [RowActionsComponent]
})
export class AdminModule {}
