import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaletteGenerator } from '../../shared/components/palette-generator/palette-generator';
import { PaletteGrid } from "../../shared/components/palette-grid/palette-grid";
import { Divider } from "primeng/divider";
import { Tooltip } from "primeng/tooltip";
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-home-page',
  imports: [
    ButtonModule,
    PaletteGenerator,
    PaletteGrid,
    Divider,
    Tooltip,
    SplitButtonModule
],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  currentPalette: string[] = [];
  currentMaterialPalette: string[] = [];

  items: any[] = [];

  constructor() {
    this.items = [
      { label: 'Download', icon: 'pi pi-download', command: () => { console.log('download') } },
      { label: 'Share', icon: 'pi pi-link', command: () => { console.log('share') } },
      { label: 'Delete', icon: 'pi pi-trash', command: () => { console.log('delete') } }
    ]
  }

  onPaletteGenerated(palette: string[]) {
    this.currentPalette = palette;
  }

  onMaterialPaletteGenerated(palette: string[]) {
    this.currentMaterialPalette =  palette;
  }

}
