import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class CvEditFormService {
  private readonly fb = inject(FormBuilder);

  readonly cvForm = this.fb.group({
    title: [''],
    header: this.fb.group({
      firstName: [''],
      lastName: [''],
      age: new FormControl<number | null>(null),
      city: [''],
      residency: [''],
    }),
    contacts: this.fb.group({
      email: [''],
      phone: [''],
    }),
    experience: this.fb.array<FormGroup>([]),
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
}
