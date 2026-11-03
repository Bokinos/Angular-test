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
  private service = inject(ConferenceService);
  successMessage = '';
  form = { title: '', description: '', date: '', place: '', speaker: '', maxParticipants: 1 };

  createConference(f: NgForm): void {
    if (f.invalid) return;

    this.service.addConference({
      id: 0,
      title: this.form.title,
      description: this.form.description,
      date: this.form.date,
      place: this.form.place,
      speaker: this.form.speaker,
      maxParticipants: this.form.maxParticipants,
      nbParticipants: 0,
    }).subscribe({
      next: () => {
        this.successMessage = 'La conférence a été créée.';
        f.resetForm();
      },
      error: () => this.successMessage = 'Erreur lors de la création.'
    });
  }
}
