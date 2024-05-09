import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiModeModule } from '@taiga-ui/core';
import { CvTemplateBasicComponent } from '../templates/cv-template-basic/cv-template-basic.component';
import { CvService } from '../../data-access/cv.service';
import { PAGE_DIMENSIONS } from '../../utils/page-dimensions.const';

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

  transform = 'transform: scale(1, 1);';

  private readonly cvService = inject(CvService);
  readonly cv = this.cvService.cv;
  readonly pagesCount = this.cvService.pagesCount;
  readonly currentPageIndex = this.cvService.currentPageIndex;

  readonly nextPageButtonDisabled = computed(
    () =>
      this.pagesCount() === 1 ||
      this.currentPageIndex() === this.pagesCount() - 1
  );

  readonly prevPageButtonDisabled = computed(
    () => this.pagesCount() === 1 || this.currentPageIndex() === 0
  );

  cvTemplate = CvTemplateBasicComponent;

  cvTemplateInputs = computed(() => {
    return {
      cv: this.cv(),
      currentPageIndex: this.currentPageIndex(),
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

    this.transform = `transform: scale(${scaleFactor}, ${scaleFactor});`;
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
}
