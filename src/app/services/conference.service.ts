import { Injectable, computed, signal } from '@angular/core';
import { Conference } from '../models/conference';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 12);
const nextMonth = new Date();
nextMonth.setDate(nextMonth.getDate() + 35);
const later = new Date();
later.setDate(later.getDate() + 62);

@Injectable({ providedIn: 'root' })
export class ConferenceService {
  private readonly conferenceState = signal<Conference[]>([
    { id: 1, title: 'Building Useful AI Agents', description: 'Patterns for reliable, human-centered agent systems.', date: tomorrow.toISOString(), place: 'Tunis · Main stage', speaker: 'Amira Ben Salem', maxParticipants: 120, nbParticipants: 78 },
    { id: 2, title: 'The Future of Angular', description: 'Signals, standalone components, and modern application design.', date: nextMonth.toISOString(), place: 'Tunis · Room Atlas', speaker: 'Youssef Trabelsi', maxParticipants: 80, nbParticipants: 74 },
    { id: 3, title: 'Designing for the Web', description: 'A practical session on accessible and inclusive interfaces.', date: later.toISOString(), place: 'Sousse · Studio 2', speaker: 'Lina Gharbi', maxParticipants: 100, nbParticipants: 100 },
    { id: 4, title: 'Cloud Native Tunisia', description: 'From containers to observable production systems.', date: '2025-05-14T10:00:00', place: 'Tunis · Room Carthage', speaker: 'Karim Mansour', maxParticipants: 90, nbParticipants: 41 }
  ]);

  readonly upcomingConferences = computed(() => this.conferenceState().filter(c => new Date(c.date).getTime() > Date.now()));
  readonly conferences = this.upcomingConferences;

  getById(id: number): Conference | undefined {
    return this.conferenceState().find(conference => conference.id === id);
  }

  addConference(conference: Omit<Conference, 'id' | 'nbParticipants'>): void {
    const id = Math.max(0, ...this.conferenceState().map(item => item.id)) + 1;
    this.conferenceState.update(items => [...items, { ...conference, id, nbParticipants: 0 }]);
  }

}
