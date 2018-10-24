import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

export const routes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'index', component: DefaultComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-edit', component: EditUserComponent },
  { path: '**', component: DefaultComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
