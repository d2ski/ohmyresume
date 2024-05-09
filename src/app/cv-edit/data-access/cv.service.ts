import { Injectable, signal } from '@angular/core';
import { Resume } from './models/resume/resume.interface';

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

  updateCv(cv: Resume) {
    this.#cv.set(cv);
    console.log('Updated CV', this.cv());
  }

  updatePagesCount(count: number) {
    this.#pagesCount.set(count);

    if (this.#currentPageIndex() > this.#pagesCount() - 1) {
      this.#currentPageIndex.set(this.#pagesCount() - 1);
    }
  }

  updateCurrentPageIndex(index: number) {
    this.#currentPageIndex.set(index);
  }
}
