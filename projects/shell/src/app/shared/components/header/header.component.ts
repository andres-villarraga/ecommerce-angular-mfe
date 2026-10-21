import { NavigationEnd, Router } from '@angular/router';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ButtonComponent, InputSearchComponent, IconComponent } from '@shell/shared-ui';
import { filter, startWith } from 'rxjs';

@Component({
  imports: [ButtonComponent, InputSearchComponent, IconComponent],
  selector: 'ecom-header',
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent {
  private router = inject(Router);

  private navEnd = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(new NavigationEnd(0, this.router.url, this.router.url)),
    ),
    { initialValue: null },
  );
  readonly activeTab = computed<string>(() => {
    const event = this.navEnd();

    if (!event) return '';

    return event.url.split('/')[1];
  });

  tabs = [
    {
      id: 1,
      name: 'Shop',
      location: '/shop',
    },
    {
      id: 2,
      name: 'Cart',
      location: '/cart',
    },
    {
      id: 3,
      name: 'Checkout',
      location: '/checkout',
    },
  ];

  redirectTo(route: string): void {
    this.router.navigate([route]);
  }
}
