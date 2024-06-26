import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LogInAdminComponent } from './pages/log-in-admin/log-in-admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmpleadoListComponent } from './pages/empleado/empleado-list/empleado-list.component';
import { EmpleadoFormComponent } from './pages/empleado/empleado-form/empleado-form.component';
import { EmpleadoReportComponent } from './pages/empleado/empleado-report/empleado-report.component';


const routes: Routes = [  
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path:'login', component: LogInAdminComponent },
  { path:'', component: AdminComponent,
    children: [
      { path:'dashboard', component: DashboardComponent},
      { path:'empleados', component: EmpleadoListComponent },
      { path:'empleados/report', component: EmpleadoReportComponent },
      { path:'empleados/:id', component: EmpleadoFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
