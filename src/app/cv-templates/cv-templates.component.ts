import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiLinkModule, TuiModeModule } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cv-templates',
  standalone: true,
  imports: [
    CommonModule,
    TuiIslandModule,
    TuiButtonModule,
    RouterLink,
    TuiModeModule,
    TuiLinkModule,
    NgOptimizedImage,
  ],
  templateUrl: './cv-templates.component.html',
  styleUrl: './cv-templates.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CvTemplatesComponent {
  selectTemplates = [
    {
      title: 'Шаблон #1',
      preview: 'assets/img/resume-minimalist-template.jpg',
    },
  ];
}
