import { Routes } from '@angular/router';
import { Layout } from './layout/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites-page/favorites-page').then(m => m.FavoritesPage)
      },
      {
        path: 'my-palettes',
        loadComponent: () => import('./pages/my-palettes-page/my-palettes-page').then(m => m.MyPalettesPage)
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about-page/about-page').then(m => m.AboutPage)
      }
    ]
  }
];
