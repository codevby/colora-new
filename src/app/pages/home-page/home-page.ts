import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaletteGenerator } from '../../shared/components/palette-generator/palette-generator';

@Component({
  selector: 'app-home-page',
  imports: [
    ButtonModule,
    PaletteGenerator,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  onColorChange(hex: string) {
    console.log(hex);
  }
}
