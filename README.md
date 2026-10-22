# ConfTech Prosits

This Angular project brings the five ConfTech exercises together in one small conference-management interface. The UI demonstrates the requested Angular mechanisms; the notes below provide the explanations for a written submission. The assignment documents define the classroom scenarios, while the implementation follows the user's project brief and keeps the examples runnable together.

## Run the app

```bash
npm install
npm start
```

The project currently uses Angular 19 dependencies. Its standalone components support the signal, input, and native control-flow APIs used here. The assignment sheets mention Angular 21; the examples use APIs compatible with this repository's installed Angular version.

## Prosit 1: Components

The root template composes `HeaderComponent`, `NavbarComponent`, `UserProfileComponent`, `FriendsListComponent`, `NotificationsComponent`, `ConferenceListComponent`, and `FooterComponent`. Each standalone component has a focused template and can be composed by selector from another component. This keeps one large page from becoming a single difficult-to-maintain component. Small parts can be reused on other pages, maintained independently, and developed by different teammates.

## Prosit 2: Data binding and signals

`ConferenceDetailComponent` stores the editable title in a signal and renders it with `{{ title() }}`. The input uses `[(ngModel)]` for immediate text-field updates, with `FormsModule` imported by the standalone component; the `ngModelChange` handler writes the new value to the signal. The reserve button uses `(click)="register()"` for event binding and `[disabled]="placesLeft() === 0"` for property binding. `@if` conditionally displays the selected conference and its confirmation message.

The four binding forms serve different directions: interpolation sends component values into text; property binding sets a DOM or component property; event binding sends user actions into component code; two-way binding keeps a form control and a component value synchronized.

## Prosit 3: Control flow and pipes

`Conference` defines the conference data shape. `ConferenceService` exposes upcoming conferences only, filtering out past dates. The list uses `@for (c of conferences(); track c.title)` and `@empty` for the no-results case. The detail formats the speaker and date with `uppercase` and `date` pipes. The class bindings assign green when at least ten places remain, orange when one to nine remain, and red when full. Native control flow makes conditional and repeated template regions explicit; pipes format presentation without mutating the stored data.

## Prosit 4: Component communication

`ConferenceListComponent` owns the selected-conference signal and passes its value to `ConferenceDetailComponent` using `[conference]="selected()"`. The detail declares `conference = input<Conference | null>(null)`, so selecting a row updates the child automatically.

Use `input()` when a parent supplies data to a child. Use `output()` when a child reports an event to its parent, such as a selected ID or a completed action. Use `model()` when the parent and child need a shared two-way value, such as an editable setting. Prefer the simplest direction that matches the data flow.

## Prosit 5: Services and dependency injection

The original design's problems are duplicated filtering, data and booking logic tied to a display component, manual construction with `new ConferenceListComponent()`, unsynchronized navbar and catalog state, brittle unit tests, and a violation of the Single Responsibility Principle.

`ConferenceService` owns the conference data and upcoming-date filtering. `BookingService` owns shared reservation state as a signal and derives `bookedCount` with `computed`. The list and navbar use `inject()` to consume those services. Both services use `providedIn: 'root'`, which gives the application one shared instance of each service. Providing them separately in component-level `providers` would create separate instances and split booking state again. Components handle display and user interaction; services own reusable application data and behavior.

## Implementation map

- `src/app/components/`: page sections, conference list, and conference detail.
- `src/app/models/conference.ts`: conference data type.
- `src/app/services/`: root-scoped conference and booking services.
- `src/app/app.component.html`: composition of the page components.
