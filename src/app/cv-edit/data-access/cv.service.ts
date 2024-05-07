import { Injectable, signal } from '@angular/core';
import { Resume } from './models/resume/resume.interface';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  cv = signal<Resume | undefined>(undefined);

  updateCv(cv: Resume) {
    this.cv.set(cv);
    console.log('Updated CV', this.cv());
  }
}
