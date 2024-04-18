import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-add-cv-block-item-button',
  standalone: true,
  imports: [CommonModule, TuiButtonModule],
  templateUrl: './add-cv-block-item-button.component.html',
  styleUrl: './add-cv-block-item-button.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AddCvBlockItemButtonComponent {
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
