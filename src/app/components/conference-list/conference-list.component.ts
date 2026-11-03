import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Conference } from '../../models/conference';
import { BookingService } from '../../services/booking.service';
import { ConferenceService } from '../../services/conference.service';
import { ConferenceDetailComponent } from '../conference-detail/conference-detail.component';

// httpResource charge les conférences; les signaux filtrent et sélectionnent une conférence.
@Component({
  selector: 'app-conference-list', 
  standalone: true, 
  imports: [DatePipe, ConferenceDetailComponent],
  templateUrl: './conference-list.component.html', 
  styleUrl: './conference-list.component.css'
})
export class ConferenceListComponent {
  private readonly conferenceService = inject(ConferenceService);
  private readonly bookings = inject(BookingService);
  private readonly conferenceResource = this.conferenceService.getAllConferences();
  readonly conferences = computed(() => this.conferenceResource.hasValue()
    ? this.conferenceResource.value().filter(c => new Date(c.date).getTime() > Date.now())
    : []);
  private readonly selectedConferenceId = signal<number | null>(null);
  readonly selected = computed(() => this.conferences().find(c => c.id === this.selectedConferenceId()) ?? this.conferences()[0] ?? null);
  readonly selectedId = computed(() => this.selected()?.id ?? null);

  placesLeft(conference: Conference): number {
    return conference.maxParticipants - conference.nbParticipants - this.bookings.bookedFor(conference.id);
  }

  select(conference: Conference): void { this.selectedConferenceId.set(conference.id); }

  updateConference(conference: Conference): void {
    const title = prompt('New conference title', conference.title);
    if (!title?.trim()) return;

    this.conferenceService.updateConference({
      id: conference.id,
      title: title.trim(),
      description: conference.description,
      date: conference.date,
      place: conference.place,
      speaker: conference.speaker,
      maxParticipants: conference.maxParticipants,
      nbParticipants: conference.nbParticipants,
    }).subscribe();
  }

  deleteConference(conference: Conference): void {
    if (confirm(`Delete "${conference.title}"?`)) {
      this.conferenceService.deleteConference(conference.id).subscribe();
    }
  }
}
