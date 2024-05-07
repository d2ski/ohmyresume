import { Injectable } from '@angular/core';
import { Resume } from './models/resume/resume.interface';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  cv: Resume | undefined;

  updateCv(cv: Resume) {
    this.cv = cv;
    console.log('Updated CV', this.cv);
  }
}
