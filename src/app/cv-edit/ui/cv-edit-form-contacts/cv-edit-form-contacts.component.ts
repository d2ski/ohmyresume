import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CvEditFormService } from '../../data-access/cv-edit-form.service';
import { TuiInputModule, TuiInputPhoneModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-cv-edit-form-contacts',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPhoneModule,
  ],
  templateUrl: './cv-edit-form-contacts.component.html',
  styleUrl: './cv-edit-form-contacts.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvEditFormContactsComponent {
  readonly cvForm = inject(CvEditFormService).cvForm;
}
