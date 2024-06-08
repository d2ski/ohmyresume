import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvTemplateBaseComponent } from '../cv-template-base/cv-template-base.component';
import { TuiFormatPhonePipeModule } from '@taiga-ui/core';

@Component({
  selector: 'app-cv-template-minimal',
  standalone: true,
  imports: [CommonModule, TuiFormatPhonePipeModule],
  templateUrl: './cv-template-minimal.component.html',
  styleUrl: './cv-template-minimal.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CvTemplateMinimalComponent extends CvTemplateBaseComponent {
  constructor() {
    super();
    this.colors = [
      'rgba(203, 213, 225, 1)',
      'rgba(21, 21, 21, 1)',
      'rgba(82, 110, 211, 1)',
    ];
  }
}
