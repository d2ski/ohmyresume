import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv-edit-form-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-edit-form-education.component.html',
  styleUrl: './cv-edit-form-education.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvEditFormEducationComponent {}
