import { Component } from '@angular/core';
import { ColorPicker } from '../color-picker/color-picker';

@Component({
  selector: 'shared-palette-generator',
  imports: [
    ColorPicker,
  ],
  templateUrl: './palette-generator.html',
  styleUrl: './palette-generator.scss',
})
export class PaletteGenerator {}
