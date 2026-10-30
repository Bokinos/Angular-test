import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './events.component.html',
})
export class EventsComponent {
  private readonly eventService = inject(EventService);
  readonly errorMessage = signal('');
  readonly events$ = this.eventService.getEvents().pipe(
    catchError(() => {
      this.errorMessage.set('Impossible de charger les événements. Vérifiez que le serveur JSON est démarré sur le port 3000.');
      return of([]);
    }),
  );
}
