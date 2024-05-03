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
import { CvBlockItemComponent } from '../components/cv-block-item/cv-block-item.component';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-cv-edit-form-skills',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiSvgModule,
    DragDropModule,
    AddCvBlockItemButtonComponent,
    CvBlockItemComponent,
  ],
  templateUrl: './cv-edit-form-skills.component.html',
  styleUrl: './cv-edit-form-skills.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CvEditFormSkillsComponent {
  private readonly cvFormService = inject(CvEditFormService);
  readonly cvForm = this.cvFormService.cvForm;

  onAddSkill() {
    this.cvFormService.addSkill();
  }

  onDeleteSkill(idx: number) {
    this.cvFormService.deleteSkill(idx);
  }

  onSkillsItemDrop(event: CdkDragDrop<FormGroup>) {
    const skillsItems = this.cvForm.controls.skills.getRawValue();
    moveItemInArray(skillsItems, event.previousIndex, event.currentIndex);

    this.cvForm.controls.skills.patchValue(skillsItems);
  }
}
