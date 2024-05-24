import { inject, Injectable, signal } from '@angular/core';
import { Resume } from './models/resume/resume.interface';
import { CvPdfService } from './cv-pdf.service';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  readonly #cv = signal<Resume | undefined>(undefined);
  readonly cv = this.#cv.asReadonly();

  readonly #pagesCount = signal<number>(1);
  readonly pagesCount = this.#pagesCount.asReadonly();
  readonly #currentPageIndex = signal(0);
  readonly currentPageIndex = this.#currentPageIndex.asReadonly();
  readonly #cvHTML = signal('');

  readonly #cvPdfService = inject(CvPdfService);
  public isPdfLoading = this.#cvPdfService.isLoading;

  public updateCv(cv: Resume) {
    this.#cv.set(cv);
    console.log('Updated CV', this.cv());
  }

  public updatePagesCount(count: number) {
    this.#pagesCount.set(count);

    if (this.#currentPageIndex() > this.#pagesCount() - 1) {
      this.#currentPageIndex.set(this.#pagesCount() - 1);
    }
  }

  public updateCurrentPageIndex(index: number) {
    this.#currentPageIndex.set(index);
  }

  private clearCvHTML(html: string): string {
    return html
      .replace(/ng-star-inserted/g, '')
      .replace(/<!--container-->/g, '');
  }

  public updateCvHTML(html: string) {
    const htmlClear = this.clearCvHTML(html);
    this.#cvHTML.set(`<div class="tpl-minimal">${htmlClear}</div>`);
  }

  public downloadPDF() {
    if (this.#cvHTML()) {
      this.#cvPdfService.download(this.#cvHTML());
    }
  }
}
