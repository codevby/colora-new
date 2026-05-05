import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal<boolean>(false);

  constructor() {
    const savedTheme = localStorage.getItem('theme');

    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialValue = savedTheme === 'dark' ? true : false;

    effect( () => {
      const dark = this.isDarkMode()
      const element = document.querySelector('html');

      if (dark) {
        element?.classList.add('p-dark');
      }
      else {
        element?.classList.remove('p-dark');
      }

      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }

  toggleTheme() {
    this.isDarkMode.update((dark) => !dark);
  }

}
