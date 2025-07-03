import React, { useState } from 'react';
import { Button } from './Button';
import { ClipboardIcon, HistoryIcon, PlusCircleIcon, SendIcon, CheckCircleIcon, HelpCircleIcon, ArrowRightIcon, MailIcon } from 'lucide-react';
interface OnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}
export const Onboarding = ({
  onComplete,
  onSkip
}: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [{
    title: "Bienvenue sur l'application Ordre de Réparation",
    description: 'Cette application vous permet de gérer facilement vos ordres de réparation. Suivez ce guide rapide pour découvrir les fonctionnalités principales.',
    icon: <ClipboardIcon className="w-16 h-16 text-[#0054A4] mb-4" />
  }, {
    title: 'Créer un nouvel ordre',
    description: "Cliquez sur 'Nouvel ordre' pour commencer à saisir les informations du client et du véhicule. Le processus est divisé en 5 étapes simples.",
    icon: <PlusCircleIcon className="w-16 h-16 text-[#0054A4] mb-4" />
  }, {
    title: 'Gestion des emplacements de stockage',
    description: 'Lorsque des pneus sont de retour au centre, vous devez renseigner leur emplacement. Les ordres à finaliser apparaîtront dans une section spéciale du tableau de bord.',
    icon: <CheckCircleIcon className="w-16 h-16 text-amber-500 mb-4" />
  }, {
    title: "Consulter l'historique",
    description: "Tous vos ordres sont sauvegardés pendant 30 jours. Accédez à l'historique pour retrouver, modifier ou renvoyer d'anciens ordres.",
    icon: <HistoryIcon className="w-16 h-16 text-[#0054A4] mb-4" />
  }, {
    title: 'Envoyer pour facturation',
    description: 'Une fois vos ordres complétés, vous pouvez les envoyer pour facturation individuellement ou en groupe.',
    icon: <SendIcon className="w-16 h-16 text-[#0054A4] mb-4" />
  }, {
    title: 'Vous êtes prêt !',
    description: "Vous pouvez maintenant utiliser l'application. N'hésitez pas à cliquer sur le bouton d'aide si vous avez besoin de revoir ce guide.",
    icon: <CheckCircleIcon className="w-16 h-16 text-green-600 mb-4" />,
    footer: <div className="text-sm text-gray-600 mt-4 border-t pt-4">
          <p>Un problème technique ? Contactez le support :</p>
          <a href="mailto:jean.paul.benga@euromaster.com" className="text-[#0054A4] hover:underline flex items-center justify-center mt-1">
            <MailIcon className="w-4 h-4 mr-1" />
            jean.paul.benga@euromaster.com
          </a>
        </div>
  }];
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
        <div className="flex justify-end mb-2">
          <button onClick={onSkip} className="text-gray-500 hover:text-gray-700 text-sm">
            Ignorer
          </button>
        </div>
        <div className="flex flex-col items-center text-center mb-6">
          {steps[currentStep].icon}
          <h2 className="text-xl font-bold text-[#333333] mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600">{steps[currentStep].description}</p>
          {steps[currentStep].footer && steps[currentStep].footer}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {steps.map((_, index) => <div key={index} className={`w-2 h-2 rounded-full ${index === currentStep ? 'bg-[#0054A4]' : 'bg-gray-300'}`} />)}
          </div>
          <Button onClick={handleNext}>
            {currentStep < steps.length - 1 ? <>
                Suivant <ArrowRightIcon className="w-4 h-4 ml-1" />
              </> : 'Commencer'}
          </Button>
        </div>
      </div>
    </div>;
};