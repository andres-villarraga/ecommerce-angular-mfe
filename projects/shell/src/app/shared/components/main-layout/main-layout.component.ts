import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [HeaderComponent, RouterOutlet],
  selector: 'app-main-layout',
  styleUrl: './main-layout.component.scss',
  templateUrl: 'main-layout.component.html',
  standalone: true
})
export class MainLayoutComponent {}
