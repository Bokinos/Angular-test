import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppEvent } from '../models/event';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly http = inject(HttpClient);
  private readonly eventsUrl = 'http://localhost:3000/events';

  getEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(this.eventsUrl);
  }
}
