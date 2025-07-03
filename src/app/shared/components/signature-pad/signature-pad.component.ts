import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signature-pad',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatIconModule],
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss']
})
export class SignaturePadComponent implements AfterViewInit {
  @ViewChild('signatureCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  @Input() initialSignature?: string;
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  private context!: CanvasRenderingContext2D;
  private isDrawing = false;
  public hasSignature = false;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.context = canvas.getContext('2d')!;
    this.context.lineWidth = 2;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#000000';

    if (this.initialSignature) {
      const img = new Image();
      img.onload = () => {
        this.context.drawImage(img, 0, 0);
        this.hasSignature = true;
      };
      img.src = this.initialSignature;
    }
  }

  startDrawing(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    this.isDrawing = true;
    this.hasSignature = true;
    const coords = this.getCoordinates(event);
    this.context.beginPath();
    this.context.moveTo(coords.x, coords.y);
  }

  draw(event: MouseEvent | TouchEvent): void {
    if (!this.isDrawing) return;
    event.preventDefault();
    const coords = this.getCoordinates(event);
    this.context.lineTo(coords.x, coords.y);
    this.context.stroke();
  }

  stopDrawing(): void {
    this.isDrawing = false;
  }

  clearSignature(): void {
    this.context.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.hasSignature = false;
  }

  saveSignature(): void {
    if (this.hasSignature) {
      const signatureData = this.canvasRef.nativeElement.toDataURL('image/png');
      this.save.emit(signatureData);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private getCoordinates(event: MouseEvent | TouchEvent): { x: number; y: number } {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }
}