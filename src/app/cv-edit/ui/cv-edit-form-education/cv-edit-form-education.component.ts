import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvEditFormService } from '../../data-access/cv-edit-form.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddCvBlockItemButtonComponent } from '../components/add-cv-block-item-button/add-cv-block-item-button.component';
import { formatTimePeriod } from '../../utils/format-time-period';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  TuiButtonModule,
  TuiTextfieldControllerModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiInputModule,
  TuiInputMonthModule,
} from '@taiga-ui/kit';
import { CvBlockItemComponent } from '../components/cv-block-item/cv-block-item.component';

@Component({
  selector: 'app-cv-edit-form-education',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiInputMonthModule,
    TuiTextfieldControllerModule,
    TuiSvgModule,
    DragDropModule,
    AddCvBlockItemButtonComponent,
    CvBlockItemComponent,
  ],
  templateUrl: './cv-edit-form-education.component.html',
  styleUrl: './cv-edit-form-education.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CvEditFormEducationComponent {
  private readonly cvFormService = inject(CvEditFormService);
  readonly cvForm = this.cvFormService.cvForm;

  getEducationTitle(education: FormGroup): string {
    if (!education.controls['schoolTitle'].value) {
      return '';
    }

    return education.controls['schoolTitle'].value;
  }

  getEducationSubtitle(education: FormGroup): string {
    const monthStart = education.controls['monthStart'].value;
    const monthEnd = education.controls['monthEnd'].value;

    return formatTimePeriod(monthStart, monthEnd);
  }

  onAddEducation() {
    this.cvFormService.addEducation();
  }

  onDeleteEducation(idx: number) {
    this.cvFormService.deleteEducation(idx);
  }

  onEducationItemDrop(event: CdkDragDrop<FormGroup>) {
    const educationItems = this.cvForm.controls.education.getRawValue();
    moveItemInArray(educationItems, event.previousIndex, event.currentIndex);

    this.cvForm.controls.education.patchValue(educationItems);
  }
}
