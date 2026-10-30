import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ConferenceListComponent } from './components/conference-list/conference-list.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { InscriptionComponent } from './components/inscription/inscription.component';

@Component({
  standalone: true,
  imports: [UserProfileComponent, FriendsListComponent, NotificationsComponent, ConferenceListComponent],
  template: `<main class="layout"><aside class="sidebar"><app-user-profile /><app-friends-list /><app-notifications /></aside><app-conference-list /></main>`,
  styles: [`.layout{width:min(1180px,calc(100% - 40px));margin:30px auto 64px;display:grid;grid-template-columns:260px minmax(0,1fr);gap:30px;align-items:start}.sidebar{display:grid;gap:16px}@media(max-width:760px){.layout{grid-template-columns:1fr}}`]
})
class ConferencesPageComponent {}

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'conferences' },
  { path: 'conferences', component: ConferencesPageComponent },
  { path: 'events', loadComponent: () => import('./components/events/events.component').then(m => m.EventsComponent) },
  { path: 'profile', component: UserProfileComponent },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.routes').then(m => m.routes) },
  { path: 'inscription/:id', component: InscriptionComponent },
  { path: '**', redirectTo: 'conferences' },
];
