import { Routes } from '@angular/router';
import { EmpresasListComponent } from './pages/empresas-list/empresas-list.component';
import { UsuariosFormComponent } from './pages/usuarios-form/usuarios-form.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { VacantesListComponent } from './pages/vacantes-list/vacantes-list.component';
import { SolicitudesListComponent } from './pages/solicitudes-list/solicitudes-list.component';
import { HomeInicioComponent } from './pages/home-inicio/home-inicio.component';
import { EmpresaFormComponent } from './pages/empresas-form/empresas-form.component';
import { EmpresaDetalleComponent } from './components/empresa-detalle/empresa-detalle.component';
import { EmpresaNuevaComponent } from './components/empresa-nueva/empresa-nueva.component';
import { UsuariosListComponent } from './pages/usuarios-list/usuarios-list.component';
import { CategoriasListComponent } from './pages/categorias-list/categorias-list.component';
import { CategoriasFormComponent } from './pages/categorias-form/categorias-form.component';
import { AltaCategoriaComponent } from './pages/categorias-alta-form/categorias-alta-form.component';
import { SolicitudCardComponent } from './components/solicitud-card/solicitud-card.component';
import { VacantesFormComponent } from './pages/vacante-nueva-form/vacante-nueva-form.component';
import { SolicitudFormComponent } from './pages/solicitud-form/solicitud-form.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeInicioComponent },
  { path: 'admon', component: EmpresasListComponent },
  { path: 'registro', component: UsuariosFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'vacantes/todas', component: VacantesListComponent },
  { path: 'vacantes/nueva', component: VacantesFormComponent },
  { path: 'solicitudes', component: SolicitudesListComponent},
  { path: 'empresas/editar/:id', component: EmpresaFormComponent},
  { path: 'empresa/:id', component: EmpresaDetalleComponent },
  { path: 'empresas/nueva', component: EmpresaNuevaComponent },
  { path: 'usuarios', component: UsuariosListComponent },
  { path: 'categorias/lista', component: CategoriasListComponent },
  { path: 'categorias/editar/:id', component: CategoriasFormComponent },
  { path: 'categorias/nueva', component: AltaCategoriaComponent },
  { path: 'solicitudes/todas', component: SolicitudCardComponent },
  { path: 'solicitudes/nueva', component: SolicitudesListComponent },
  { path: 'solicitudes/nueva/:id', component: SolicitudFormComponent },
  { path: '**', redirectTo: 'home' }
];
