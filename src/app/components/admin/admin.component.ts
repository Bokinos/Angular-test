import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <nav class="admin-nav" aria-label="Administration navigation">
      <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Dashboard</a>
      <a routerLink="/admin/conferences" routerLinkActive="active">Conferences</a>
    </nav>
    <router-outlet />
  `,
  styles: [`:host{display:block}.admin-nav{min-height:48px;padding:0 max(28px,calc((100% - 1180px)/2));display:flex;align-items:stretch;gap:26px;background:#f6f8f3;border-bottom:1px solid #e5e9df}.admin-nav a{display:flex;align-items:center;color:#526075;text-decoration:none;font-size:13px;border-bottom:2px solid transparent}.admin-nav a.active{color:#263b19;font-weight:700;border-bottom-color:#a4df56}@media(max-width:500px){.admin-nav{padding:0 16px;gap:18px}}`]
})
export class AdminComponent {}
