import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Metrika } from 'ng-yandex-metrika';
import { isPlatformServer, Location } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, TuiRootModule, TuiDialogModule, TuiAlertModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
  title = 'ohmyresume';

  constructor(
    private metrika: Metrika,
    private router: Router,
    private location: Location,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    if (isPlatformServer(platformId)) {
      return;
    }

    let prevPath = location.path();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const newPath = location.path();
        this.metrika.hit(newPath, {
          referer: prevPath,
        });
        prevPath = newPath;
      });
  }
}
