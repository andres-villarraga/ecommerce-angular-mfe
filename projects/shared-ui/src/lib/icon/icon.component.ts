import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { IconName, ICONS } from '../../types/icon.types';

@Component({
  imports: [],
  selector: 'ecom-icon',
  styleUrl: './icon.component.css',
  templateUrl: './icon.component.html',
  standalone: true,
})
export class IconComponent {
  private sanitizer = inject(DomSanitizer);

  name = input.required<IconName>();
  size = input<number>(24);
  strokeWidth = input<number>(2);

  protected markup = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name()]),
  )

}
