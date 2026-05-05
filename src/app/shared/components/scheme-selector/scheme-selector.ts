import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ColorScheme } from '../../../models/color-scheme.model';

@Component({
  selector: 'shared-scheme-selector',
  imports: [
    ButtonModule
  ],
  templateUrl: './scheme-selector.html',
  styleUrl: './scheme-selector.scss',
})

export class SchemeSelector {
  @Output() schemeChange = new EventEmitter<ColorScheme>();

  selectedScheme: ColorScheme = 'analogous';

  changeScheme(scheme: ColorScheme){
    this.selectedScheme = scheme;
    this.schemeChange.emit(scheme);
  }
}
