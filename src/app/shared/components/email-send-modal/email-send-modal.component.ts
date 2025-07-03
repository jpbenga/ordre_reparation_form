import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonComponent } from '../button/button.component';

export interface EmailModalData {
  ordersCount: number;
  recipientEmail: string;
}

@Component({
  selector: 'app-email-send-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ButtonComponent
  ],
  templateUrl: './email-send-modal.component.html',
  styleUrls: ['./email-send-modal.component.scss']
})
export class EmailSendModalComponent {
  stage: 'input' | 'sending' | 'success' = 'input';
  email: string;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<EmailSendModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmailModalData
  ) {
    this.email = this.data.recipientEmail;
  }

  async onSendEmail(): Promise<void> {
    if (!this.email.trim() || !this.email.includes('@')) {
      this.error = 'Veuillez entrer une adresse email valide';
      return;
    }
    this.error = '';
    this.stage = 'sending';

    await new Promise(resolve => setTimeout(resolve, 1500));

    this.stage = 'success';
    setTimeout(() => this.dialogRef.close(true), 3000);
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}