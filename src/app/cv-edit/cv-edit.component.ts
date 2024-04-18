import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvEditFormComponent } from './ui/cv-edit-form/cv-edit-form.component';
import { CvEditPreviewComponent } from './ui/cv-edit-preview/cv-edit-preview.component';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Resume } from './data-access/models/resume/resume.interface';
import { CvEditFormService } from './data-access/cv-edit-form.service';

@Component({
  selector: 'app-cv-edit',
  standalone: true,
  imports: [
    CommonModule,
    CvEditFormComponent,
    CvEditPreviewComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './cv-edit.component.html',
  styleUrl: './cv-edit.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CvEditFormService],
})
export default class CvEditComponent implements OnInit {
  private readonly formService = inject(CvEditFormService);
  readonly cvForm = this.formService.cvForm;

  ngOnInit(): void {
    this.cvForm.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((cvValues) => this.updateCvView(cvValues as Resume));
  }

  private updateCvView(cvValues: Resume) {
    console.log('Update CV', cvValues);
  }
}
