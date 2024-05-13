import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvTemplateBaseComponent } from '../cv-template-base/cv-template-base.component';

@Component({
  selector: 'app-cv-template-minimal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-template-minimal.component.html',
  styleUrl: './cv-template-minimal.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvTemplateMinimalComponent extends CvTemplateBaseComponent {
  constructor() {
    super();
  }
}
