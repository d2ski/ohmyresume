import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resume } from '../../../data-access/models/resume/resume.interface';
import { CvService } from '../../../data-access/cv.service';

@Component({
  selector: 'app-cv-template-basic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-template-basic.component.html',
  styleUrl: './cv-template-basic.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvTemplateBasicComponent implements AfterViewChecked {
  private readonly cvService = inject(CvService);
  cvData: Resume | undefined;

  @Input({ required: true }) set cv(cv: Resume) {
    this.cvData = cv;
  }

  @ViewChildren('cvBlock') cvBlocks?: QueryList<ElementRef<HTMLDivElement>>;

  @ViewChild('templateContentWrapper', { static: true })
  templateContentWrapper!: ElementRef<HTMLDivElement>;

  @ViewChild('templatePageView', { static: true })
  templatePageView!: ElementRef<HTMLDivElement>;

  _range = [...Array(25).keys()];

  pages: HTMLDivElement[] = [];

  @Input() set currentPageIndex(index: number) {
    this._currentPageIndex = index;
  }

  _currentPageIndex = 0;

  ngAfterViewChecked(): void {
    this.updatePages();
    this.renderPageView();
  }

  private resetContent() {
    this.pages.flat().forEach((block) => {
      this.templateContentWrapper.nativeElement.appendChild(block);
    });
  }

  private updatePages() {
    this.resetContent();
    this.pages = [];

    let pageContent = this.createNewPageContent();
    this.pages.push(pageContent);

    let currentPageHeight = 0;

    this.cvBlocks?.forEach((block) => {
      const blockHeight = block.nativeElement.clientHeight;

      if (
        blockHeight + currentPageHeight >
        this.templatePageView.nativeElement.clientHeight
      ) {
        pageContent = this.createNewPageContent();
        currentPageHeight = 0;
        this.pages.push(pageContent);
      }

      pageContent.appendChild(block.nativeElement);
      currentPageHeight += blockHeight;
    });

    this.cvService.updatePagesCount(this.pages.length);
  }

  private renderPageView(): void {
    const pageIndex = Math.min(this.pages.length - 1, this._currentPageIndex);

    this.templatePageView.nativeElement.innerHTML = '';
    this.templatePageView.nativeElement.appendChild(this.pages[pageIndex]);
  }

  private createNewPageContent(): HTMLDivElement {
    const pageContent = document.createElement('div');
    pageContent.classList.add('page-content');

    return pageContent;
  }
}
