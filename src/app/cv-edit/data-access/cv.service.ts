import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Resume } from './models/resume/resume.interface';
import { CvPdfService } from './cv-pdf.service';
import { RootStyle } from './models/root-style';
import { TemplateColor } from './models/template-color';

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

  readonly #density = signal(0);
  readonly density = this.#density.asReadonly();

  readonly #templateColors = signal<TemplateColor[]>([]);
  public templateColors = this.#templateColors.asReadonly();
  readonly #currentTemplateColor = signal<TemplateColor | undefined>(undefined);
  readonly currentTeplateColor = this.#currentTemplateColor.asReadonly();

  readonly rootStyle = computed<RootStyle>(() => {
    const density = this.#density();

    const templatePadding = [32, 44].map((val) => val + 4 * density);
    const padding = [2, 1, 0.5].map((val) => val + val * 0.125 * density);

    const primaryColor =
      this.#currentTemplateColor() || 'rgba(255, 255, 255, 1)';
    const primaryColorLight = primaryColor.replace(', 1)', ', 0.3)');

    return {
      '--template-padding': `${templatePadding[0]}px ${templatePadding[1]}px`,
      '--padding-1': `${padding[0]}em`,
      '--padding-2': `${padding[1]}em`,
      '--padding-3': `${padding[2]}em`,
      '--primary-color-1': primaryColor,
      '--primary-color-2': primaryColorLight,
    };
  });

  readonly #rootStyleCSS = computed<string>(() => {
    const rootStyle = this.rootStyle();

    return Object.entries(rootStyle)
      .map(([key, value]) => `${key}:${value};`)
      .join('');
  });

  constructor() {
    effect(
      () => {
        const initColor = this.#templateColors()[0];
        this.#currentTemplateColor.set(initColor);
      },
      { allowSignalWrites: true }
    );
  }

  public updateCv(cv: Resume) {
    this.#cv.set(cv);
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

  public updateDensity(density: number) {
    this.#density.set(density);
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
      const rootCSS = this.#rootStyleCSS();
      this.#cvPdfService.download(this.#cvHTML(), rootCSS);
    }
  }

  public setTemplateColors(colors: TemplateColor[]) {
    this.#templateColors.set(colors);
  }

  public setCurrentTeplateColor(color: TemplateColor) {
    this.#currentTemplateColor.set(color);
  }
}
