import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Type,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPhoneModule,
} from '@taiga-ui/kit';
import {
  TUI_TEXTFIELD_APPEARANCE_DIRECTIVE,
  TuiHintModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CvEditFormContactsComponent } from '../cv-edit-form-contacts/cv-edit-form-contacts.component';
import { CvEditFormBlockWrapperComponent } from '../cv-edit-form-block-wrapper/cv-edit-form-block-wrapper.component';
import { CvEditFormEducationComponent } from '../cv-edit-form-education/cv-edit-form-education.component';
import { CvEditFormExperienceComponent } from '../cv-edit-form-experience/cv-edit-form-experience.component';
import {
  TUI_EDITOR_DEFAULT_EXTENSIONS,
  TUI_EDITOR_EXTENSIONS,
  tuiEditorOptionsProvider,
} from '@tinkoff/tui-editor';
import { ImageInputComponent } from '../../../core/image-input/image-input.component';
import { CvEditFormSkillsComponent } from '../cv-edit-form-skills/cv-edit-form-skills.component';
import { CvEditFormLanguagesComponent } from '../cv-edit-form-languages/cv-edit-form-languages.component';
import { CvEditFormAboutComponent } from '../cv-edit-form-about/cv-edit-form-about.component';

type CvBlock = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Type<any>;
};

@Component({
  selector: 'app-cv-edit-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiInputPhoneModule,
    TuiTextfieldControllerModule,
    TuiHintModule,
    TuiSvgModule,
    DragDropModule,
    ImageInputComponent,
    CvEditFormBlockWrapperComponent,
    CvEditFormContactsComponent,
    CvEditFormEducationComponent,
    CvEditFormExperienceComponent,
  ],
  templateUrl: './cv-edit-form.component.html',
  styleUrl: './cv-edit-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TUI_TEXTFIELD_APPEARANCE_DIRECTIVE,
      useValue: {
        appearance: 'flat-textfield',
      },
    },
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useFactory: () => [...TUI_EDITOR_DEFAULT_EXTENSIONS],
    },
    tuiEditorOptionsProvider({
      appearence: 'flat-textfield',
    }),
  ],
})
export class CvEditFormComponent {
  @Input({ required: true }) cvForm!: FormGroup;

  cvBlocks: CvBlock[] = [
    {
      title: 'Опыт работы',
      component: CvEditFormExperienceComponent,
    },
    {
      title: 'Образование',
      component: CvEditFormEducationComponent,
    },
    {
      title: 'Навыки',
      component: CvEditFormSkillsComponent,
    },
    {
      title: 'Иностранные языки',
      component: CvEditFormLanguagesComponent,
    },
    {
      title: 'Обо мне',
      component: CvEditFormAboutComponent,
    },
  ];

  cvBlockDrop(event: CdkDragDrop<CvBlock>) {
    moveItemInArray(this.cvBlocks, event.previousIndex, event.currentIndex);
  }
}
