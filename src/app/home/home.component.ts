import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButtonModule,
  TuiModeModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TuiButtonModule,
    RouterLink,
    TuiModeModule,
    TuiTooltipModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private readonly meta: Meta) {
    this.meta.addTag({
      name: 'description',
      content:
        'Онлайн сервис, который позволяет создавать резюме с помощью шаблонов и сохранять его в формате PDF',
    });
  }
}
