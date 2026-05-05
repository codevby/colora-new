import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { ColorMode } from '../../../models/color-mode.model';

import { ColorService } from '../../../services/color.service';

import { ColorPickerModule } from 'primeng/colorpicker'
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'shared-color-picker',
  imports: [
    FormsModule,
    ColorPickerModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
  ],
  templateUrl: './color-picker.html',
  styleUrl: './color-picker.scss',
})
export class ColorPicker {
  @ViewChild('colorInput') colorInput!: ElementRef<HTMLInputElement>;
  @Output() colorChange = new EventEmitter<string>();

  colorMode: ColorMode = 'hex';

  //LOCAL UI STATE
  h = 0; s = 0; l = 0;
  hex = '#000000';
  rgb = { r: 0, g: 0, b: 0 };

  private messageService = inject(MessageService);
  private colorService = inject(ColorService);

  public isValidHex = this.colorService.isValidHex;


  updateFromHSL() {
    this.hex = this.colorService.hslToHex(this.h, this.s * 100, this.l * 100);
    this.rgb = this.colorService.hslToRgb(this.h, this.s * 100, this.l * 100);
    this.colorChange.emit(this.hex);
  }

  onHexChange() {
    if (!this.colorService.isValidHex(this.hex)) return;
    this.hex = this.colorService.ensureHash(this.hex);

    const { h, s, l } = this.colorService.hexToHsl(this.hex);
    this.h = h;
    this.s = s / 100;
    this.l = l / 100;
    this.rgb = this.colorService.hslToRgb(h, s, l);

    this.colorChange.emit(this.hex);
  }

  onRgbChange() {
    this.rgb.r = this.colorService.clamp(this.rgb.r, 0, 255);
    this.rgb.g = this.colorService.clamp(this.rgb.g, 0, 255);
    this.rgb.b = this.colorService.clamp(this.rgb.b, 0, 255);

    const { h, s, l } = this.colorService.rgbToHsl(this.rgb.r, this.rgb.g, this.rgb.b);
    this.h = h;
    this.s = s / 100;
    this.l = l / 100;
    this.hex = this.colorService.hslToHex(h, s, l);

    this.colorChange.emit(this.hex);
  }

  onHslChange() {
    this.h = this.colorService.clamp(this.h, 0, 360);
    this.s = this.colorService.clamp(this.s, 0, 1);
    this.l = this.colorService.clamp(this.l, 0, 1);
    this.updateFromHSL();
  }

  onSLChange({ s, l }: { s: number; l: number }) {
    this.s = s;
    this.l = l;
    this.updateFromHSL();
  }

  openColorPicker(event: MouseEvent) {
    if ((event.target as HTMLElement).tagName !== 'INPUT') {
      this.colorInput.nativeElement.click();
    }
  }

  copy(){
    navigator.clipboard.writeText(this.hex);

    this.messageService.add({
      severity: 'contrast',
      summary: 'Copied',
      detail: `Color copied to clipboard! (${this.hex})`,
      life: 3000
    });

  }

}
