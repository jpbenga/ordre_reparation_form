import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSendModalComponent } from './email-send-modal.component';

describe('EmailSendModalComponent', () => {
  let component: EmailSendModalComponent;
  let fixture: ComponentFixture<EmailSendModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailSendModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
