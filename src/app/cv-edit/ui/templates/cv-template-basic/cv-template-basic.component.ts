import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cv-template-basic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-template-basic.component.html',
  styleUrl: './cv-template-basic.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvTemplateBasicComponent implements AfterViewChecked {
  cvData: Resume | undefined;

  @Input({ required: true }) set cv(cv: Resume) {
    this.cvData = cv;
  }

  @ViewChildren('cvBlock') cvBlocks:
    | QueryList<ElementRef<HTMLDivElement>>
    | undefined;

  @ViewChild('templateContentWrapper', { static: true })
  templateContentWrapper!: ElementRef<HTMLDivElement>;

  @ViewChild('templatePageView', { static: true })
  templatePageView!: ElementRef<HTMLDivElement>;

  _range = [...Array(25).keys()];

  pages: HTMLDivElement[] = [];
  currentPageIndex = 0;

  ngAfterViewChecked(): void {
    this.updatePages();
    this.renderPageView();
  }

  toogleTemplateContentWrapper() {
    const display = this.templateContentWrapper.nativeElement.style.display;
    const toogleDisplay = display === 'none' ? 'block' : 'none';

    this.templateContentWrapper.nativeElement.style.display = toogleDisplay;
  }

  updatePages() {
    console.log('Run updatePages');
    console.log(
      'page height',
      this.templatePageView.nativeElement.clientHeight
    );
    console.log(
      'page scroll height',
      this.templatePageView.nativeElement.scrollHeight
    );

    this.pages = [];

    let pageContent = this.createNewPageContent();
    this.pages.push(pageContent);

    let currentPageHeight = 0;

    // console.log(this.cvBlocks);

    this.cvBlocks?.forEach((block) => {
      const blockHeight = block.nativeElement['offsetHeight'];

      console.log('blockHeight', blockHeight);
      console.log('block', block);

      if (
        blockHeight + currentPageHeight >
        this.templatePageView.nativeElement.clientHeight
      ) {
        console.log('new page');

        pageContent = this.createNewPageContent();
        currentPageHeight = 0;
        this.pages.push(pageContent);
      }

      pageContent.appendChild(block.nativeElement);
      currentPageHeight += blockHeight;

      console.log('currentPageHeight', currentPageHeight);
    });

    console.log('Pages count:', this.pages.length);

    // console.log('cvBlocks after', this.cvBlocks);
  }

  renderPageView() {
    this.templatePageView.nativeElement.innerHTML = '';
    this.templatePageView.nativeElement.appendChild(
      this.pages[this.currentPageIndex]
    );
  }

  createNewPageContent(): HTMLDivElement {
    const pageContent = document.createElement('div');
    pageContent.classList.add('page-content');

    return pageContent;
  }
}
