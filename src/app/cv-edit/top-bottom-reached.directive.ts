import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Output,
} from '@angular/core';
import { TUI_SCROLL_REF } from '@taiga-ui/cdk';

@Directive({
  selector: '[appTopBottomReached]',
  standalone: true,
})
export class TopBottomReachedDirective {
  private readonly offset = 100;
  @Output() isReached = new EventEmitter<void>();
  @Output() isMissed = new EventEmitter<void>();

  constructor(@Inject(TUI_SCROLL_REF) private scrollContainer: ElementRef) {}

  @HostListener('window:scroll')
  onElementScroll() {
    const { clientHeight, scrollTop, scrollHeight } =
      this.scrollContainer.nativeElement;

    if (scrollTop < this.offset) {
      this.isReached.emit();
      return;
    }

    if (scrollHeight - clientHeight - scrollTop < this.offset) {
      this.isReached.emit();
      return;
    }

    this.isMissed.emit();
  }
}
