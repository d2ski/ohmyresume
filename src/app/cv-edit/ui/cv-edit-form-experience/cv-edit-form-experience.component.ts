import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvEditFormService } from '../../data-access/cv-edit-form.service';
import {
  TuiButtonModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiInputMonthModule } from '@taiga-ui/kit';
import { AddCvBlockItemButtonComponent } from '../components/add-cv-block-item-button/add-cv-block-item-button.component';
import { CvBlockItemComponent } from '../components/cv-block-item/cv-block-item.component';
import { formatTimePeriod } from '../../utils/format-time-period';
import { TuiEditorModule, TuiEditorTool } from '@tinkoff/tui-editor';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cv-edit-form-experience',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiInputMonthModule,
    TuiEditorModule,
    TuiTextfieldControllerModule,
    TuiSvgModule,
    DragDropModule,
    AddCvBlockItemButtonComponent,
    CvBlockItemComponent,
  ],
  templateUrl: './cv-edit-form-experience.component.html',
  styleUrl: './cv-edit-form-experience.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CvEditFormExperienceComponent {
  private readonly cvFormService = inject(CvEditFormService);
  readonly cvForm = this.cvFormService.cvForm;

  readonly editorTools: TuiEditorTool[] = [
    TuiEditorTool.Bold,
    TuiEditorTool.Italic,
    TuiEditorTool.Underline,
    TuiEditorTool.List,
    TuiEditorTool.Link,
  ];

  getExperienceTitle(experience: FormGroup): string {
    if (!experience.controls['jobTitle'].value) {
      return '';
    }

    if (!experience.controls['employer'].value) {
      return `${experience.controls['jobTitle'].value}`;
    }

    return `${experience.controls['jobTitle'].value} в ${experience.controls['employer'].value}`;
  }

  getExperienceSubtitle(experience: FormGroup): string {
    const monthStart = experience.controls['monthStart'].value;
    const monthEnd = experience.controls['monthEnd'].value;

    return formatTimePeriod(monthStart, monthEnd);
  }

  onAddExperience() {
    this.cvFormService.addExperience();
  }

  onDeleteExperience(idx: number) {
    this.cvFormService.deleteExperience(idx);
  }

  onExperienceItemDrop(event: CdkDragDrop<FormGroup>) {
    const experienceItems = this.cvForm.controls.experience.getRawValue();
    moveItemInArray(experienceItems, event.previousIndex, event.currentIndex);

    this.cvForm.controls.experience.patchValue(experienceItems);
  }
}
