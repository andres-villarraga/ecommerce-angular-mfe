import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  imports: [IconComponent],
  selector: 'ecomInputSearch',
  styleUrl: './input-search.component.css',
  templateUrl: './input-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InputSearchComponent {
  placeholder = input<string>('');
}
