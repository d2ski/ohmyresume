import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class CvEditFormService {
  private readonly fb = inject(FormBuilder);

  readonly cvForm = this.fb.group({
    title: [''],
    photo: null,
    firstName: [''],
    lastName: [''],
    age: new FormControl<number | null>(null),
    city: [''],
    residency: [''],
    contacts: this.fb.group({
      email: [''],
      phone: [''],
    }),
    experience: this.fb.array<FormGroup>([]),
    education: this.fb.array<FormGroup>([]),
  });

  addExperience(): void {
    const experienceCount = this.cvForm.controls.experience.length;

    const experienceForm = this.fb.group({
      jobTitle: '',
      employer: '',
      monthStart: null,
      monthEnd: null,
      stillWork: true,
      description: '',
      order: experienceCount ? experienceCount - 1 : 0,
    });

    this.cvForm.controls.experience.push(experienceForm);
  }

  deleteExperience(index: number): void {
    this.cvForm.controls.experience.removeAt(index);
  }

  addEducation(): void {
    const educationCount = this.cvForm.controls.education.length;

    const educationForm = this.fb.group({
      schoolTitle: '',
      level: '',
      faculty: '',
      speciality: '',
      monthStart: null,
      monthEnd: null,
      order: educationCount ? educationCount - 1 : 0,
    });

    this.cvForm.controls.education.push(educationForm);
  }

  deleteEducation(index: number): void {
    this.cvForm.controls.education.removeAt(index);
  }
}
