import { Component, input } from '@angular/core';

@Component({
  selector: 'shell-remote-error',
  standalone: true,
  templateUrl: './remote-error.component.html',
  styleUrl: './remote-error.component.scss',
})
export class RemoteErrorComponent {
  remoteName = input<string>('Remote');

  retry(): void {
    window.location.reload();
  }
}
