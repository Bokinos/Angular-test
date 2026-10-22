import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Conference } from '../../models/conference';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conference-detail', standalone: true, imports: [FormsModule, DatePipe, UpperCasePipe],
  templateUrl: './conference-detail.component.html', styleUrl: './conference-detail.component.css'
})
export class ConferenceDetailComponent {
  readonly conference = input<Conference | null>(null);
  readonly title = signal('');
  titleDraft = '';
  readonly message = signal('');
  private readonly bookings = inject(BookingService);
  private readonly router = inject(Router);
  readonly placesLeft = computed(() => {
    const conference = this.conference();
    return conference ? conference.maxParticipants - conference.nbParticipants - this.bookings.bookedFor(conference.id) : 0;
  });

  constructor() {
    effect(() => {
      const conference = this.conference();
      this.titleDraft = conference?.title ?? '';
      this.title.set(this.titleDraft);
      this.message.set('');
    });
  }

  register(): void {
    const conference = this.conference();
    if (!conference) return;
    if (this.placesLeft() > 0) {
      void this.router.navigate(['/inscription', conference.id]);
    }
  }
}
