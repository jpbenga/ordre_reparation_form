import React from 'react';
import { SignatureCanvas } from './SignatureCanvas';
import { PenIcon } from 'lucide-react';
interface SignatureModalProps {
  isOpen: boolean;
  initialSignature?: string;
  onSave: (signatureData: string) => void;
  onClose: () => void;
  title?: string;
}
export const SignatureModal = ({
  isOpen,
  initialSignature,
  onSave,
  onClose,
  title = 'Signature du client'
}: SignatureModalProps) => {
  if (!isOpen) return null;
  const handleSave = (signatureData: string) => {
    onSave(signatureData);
    onClose();
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-5">
        <div className="flex items-center text-[#0054A4] mb-4">
          <PenIcon className="w-6 h-6 mr-2" />
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <SignatureCanvas initialSignature={initialSignature} onSave={handleSave} onCancel={onClose} />
      </div>
    </div>;
};