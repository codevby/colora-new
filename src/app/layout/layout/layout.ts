import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterModule } from '@angular/router';

import { ThemeService } from './../../services/theme.service';

import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';


@Component({
  selector: 'app-layout',
  imports: [
    DrawerModule,
    ButtonModule,
    DividerModule,
    ImageModule,
    RouterLinkActive,
    RouterLink,
    RouterModule,
],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

  private themeService = inject(ThemeService);

  isDarkMode() {
    return this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

}
