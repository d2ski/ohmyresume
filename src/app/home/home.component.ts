import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButtonModule,
  TuiModeModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import { RouterLink } from '@angular/router';

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
export class HomeComponent {}
