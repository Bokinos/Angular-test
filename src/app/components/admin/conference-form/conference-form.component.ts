import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ConferenceService } from '../../../services/conference.service';

@Component({
  selector: 'app-conference-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './conference-form.component.html',
})
export class ConferenceFormComponent {
  private readonly conferenceService = inject(ConferenceService);

  form = {
    title: '',
    description: '',
    date: '',
    place: '',
    speaker: '',
    maxParticipants: 1,
  };
  successMessage = '';

  createConference(conferenceForm: NgForm): void {
    if (conferenceForm.invalid) return;

    this.conferenceService.addConference({
      title: this.form.title.trim(),
      description: this.form.description.trim(),
      date: new Date(this.form.date).toISOString(),
      place: this.form.place.trim(),
      speaker: this.form.speaker.trim(),
      maxParticipants: Number(this.form.maxParticipants),
    });

    this.successMessage = 'La conférence a été créée.';
    conferenceForm.resetForm({ ...this.form, title: '', description: '', date: '', place: '', speaker: '', maxParticipants: 1 });
  }
}
