import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageControlComponent } from '../image-control/image-control.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-image-input',
  standalone: true,
  imports: [CommonModule, ImageControlComponent],
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageInputComponent),
      multi: true,
    },
  ],
})
export class ImageInputComponent implements ControlValueAccessor {
  @Input({ required: true }) width!: number;
  @Input({ required: true }) height!: number;

  image: string | null = null;
  disabled = false;

  private onChange: (image: string | null) => void = () => {
    //
  };

  onTouched: () => void = () => {
    //
  };

  writeValue(value: string | null): void {
    this.image = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onImageChanged(image: string | null) {
    this.image = image;
    this.onChange(image);
  }
}
