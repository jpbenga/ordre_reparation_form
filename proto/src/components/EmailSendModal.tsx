import React, { useEffect, useState } from 'react';
import { MailIcon, CheckCircleIcon, XIcon, FileTextIcon, SendIcon, LoaderIcon } from 'lucide-react';
import { Button } from './Button';
interface EmailSendModalProps {
  isOpen: boolean;
  onClose: () => void;
  ordersCount: number;
  recipientEmail?: string;
  onSendEmail: (email: string) => Promise<void>;
}
export const EmailSendModal = ({
  isOpen,
  onClose,
  ordersCount,
  recipientEmail: initialEmail = '',
  onSendEmail
}: EmailSendModalProps) => {
  const [stage, setStage] = useState<'input' | 'sending' | 'success'>('input');
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState('');
  // Réinitialiser l'état lorsque le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setStage('input');
      setEmail(initialEmail);
      setError('');
    }
  }, [isOpen, initialEmail]);
  // Fermer automatiquement le modal après le succès
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stage === 'success') {
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [stage, onClose]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation basique de l'email
    if (!email.trim()) {
      setError('Veuillez entrer une adresse email');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }
    setError('');
    setStage('sending');
    try {
      await onSendEmail(email);
      setStage('success');
    } catch (err) {
      setError("Erreur lors de l'envoi. Veuillez réessayer.");
      setStage('input');
    }
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
        {/* Header avec bouton de fermeture */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-[#333333] flex items-center">
            <MailIcon className="w-5 h-5 mr-2 text-[#0054A4]" />
            Envoi pour facturation
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100" disabled={stage === 'sending'}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        {/* Contenu principal */}
        <div className="mb-6">
          {stage === 'input' && <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <p className="text-gray-700 mb-4">
                  Vous êtes sur le point d'envoyer {ordersCount} ordre(s) de
                  réparation pour facturation.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg flex items-center mb-4">
                  <FileTextIcon className="w-5 h-5 text-[#0054A4] mr-2" />
                  <span className="text-sm text-gray-700">
                    {ordersCount} ordre(s) de réparation sélectionné(s)
                  </span>
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email du destinataire
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#0054A4] ${error ? 'border-red-500' : 'border-gray-300'}`} placeholder="comptabilite@entreprise.com" required />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>
              <div className="flex justify-end">
                <Button type="submit">
                  <SendIcon className="w-4 h-4 mr-2" />
                  Envoyer
                </Button>
              </div>
            </form>}
          {stage === 'sending' && <div className="text-center py-6">
              <div className="flex justify-center mb-4">
                <LoaderIcon className="w-12 h-12 text-[#0054A4] animate-spin" />
              </div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                Envoi en cours...
              </h4>
              <p className="text-gray-600">
                Veuillez patienter pendant que nous envoyons vos ordres de
                réparation.
              </p>
            </div>}
          {stage === 'success' && <div className="text-center py-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircleIcon className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                Envoi réussi !
              </h4>
              <p className="text-gray-600">
                {ordersCount} ordre(s) de réparation ont été envoyés avec succès
                à {email}.
              </p>
            </div>}
        </div>
      </div>
    </div>;
};