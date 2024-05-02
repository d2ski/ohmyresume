import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageControlComponent } from '../image-control/image-control.component';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-image-input',
  standalone: true,
  imports: [CommonModule, ImageControlComponent],
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageInputComponent implements ControlValueAccessor {
  image: string | null = null;

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onImageChanged(image: string | null) {
    this.image = image;
  }
}
