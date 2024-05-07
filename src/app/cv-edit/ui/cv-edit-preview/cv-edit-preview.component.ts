import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const PAGE_DIMENSIONS = {
  width: 794,
  height: 1122,
  margin: 20,
} as const;

@Component({
  selector: 'app-cv-edit-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-edit-preview.component.html',
  styleUrl: './cv-edit-preview.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvEditPreviewComponent implements OnInit {
  @ViewChild('container', { static: true })
  containerView!: ElementRef<HTMLElement>;

  transform = 'transform: scale(1, 1);';

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
