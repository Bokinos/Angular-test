import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
	{
		path: 'dashboard',
		loadComponent: () =>
			import('./dashboard/dashboard.component').then(
				(module) => module.DashboardComponent,
			),
	},
	{
		path: 'conference-form',
		loadComponent: () =>
			import('./conference/conference-form/conference-form.component').then(
				(module) => module.ConferenceFormComponent,
			),
	},
];
