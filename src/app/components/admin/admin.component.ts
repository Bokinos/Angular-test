import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `<nav><a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Dashboard</a> | <a routerLink="/admin/conferences" routerLinkActive="active">Conferences</a></nav><router-outlet />`,
})
export class AdminComponent {}
