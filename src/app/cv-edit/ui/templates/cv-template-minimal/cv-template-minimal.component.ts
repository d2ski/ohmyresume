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
  }
}
