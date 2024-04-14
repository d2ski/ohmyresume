import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-edit.component.html',
  styleUrl: './cv-edit.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CvEditComponent {}
