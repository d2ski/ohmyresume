import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ],
  templateUrl: './cv-templates.component.html',
  styleUrl: './cv-templates.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CvTemplatesComponent {
  selectTemplates = [
    {
      title: 'Строгий Black',
    },
    {
      title: 'Строгий Red',
    },
  ];
}
