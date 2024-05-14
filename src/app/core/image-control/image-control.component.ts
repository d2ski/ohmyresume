import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EventEmitter,
  Inject,
  Input,
  Output,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButtonModule,
  TuiDialogContext,
  TuiDialogModule,
  TuiDialogService,
} from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { CropperResult } from './models/cropper-result';
import { CropperData } from './models/cropper-data';
import {
  CropperPosition,
  ImageCroppedEvent,
  ImageCropperComponent,
  ImageCropperModule,
} from 'ngx-image-cropper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-control',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, TuiDialogModule, ImageCropperModule],
  templateUrl: './image-control.component.html',
  styleUrl: './image-control.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageControlComponent {
  imageHeight = signal(0);
  imageWidth = signal(0);
  imageSource = signal<string | null>(null);

  @Input() set width(value: number) {
    this.imageWidth.set(value);
  }

  @Input() set height(value: number) {
    this.imageHeight.set(value);
  }

  @Input() set image(value: string | null) {
    this.imageSource.set(value);
  }

  @Input() disabled = false;

  @Output() imageChanged = new EventEmitter<string | null>();

  isLoaded = computed(() => !!this.imageSource());

  data: CropperData | undefined = undefined;
  result = signal<CropperResult | undefined>(undefined);
  cropperPosition: CropperPosition | null = null;
  dialog: Subscription | undefined = undefined;

  @ViewChild('cropperDialog', { static: true })
  cropperDialog!: TemplateRef<TuiDialogContext>;

  @ViewChild('imageCropper') imageCropper?: ImageCropperComponent;

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {
    effect(() => {
      this.imageChanged.emit(this.imageSource());
    });
  }

  fileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.data = {
      image: input.files[0],
      width: this.imageWidth(),
      height: this.imageHeight(),
    };

    this.showCropperDialog(this.cropperDialog);
  }

  showCropperDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialog = this.dialogs.open(content).subscribe();
  }

  cropperReady() {
    if (this.imageCropper && this.cropperPosition) {
      this.imageCropper.cropper = this.cropperPosition;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    const { base64, cropperPosition } = event;

    if (base64) {
      this.result.set({ imageUrl: base64 });
      this.cropperPosition = cropperPosition;
    }
  }

  saveCroppedImage() {
    const result = this.result();

    if (!result) {
      return;
    }

    this.imageSource.set(result.imageUrl);

    this.dialog?.unsubscribe();
  }

  resetImage() {
    this.imageSource.set(null);
    this.cropperPosition = null;
  }
}
