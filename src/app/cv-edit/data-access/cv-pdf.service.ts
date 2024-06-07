import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { Base64 } from 'js-base64';

@Injectable({
  providedIn: 'root',
})
export class CvPdfService {
  readonly #http = inject(HttpClient);
  readonly #alertService = inject(TuiAlertService);

  #isLoading = signal(false);
  public isLoading = this.#isLoading.asReadonly();

  private processFile(htmlBase64String: string, rootCSS: string) {
    this.#isLoading.set(true);
    this.#http
      .post(
        'http://127.0.0.1:8000/pdfs',
        {
          htmlBase64String,
          rootCSS,
        },
        {
          responseType: 'arraybuffer',
          headers: {
            Accept: 'application/pdf',
          },
        }
      )
      .subscribe({
        next: (response: ArrayBuffer) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          this.downloadFile(blob);
          this.#isLoading.set(false);
        },
        error: () => {
          this.#isLoading.set(false);
          this.#alertService
            .open(
              'В данный момент скачивание недоступно. Попробуйте ещё раз через несколько минут.',
              {
                label: 'Ошибка загрузки файла',
                status: 'error',
                autoClose: false,
              }
            )
            .subscribe();
        },
      });
  }

  private downloadFile(blob: Blob, download = false, filename = 'resume.pdf') {
    const url = (window.URL || window.webkitURL).createObjectURL(blob);

    let revokeTime = 5 * 60 * 1000;
    let link: HTMLAnchorElement | undefined;

    if (download) {
      link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.setAttribute('target', '_blank');

      revokeTime = 1000;

      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
    } else {
      window.open(url, '_blank');
    }

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link?.remove();
    }, revokeTime);
  }

  public download(cvHTML: string, rootCSS: string) {
    const htmlBase64String = Base64.encode(cvHTML);

    if (!this.#isLoading()) {
      this.processFile(htmlBase64String, rootCSS);
    }
  }
}
