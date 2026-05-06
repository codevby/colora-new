import { Component, inject, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-color-card',
  imports: [
    CardModule,
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './color-card.html',
  styleUrl: './color-card.scss',
})
export class ColorCard {
  @Input({ required: true }) hexColor!: string;
  @Input() colorName?: string;

  private _messegeService = inject(MessageService);

  copy() {
    navigator.clipboard.writeText(this.hexColor);

    this._messegeService.add({
      severity: 'contrast',
      summary: 'Copied',
      detail: `Color copied to clipboard! (${this.hexColor})`
    });
  }
}
