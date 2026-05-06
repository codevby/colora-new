import { Component, EventEmitter, inject, Output } from '@angular/core';

import { DividerModule } from 'primeng/divider';

import { ColorPicker } from '../color-picker/color-picker';
import { SchemeSelector } from '../scheme-selector/scheme-selector';
import { ColorScheme } from '../../../models/color-scheme.model';
import { ColorService } from '../../../services/color.service';
import { ButtonModule } from 'primeng/button';
import { PaletteOptions } from "../palette-options/palette-options";


@Component({
  selector: 'shared-palette-generator',
  imports: [
    ColorPicker,
    SchemeSelector,
    DividerModule,
    ButtonModule,
    PaletteOptions
],
  templateUrl: './palette-generator.html',
  styleUrl: './palette-generator.scss',
})
export class PaletteGenerator {
  @Output() paletteGenerated = new EventEmitter<string[]>();
  @Output() MaterialPaletteGenerated = new EventEmitter<string[]>();

  selectedColor: string = '#000000';
  selectedScheme: ColorScheme = 'analogous';
  variation: number = 0.2;

  private colorService = inject(ColorService);

  onColorChange(color: string) {
    this.selectedColor = color;
  }

  onSchemeChange(scheme: ColorScheme) {
    this.selectedScheme = scheme;
  }

  onVariationChange(variation: number){
    this.variation = variation;
  }

  onGeneratePalette() {
    console.log(`Generating palette with ${this.selectedColor} and ${this.selectedScheme}`);
    this.generatePalette();
    this.generateMaterialPalette();
  }

  onClearOptions(){
    this.selectedColor = '#000000';
    this.selectedScheme = 'analogous';
  }

  generatePalette() {
    const palette = this.colorService.generateScheme(
      this.selectedColor,
      this.selectedScheme,
      this.variation
    );

    console.log('Palette:', palette);
    this.paletteGenerated.emit(palette);
  }

  generateMaterialPalette() {
    const palette = this.colorService.generateMaterialPalette(this.selectedColor);

    const paletteStringArray = this.convertMaterialPaletteToHexStringArray(palette);

    console.log('Material Palette:', paletteStringArray);
    this.MaterialPaletteGenerated.emit(paletteStringArray);
  }

  convertMaterialPaletteToHexStringArray(materialPalette: any[] = []): string[]{

    return Object.values(materialPalette) as string[];

  }
}
