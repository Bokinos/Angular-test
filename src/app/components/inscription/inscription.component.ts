import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscription',
  standalone: true,
  template: `Inscription page. Event ID: {{ eventId }}`,
})
export class InscriptionComponent {
  private readonly route = inject(ActivatedRoute);
  readonly eventId = this.route.snapshot.paramMap.get('id');
}
