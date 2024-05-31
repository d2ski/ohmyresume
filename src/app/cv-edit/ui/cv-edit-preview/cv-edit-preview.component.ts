import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiModeModule } from '@taiga-ui/core';
import { CvService } from '../../data-access/cv.service';
import { PAGE_DIMENSIONS } from '../../utils/page-dimensions.const';
import { CvTemplateMinimalComponent } from '../templates/cv-template-minimal/cv-template-minimal.component';

enum DENSITY_LIMIT {
  MAX = 4,
  MIN = 1,
}

@Component({
  selector: 'app-cv-edit-preview',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, TuiModeModule],
  templateUrl: './cv-edit-preview.component.html',
  styleUrl: './cv-edit-preview.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CvEditPreviewComponent implements OnInit {
  @ViewChild('container', { static: true })
  containerView!: ElementRef<HTMLElement>;

  readonly #scaleFactor = signal(1);
  transform = computed(
    () => `transform: scale(${this.#scaleFactor()}, ${this.#scaleFactor()});`
  );

  private readonly cvService = inject(CvService);
  readonly cv = this.cvService.cv;
  readonly pagesCount = this.cvService.pagesCount;
  readonly currentPageIndex = this.cvService.currentPageIndex;
  readonly isPdfLoading = this.cvService.isPdfLoading;
  readonly #density = this.cvService.density;
  readonly #densityStyle = this.cvService.densityStyle;

  readonly nextPageButtonDisabled = computed(
    () =>
      this.pagesCount() === 1 ||
      this.currentPageIndex() === this.pagesCount() - 1
  );

  readonly prevPageButtonDisabled = computed(
    () => this.pagesCount() === 1 || this.currentPageIndex() === 0
  );

  //   cvTemplate = CvTemplateBaseComponent;
  cvTemplate = CvTemplateMinimalComponent;

  cvTemplateInputs = computed(() => {
    return {
      cv: this.cv(),
      scaleFactor: this.#scaleFactor(),
      currentPageIndex: this.currentPageIndex(),
      densityStyle: this.#densityStyle(),
    };
  });

  ngOnInit(): void {
    this.scaleContainer();
  }

  @HostListener('window:resize')
  scaleContainer(): void {
    const containerHeight = this.containerView.nativeElement.offsetHeight;
    const scaleFactor =
      (containerHeight - PAGE_DIMENSIONS.margin) / PAGE_DIMENSIONS.height;

    this.#scaleFactor.set(scaleFactor);

    // this.transform = `transform: scale(${scaleFactor}, ${scaleFactor});`;
  }

  nextPage() {
    const currentIndex = this.currentPageIndex();
    if (currentIndex < this.pagesCount() - 1) {
      this.cvService.updateCurrentPageIndex(currentIndex + 1);
    }
  }

  previousPage() {
    const currentIndex = this.currentPageIndex();
    if (currentIndex > 0) {
      this.cvService.updateCurrentPageIndex(currentIndex - 1);
    }
  }

  decreaseDensity() {
    const density = this.#density();
    if (density > DENSITY_LIMIT.MIN) {
      this.cvService.updateDensity(density - 1);
    }
  }

  increaseDensity() {
    const density = this.#density();
    if (density < DENSITY_LIMIT.MAX) {
      this.cvService.updateDensity(density + 1);
    }
  }

  downloadPDF() {
    this.cvService.downloadPDF();
  }
}
