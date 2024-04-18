import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvEditPreviewComponent } from './cv-edit-preview.component';

describe('CvEditPreviewComponent', () => {
  let component: CvEditPreviewComponent;
  let fixture: ComponentFixture<CvEditPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvEditPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CvEditPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
