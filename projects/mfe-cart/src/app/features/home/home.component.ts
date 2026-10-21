import { Component, signal } from '@angular/core';
import { ButtonComponent } from "@shell/shared-ui";


@Component({
  imports: [ButtonComponent],
  standalone: true,
  selector: 'app-home.component',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {
}
