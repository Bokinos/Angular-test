import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Conference } from '../../models/conference';
import { BookingService } from '../../services/booking.service';
import { ConferenceService } from '../../services/conference.service';
import { ConferenceDetailComponent } from '../conference-detail/conference-detail.component';

@Component({
  selector: 'app-conference-list', standalone: true, imports: [DatePipe, UpperCasePipe, ConferenceDetailComponent],
  templateUrl: './conference-list.component.html', styleUrl: './conference-list.component.css'
})
export class ConferenceListComponent {
  private readonly conferenceService = inject(ConferenceService);
  private readonly bookings = inject(BookingService);
  readonly conferences = this.conferenceService.upcomingConferences;
  readonly selected = signal<Conference | null>(this.conferences()[0] ?? null);
  readonly selectedId = computed(() => this.selected()?.id ?? null);

  placesLeft(conference: Conference): number {
    return conference.maxParticipants - conference.nbParticipants - this.bookings.bookedFor(conference.id);
  }

  select(conference: Conference): void { this.selected.set(conference); }
}
