import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="nav" aria-label="Main navigation">
      <div class="links">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Accueil</a>
        <a routerLink="/conferences" routerLinkActive="active">Conference</a>
        <a routerLink="/profile" routerLinkActive="active">Profile</a>
        <a routerLink="/admin" routerLinkActive="active">Admin</a>
      </div>
      <div class="booking"><span class="dot"></span>{{ bookings.bookedCount() }} booked</div>
    </nav>
  `,
  styles: [`
    :host{display:block}.nav{min-height:58px;background:#fff;border-bottom:1px solid #e7eaf0;display:flex;align-items:center;justify-content:space-between;padding:0 max(28px,calc((100% - 1180px)/2));color:#526075;font-size:13px}.links{display:flex;gap:30px;height:58px;align-items:center}.links a{height:100%;display:flex;align-items:center;color:inherit;text-decoration:none;border-bottom:2px solid transparent}.links a.active{color:#15233b;font-weight:700;border-bottom-color:#a4df56}.booking{display:flex;align-items:center;gap:8px;font-weight:650;color:#1b2a40}.dot{width:7px;height:7px;border-radius:50%;background:#a5df57}@media(max-width:500px){.links{gap:14px}.nav{padding:0 16px}.booking{font-size:0}.booking .dot{font-size:9px}}
  `]
})
export class NavbarComponent {
  readonly bookings = inject(BookingService);
}
