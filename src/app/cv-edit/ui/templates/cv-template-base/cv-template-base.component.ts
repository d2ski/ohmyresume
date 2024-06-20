import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { maskitoTransform } from '@maskito/core';
import {
  Education,
  Resume,
} from '../../../data-access/models/resume/resume.interface';
import { CvService } from '../../../data-access/cv.service';
import { TuiMonthLike } from '@taiga-ui/cdk';
import { formatTimePeriod } from '../../../utils/format-time-period';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import combineStrings from '../../../utils/combine-strings';
import { RootStyle } from '../../../data-access/models/root-style';
import { TemplateColor } from '../../../data-access/models/template-color';

@Component({
  selector: 'app-cv-template-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-template-base.component.html',
  styleUrl: './cv-template-base.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvTemplateBaseComponent implements OnInit, AfterViewChecked {
  private readonly cvService = inject(CvService);

  cvData: Resume | undefined;

  colors: TemplateColor[] = [];

  @Input({ required: true }) set cv(cv: Resume) {
    this.cvData = cv;
  }

  @ViewChildren('cvBlock') cvBlocks?: QueryList<ElementRef<HTMLDivElement>>;

  @ViewChild('templateContentWrapper', { static: true })
  templateContentWrapper!: ElementRef<HTMLDivElement>;

  @ViewChild('templatePageView', { static: true })
  templatePageView!: ElementRef<HTMLDivElement>;

  readonly templatePageViewStyle = {
    height: '100%',
    overflowY: 'hidden',
  } as const;

  pages: HTMLDivElement[] = [];

  @Input() set currentPageIndex(index: number) {
    this._currentPageIndex = index;
  }
  _currentPageIndex = 0;

  readonly #sanitizer = inject(DomSanitizer);

  //   @Input({ required: true }) scaleFactor!: number;

  @Input({ required: true }) rootStyle!: RootStyle;

  ngOnInit(): void {
    this.cvService.setTemplateColors(this.colors);
  }

  ngAfterViewChecked(): void {
    // setTimeout(() => {
    //   this.updatePages();
    //   this.renderPageView();
    // }, 1000);
    this.updatePages();
    this.renderPageView();
  }

  private resetContent() {
    this.pages.flat().forEach((block) => {
      this.templateContentWrapper.nativeElement.appendChild(block);
    });
    this.updateCvHTML();
  }

  private updatePages() {
    this.resetContent();
    this.pages = [];
    let pageContent = this.createNewPageContent();
    this.pages.push(pageContent);

    const { paddingTop: pagePaddingTop, paddingBottom: pagePaddingBottom } =
      getComputedStyle(this.templatePageView.nativeElement);
    const pageViewHeight = this.templatePageView.nativeElement.clientHeight;
    const pageViewPadding =
      (parseFloat(pagePaddingBottom) + parseFloat(pagePaddingTop)) * 1.5;

    let currentPageHeight = 0;

    this.cvBlocks?.forEach((block) => {
      const blockHeight = block.nativeElement.clientHeight;

      if (blockHeight + currentPageHeight > pageViewHeight - pageViewPadding) {
        pageContent = this.createNewPageContent(true);
        currentPageHeight = 0;
        this.pages.push(pageContent);
      }

      pageContent.appendChild(block.nativeElement);
      currentPageHeight = currentPageHeight + blockHeight;
    });

    this.cvService.updatePagesCount(this.pages.length);

    this.updateCvHTML();
  }

  private renderPageView(): void {
    const pageIndex = Math.min(this.pages.length - 1, this._currentPageIndex);
    this.templatePageView.nativeElement.innerHTML = '';
    this.templatePageView.nativeElement.appendChild(this.pages[pageIndex]);
  }

  private createNewPageContent(withPageBreak = false): HTMLDivElement {
    const pageContent = document.createElement('div');
    pageContent.classList.add('page-content');

    if (withPageBreak) {
      const pageBreak = document.createElement('div');
      pageBreak.classList.add('page-break');
      pageContent.appendChild(pageBreak);
    }

    return pageContent;
  }

  private updateCvHTML(): void {
    const cvHTML = this.pages.map((page) => page.innerHTML).join('');
    this.cvService.updateCvHTML(cvHTML);
  }

  get phoneFormatted(): string {
    if (!this.cvData?.contacts.phone) {
      return '';
    }

    const mask = {
      mask: [
        '+',
        /\d/,
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
      ],
    };

    return maskitoTransform(this.cvData?.contacts.phone, mask);
  }

  get infoFormatted() {
    const age = this.getAgeFormatted();
    const city = this.cvData?.city || '';
    const residency = this.cvData?.residency || '';

    return combineStrings(city, residency, age);
  }

  private getAgeFormatted(): string {
    if (!this.cvData?.age) {
      return '';
    }

    const lastDigit = this.cvData.age % 10;
    const lastTwoDigits = this.cvData.age % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${this.cvData.age} лет`;
    }

    if (lastDigit === 1) {
      return `${this.cvData.age} год`;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${this.cvData.age} года`;
    }

    return `${this.cvData.age} лет`;
  }

  public timePeriodFormatted(
    monthStart: TuiMonthLike | null,
    monthEnd: TuiMonthLike | null
  ) {
    return formatTimePeriod(monthStart, monthEnd);
  }

  public educationTitleFormated(education: Education): string {
    return combineStrings(education.schoolTitle, education.level);
  }

  public educationFormated(education: Education): string {
    return combineStrings(education.faculty, education.speciality);
  }

  public descriptionFormated(descriptionHTML: string): SafeHtml {
    return this.#sanitizer.bypassSecurityTrustHtml(descriptionHTML);
  }
}
