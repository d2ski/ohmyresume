import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChild,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvTemplateBasicComponent } from '../templates/cv-template-basic/cv-template-basic.component';
import { CvService } from '../../data-access/cv.service';
import { Resume } from '../../data-access/models/resume/resume.interface';
import { PAGE_DIMENSIONS } from '../../utils/page-dimensions.const';
import { Subject } from 'rxjs';

// const PAGE_DIMENSIONS = {
//   width: 794,
//   height: 1122,
//   margin: 20,
// } as const;

@Component({
  selector: 'app-cv-edit-preview',
  standalone: true,
  imports: [CommonModule],
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

  cvTemplate = CvTemplateBasicComponent;

  cvTemplateInputs = computed(() => {
    return {
      cv: this.cv(),
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
}
