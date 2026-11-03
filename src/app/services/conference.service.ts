import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conference } from '../models/conference';

@Injectable({ providedIn: 'root' })
export class ConferenceService {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/conferences';
  readonly conferencesResource = httpResource<Conference[]>(this.url, { defaultValue: [] });

  getAllConferences() {
    return this.conferencesResource;
  }

  addConference(c: Conference): Observable<Conference> {
    return this.http.post<Conference>(this.url, c);
  }

  updateConference(c: Conference): Observable<Conference> {
  return this.http.put<Conference>(`${this.url}/${c.id}`, c);
}

  deleteConference(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
