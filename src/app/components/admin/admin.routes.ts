import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { AdminComponent } from './admin.component';

@Component({ standalone: true, template: '' })
class EmptyAdminPageComponent {}

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', pathMatch: 'full', component: EmptyAdminPageComponent },
      { path: 'conferences', component: EmptyAdminPageComponent },
    ],
  },
];
