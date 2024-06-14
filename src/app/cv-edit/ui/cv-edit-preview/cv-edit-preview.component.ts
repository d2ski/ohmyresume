import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiModeModule, TuiSvgModule } from '@taiga-ui/core';
import { CvService } from '../../data-access/cv.service';
import { PAGE_DIMENSIONS } from '../../utils/page-dimensions.const';
import { CvTemplateMinimalComponent } from '../templates/cv-template-minimal/cv-template-minimal.component';
import { TemplateColor } from '../../data-access/models/template-color';

enum DENSITY_LIMIT {
  MAX = 5,
  MIN = -5,
}

@Component({
  selector: 'app-cv-edit-preview',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, TuiModeModule, TuiSvgModule],
  templateUrl: './cv-edit-preview.component.html',
  styleUrl: './cv-edit-preview.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CvEditPreviewComponent implements AfterViewChecked {
  @ViewChild('container', { static: true })
  containerView!: ElementRef<HTMLElement>;

  @ViewChild('page', { static: true })
  pageView!: ElementRef<HTMLElement>;

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
  readonly templateColors = this.cvService.templateColors;
  readonly currentTepmplateColor = this.cvService.currentTeplateColor;
  readonly #rootStyle = this.cvService.rootStyle;

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
      currentPageIndex: this.currentPageIndex(),
      rootStyle: this.#rootStyle(),
    };
  });

  ngAfterViewChecked(): void {
    this.scaleContainer();
  }

  @HostListener('window:resize')
  scaleContainer(): void {
    const containerWidth = this.containerView.nativeElement.offsetWidth;
    const containerHeight = this.containerView.nativeElement.offsetHeight;

    console.log(
      'containerHeight',
      containerHeight,
      'containerWidth',
      containerWidth
    );
    console.log(this.containerView.nativeElement);

    const maxScaleFactor = containerHeight > 700 ? 0.67 : 0.5;

    const scaleFactor = Math.min(
      containerWidth / PAGE_DIMENSIONS.width,
      maxScaleFactor
    );

    this.#scaleFactor.set(scaleFactor);
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

  public setCurrentTemplateColor(color: TemplateColor) {
    this.cvService.setCurrentTeplateColor(color);
  }
}
