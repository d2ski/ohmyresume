import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv-edit-form-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-edit-form-experience.component.html',
  styleUrl: './cv-edit-form-experience.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvEditFormExperienceComponent {}
