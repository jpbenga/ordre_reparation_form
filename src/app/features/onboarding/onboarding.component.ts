import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {
  @Output() complete = new EventEmitter<void>();
  @Output() skip = new EventEmitter<void>();

  currentStep = 0;
  steps = [
    {
      title: "Bienvenue sur l'application Ordre de Réparation",
      description: 'Cette application vous permet de gérer facilement vos ordres de réparation. Suivez ce guide rapide pour découvrir les fonctionnalités principales.',
      icon: 'assignment'
    },
    {
      title: 'Créer un nouvel ordre',
      description: "Cliquez sur 'Nouvel ordre' pour commencer à saisir les informations du client et du véhicule. Le processus est divisé en 5 étapes simples.",
      icon: 'add_circle_outline'
    },
    {
      title: 'Gestion des emplacements de stockage',
      description: 'Lorsque des pneus sont de retour au centre, vous devez renseigner leur emplacement. Les ordres à finaliser apparaîtront dans une section spéciale du tableau de bord.',
      icon: 'location_on'
    },
    {
      title: "Consulter l'historique",
      description: "Tous vos ordres sont sauvegardés pendant 30 jours. Accédez à l'historique pour retrouver, modifier ou renvoyer d'anciens ordres.",
      icon: 'history'
    },
    {
      title: 'Vous êtes prêt !',
      description: "Vous pouvez maintenant utiliser l'application. N'hésitez pas à cliquer sur le bouton d'aide si vous avez besoin de revoir ce guide.",
      icon: 'check_circle',
      footer: 'Un problème technique ? Contactez le support : jean.paul.benga@euromaster.com'
    }
  ];

  handleNext(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      this.complete.emit();
    }
  }

  handleSkip(): void {
    this.skip.emit();
  }
}