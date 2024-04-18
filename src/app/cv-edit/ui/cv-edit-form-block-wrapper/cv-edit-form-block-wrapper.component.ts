import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiSvgModule } from '@taiga-ui/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cv-edit-form-block-wrapper',
  standalone: true,
  imports: [CommonModule, TuiSvgModule, DragDropModule],
  templateUrl: './cv-edit-form-block-wrapper.component.html',
  styleUrl: './cv-edit-form-block-wrapper.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvEditFormBlockWrapperComponent {
  @Input({ required: true }) blockTitle!: string;
}
