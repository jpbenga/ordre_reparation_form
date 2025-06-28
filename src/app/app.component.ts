import { Component } from '@angular/core';
import { AppContainerComponent } from './app-container/app-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  protected title = 'ordre_de_reparation_pwa_app';
}