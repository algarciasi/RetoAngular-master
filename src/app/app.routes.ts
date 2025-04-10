import { Routes } from '@angular/router';
import { EmpresasListComponent } from './pages/empresas-list/empresas-list.component';
import { UsuariosFormComponent } from './pages/usuarios-form/usuarios-form.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { VacantesListComponent } from './pages/vacantes-list/vacantes-list.component';
import { SolicitudesListComponent } from './pages/solicitudes-list/solicitudes-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: EmpresasListComponent },
  { path: 'registro', component: UsuariosFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'vacantes', component: VacantesListComponent },
  { path: 'solicitudes', component: SolicitudesListComponent},
  { path: '**', redirectTo: 'home' }
];
