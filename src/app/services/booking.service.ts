import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly bookings = signal<Record<number, number>>({});
  readonly bookedCount = computed(() => Object.values(this.bookings()).reduce((total, count) => total + count, 0));

  bookedFor(conferenceId: number): number { return this.bookings()[conferenceId] ?? 0; }

  book(conferenceId: number, availablePlaces: number): boolean {
    if (availablePlaces <= 0) return false;
    this.bookings.update(current => ({ ...current, [conferenceId]: (current[conferenceId] ?? 0) + 1 }));
    return true;
  }
}
