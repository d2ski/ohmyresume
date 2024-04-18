import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvEditFormService } from '../../data-access/cv-edit-form.service';
import { TuiButtonModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import { AddCvBlockItemButtonComponent } from '../components/add-cv-block-item-button/add-cv-block-item-button.component';

@Component({
  selector: 'app-cv-edit-form-experience',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    AddCvBlockItemButtonComponent,
  ],
  templateUrl: './cv-edit-form-experience.component.html',
  styleUrl: './cv-edit-form-experience.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvEditFormExperienceComponent {
  private readonly cvFormService = inject(CvEditFormService);
  readonly cvForm = this.cvFormService.cvForm;

  onAddExperience() {
    console.log('add experience');
    // this.cvFormService.addExperience();
  }
}
