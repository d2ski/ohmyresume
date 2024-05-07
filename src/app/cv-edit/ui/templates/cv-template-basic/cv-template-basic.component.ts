import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resume } from '../../../data-access/models/resume/resume.interface';

@Component({
  selector: 'app-cv-template-basic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-template-basic.component.html',
  styleUrl: './cv-template-basic.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvTemplateBasicComponent {
  @Input({ required: true }) cv!: Resume;

  _range = [...Array(25).keys()];
}
