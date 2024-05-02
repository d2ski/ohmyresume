import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Inject,
  Input,
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

  @Input() set width(value: number) {
    this.imageWidth.set(value);
  }

  @Input() set height(value: number) {
    this.imageHeight.set(value);
  }

  placeholder = computed(
    () => `https://placehold.co/${this.imageWidth()}x${this.imageHeight()}`
  );

  imageSource = computed(() => {
    if (this.croppedImage()) {
      return this.croppedImage()?.imageUrl;
    }

    return this.placeholder();
  });

  isLoaded = computed(() => {
    if (!this.croppedImage()) {
      return false;
    }

    return true;
  });

  data: CropperData | undefined = undefined;
  result = signal<CropperResult | undefined>(undefined);
  cropperPosition: CropperPosition | null = null;

  dialog: Subscription | undefined = undefined;
  croppedImage = signal<CropperResult | undefined>(undefined);

  @ViewChild('cropperDialog', { static: true })
  cropperDialog!: TemplateRef<TuiDialogContext>;

  @ViewChild('imageCropper') imageCropper?: ImageCropperComponent;

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {}

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
    const { blob, objectUrl, cropperPosition } = event;

    if (blob && objectUrl) {
      this.result.set({ blob, imageUrl: objectUrl });
      this.cropperPosition = cropperPosition;
    }
  }

  saveCroppedImage() {
    const result = this.result();

    if (!result) {
      return;
    }

    this.croppedImage.set({ ...result });

    this.dialog?.unsubscribe();
  }

  resetImage() {
    this.croppedImage.set(undefined);
    this.cropperPosition = null;
  }
}
