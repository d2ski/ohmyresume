import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvEditFormService } from '../../data-access/cv-edit-form.service';
import { LanguageLevel } from '../../data-access/models/resume/resume.interface';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { TuiInputModule, TuiSelectModule } from '@taiga-ui/kit';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { TuiSvgModule } from '@taiga-ui/core';
import { AddCvBlockItemButtonComponent } from '../components/add-cv-block-item-button/add-cv-block-item-button.component';
import { CvBlockItemComponent } from '../components/cv-block-item/cv-block-item.component';

interface LanguageLevelDisplay {
  level: LanguageLevel;
  label: string;
}

@Component({
  selector: 'app-cv-edit-form-languages',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiSelectModule,
    TuiSvgModule,
    DragDropModule,
    AddCvBlockItemButtonComponent,
    CvBlockItemComponent,
  ],
  templateUrl: './cv-edit-form-languages.component.html',
  styleUrl: './cv-edit-form-languages.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CvEditFormLanguagesComponent {
  private readonly cvFormService = inject(CvEditFormService);
  readonly cvForm = this.cvFormService.cvForm;

  languageLevels: LanguageLevelDisplay[] = [
    { level: LanguageLevel.A1, label: 'Начальный (A1)' },
    { level: LanguageLevel.A2, label: 'Базовый (A2)' },
    { level: LanguageLevel.B1, label: 'Средний (B1)' },
    { level: LanguageLevel.B2, label: 'Выше среднего (B2)' },
    { level: LanguageLevel.C1, label: 'Продвинутый (C1)' },
    { level: LanguageLevel.C2, label: 'Профессиональный (C2)' },
  ];

  stringify: TuiStringHandler<LanguageLevelDisplay> = (level) => level.label;

  getLanguageTitle(language: FormGroup): string {
    if (!language.controls['langTitle'].value) {
      return '';
    }

    const title = language.controls['langTitle'].value;

    return `${title}`;
  }

  getLanguageSubtitle(language: FormGroup): string {
    if (!language.controls['level'].value) {
      return '';
    }

    const level = language.controls['level'].value;

    return `${level.label}`;
  }

  onAddLanguage(): void {
    this.cvFormService.addLanguage();
  }

  onDeleteLanguage(idx: number): void {
    this.cvFormService.deleteLanguage(idx);
  }

  onLanguagesItemDrop(event: CdkDragDrop<FormGroup>) {
    const languagesItems = this.cvForm.controls.languages.getRawValue();
    moveItemInArray(languagesItems, event.previousIndex, event.currentIndex);

    this.cvForm.controls.languages.patchValue(languagesItems);
  }
}
