import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { mockCv } from './resume.mock';

@Injectable()
export class CvEditFormService {
  private readonly fb = inject(FormBuilder);

  readonly cvForm = this.fb.group({
    title: ['Frontend-разработчик Angular'],
    photo: null,
    firstName: ['Иван'],
    lastName: ['Демидов'],
    age: new FormControl<number | null>(33),
    city: ['Москва'],
    residency: ['Россия'],
    contacts: this.fb.group({
      email: ['test@test.ru'],
      phone: ['+79112342423'],
    }),
    experience: this.fb.array<FormGroup>([
      this.fb.group(mockCv.experience[0]),
      this.fb.group(mockCv.experience[1]),
    ]),
    education: this.fb.array<FormGroup>([this.fb.group(mockCv.education[0])]),
    skills: this.fb.array<FormGroup>([
      ...mockCv.skills.map((skill) => this.fb.group(skill)),
    ]),
    languages: this.fb.array<FormGroup>([
      ...mockCv.languages.map((skill) => this.fb.group(skill)),
    ]),
    about: ['<p>Начинающий web-программист с опытом бизнес-аналитика.</p>'],
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

  addSkill(): void {
    const skillForm = this.fb.group({
      skillTitle: '',
    });

    this.cvForm.controls.skills.push(skillForm);
  }

  deleteSkill(index: number): void {
    this.cvForm.controls.skills.removeAt(index);
  }

  addLanguage(): void {
    const languageForm = this.fb.group({
      langTitle: '',
      level: null,
    });

    this.cvForm.controls.languages.push(languageForm);
  }

  deleteLanguage(index: number): void {
    this.cvForm.controls.languages.removeAt(index);
  }
}
