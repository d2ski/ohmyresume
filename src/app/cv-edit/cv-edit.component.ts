import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvEditFormComponent } from './ui/cv-edit-form/cv-edit-form.component';
import { CvEditPreviewComponent } from './ui/cv-edit-preview/cv-edit-preview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Resume } from './data-access/models/resume/resume.interface';
import { CvEditFormService } from './data-access/cv-edit-form.service';
import { CvService } from './data-access/cv.service';
import {
  TuiButtonModule,
  TuiLinkModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TopBottomReachedDirective } from './top-bottom-reached.directive';

const MOBILE_CONTROL_BUTTONS = {
  preview: {
    icon: 'tuiIconChevronLeftLarge',
    label: 'Назад',
  },
  edit: {
    icon: 'tuiIconFileTextLarge',
    label: 'Просмотр',
  },
} as const;

type MobileControlButton = {
  icon: string;
  label: string;
};

@Component({
  selector: 'app-cv-edit',
  standalone: true,
  imports: [
    CommonModule,
    CvEditFormComponent,
    CvEditPreviewComponent,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiScrollbarModule,
    TopBottomReachedDirective,
    TuiLinkModule,
  ],
  templateUrl: './cv-edit.component.html',
  styleUrl: './cv-edit.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CvEditFormService],
})
export default class CvEditComponent implements OnInit {
  private readonly formService = inject(CvEditFormService);
  readonly cvForm = this.formService.cvForm;

  private readonly cvService = inject(CvService);

  public isMobileControlExpanded = true;
  public showMobilePreview = false;
  public mobileControlButton: MobileControlButton = MOBILE_CONTROL_BUTTONS.edit;

  ngOnInit(): void {
    this.cvForm.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((cv) => this.updateCv(cv as Resume));
  }

  private updateCv(cv: Resume) {
    this.cvService.updateCv(cv);
  }

  public shrinkMobileControl() {
    this.isMobileControlExpanded = false;
  }

  public expandMobileControl() {
    this.isMobileControlExpanded = true;
  }

  public tooglePreview() {
    this.showMobilePreview = !this.showMobilePreview;
    this.mobileControlButton = this.showMobilePreview
      ? MOBILE_CONTROL_BUTTONS.preview
      : MOBILE_CONTROL_BUTTONS.edit;
  }
}
