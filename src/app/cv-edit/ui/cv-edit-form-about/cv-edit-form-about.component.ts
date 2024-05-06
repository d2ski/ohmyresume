import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvEditFormService } from '../../data-access/cv-edit-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiEditorModule, TuiEditorTool } from '@tinkoff/tui-editor';

@Component({
  selector: 'app-cv-edit-form-about',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiEditorModule],
  templateUrl: './cv-edit-form-about.component.html',
  styleUrl: './cv-edit-form-about.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvEditFormAboutComponent {
  private readonly cvFormService = inject(CvEditFormService);
  readonly cvForm = this.cvFormService.cvForm;

  readonly editorTools: TuiEditorTool[] = [
    TuiEditorTool.Bold,
    TuiEditorTool.Italic,
    TuiEditorTool.Underline,
    TuiEditorTool.List,
    TuiEditorTool.Link,
  ];
}
