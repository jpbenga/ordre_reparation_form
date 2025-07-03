import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SignaturePadComponent } from '../signature-pad/signature-pad.component';

export interface SignatureModalData {
  initialSignature?: string;
  title: string;
}

@Component({
  selector: 'app-signature-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    SignaturePadComponent
  ],
  templateUrl: './signature-modal.component.html',
  styleUrls: ['./signature-modal.component.scss']
})
export class SignatureModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SignatureModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SignatureModalData
  ) {}

  onSave(signatureData: string): void {
    this.dialogRef.close(signatureData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}