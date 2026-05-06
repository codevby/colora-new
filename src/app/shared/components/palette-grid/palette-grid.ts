import { Component, Input } from '@angular/core';
import { ColorCard } from '../color-card/color-card';

@Component({
  selector: 'shared-palette-grid',
  imports: [ ColorCard ],
  templateUrl: './palette-grid.html',
  styleUrl: './palette-grid.scss',
})
export class PaletteGrid {

  @Input({ required: true }) colors!: any[];

}
