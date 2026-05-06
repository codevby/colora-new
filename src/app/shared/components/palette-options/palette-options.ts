import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-palette-options',
  imports: [
    CommonModule,
    SliderModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './palette-options.html',
  styleUrl: './palette-options.scss',
})
export class PaletteOptions {

  @Output() variationChange = new EventEmitter<number>();

  variation: number = 0.2;

  onVariationChange() {
    this.variationChange.emit(this.variation);
  }

  get variationLabel(): string {
    if (this.variation < 0.2) return 'Subtle';
    if (this.variation < 0.5) return 'Balanced';
    if (this.variation < 0.8) return 'Creative';
    return 'Experimental';
  }
}
