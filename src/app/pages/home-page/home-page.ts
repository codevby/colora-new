import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaletteGenerator } from '../../shared/components/palette-generator/palette-generator';
import { PaletteGrid } from "../../shared/components/palette-grid/palette-grid";
import { Divider } from "primeng/divider";
import { Tooltip } from "primeng/tooltip";

@Component({
  selector: 'app-home-page',
  imports: [
    ButtonModule,
    PaletteGenerator,
    PaletteGrid,
    Divider,
    Tooltip
],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  currentPalette: string[] = [];
  currentMaterialPalette: string[] = [];

  onPaletteGenerated(palette: string[]) {
    this.currentPalette = palette;
  }

  onMaterialPaletteGenerated(palette: string[]) {
    this.currentMaterialPalette =  palette;
  }

}
