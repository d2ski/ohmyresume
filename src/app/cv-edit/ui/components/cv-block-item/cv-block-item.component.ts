import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAccordionModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'app-cv-block-item',
  standalone: true,
  imports: [CommonModule, TuiAccordionModule, TuiSvgModule, TuiButtonModule],
  templateUrl: './cv-block-item.component.html',
  styleUrl: './cv-block-item.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvBlockItemComponent {
  @Input() title: string | null = null;
  @Input() subtitle: string | null = null;
  @Output() deleteItem = new EventEmitter<void>();

  onDeleteItem(event: Event) {
    event.stopPropagation();
    this.deleteItem.emit();
  }
}
