import React, { useEffect, useState, useRef } from 'react';
import { Button } from './Button';
import { PenIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
interface SignatureCanvasProps {
  initialSignature?: string;
  onSave: (signatureData: string) => void;
  onCancel: () => void;
  readOnly?: boolean;
}
export const SignatureCanvas = ({
  initialSignature,
  onSave,
  onCancel,
  readOnly = false
}: SignatureCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(!!initialSignature);
  // Initialiser le canvas et charger la signature existante si présente
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    // Configurer le style du trait
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.strokeStyle = '#000000';
    // Effacer le canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Charger la signature existante si présente
    if (initialSignature) {
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0);
        setHasSignature(true);
      };
      img.src = initialSignature;
    }
  }, [initialSignature]);
  // Commencer à dessiner
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (readOnly) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    setIsDrawing(true);
    setHasSignature(true);
    // Obtenir les coordonnées du point de départ
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      // Événement tactile
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Événement souris
      clientX = e.clientX;
      clientY = e.clientY;
    }
    context.beginPath();
    context.moveTo(clientX - rect.left, clientY - rect.top);
  };
  // Dessiner
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || readOnly) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    // Obtenir les coordonnées du point actuel
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      // Événement tactile
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      // Empêcher le défilement sur mobile
      e.preventDefault();
    } else {
      // Événement souris
      clientX = e.clientX;
      clientY = e.clientY;
    }
    context.lineTo(clientX - rect.left, clientY - rect.top);
    context.stroke();
  };
  // Arrêter de dessiner
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  // Effacer la signature
  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };
  // Sauvegarder la signature
  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Convertir le canvas en data URL
    const signatureData = canvas.toDataURL('image/png');
    onSave(signatureData);
  };
  return <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-700 flex items-center">
          <PenIcon className="w-4 h-4 mr-2 text-[#0054A4]" />
          {readOnly ? 'Signature' : 'Signer ici'}
        </h3>
        {!readOnly && <div className="flex gap-2">
            <button onClick={clearSignature} className="p-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded" title="Effacer la signature" type="button">
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>}
      </div>
      <div className="border rounded-lg overflow-hidden bg-gray-50 mb-3">
        <canvas ref={canvasRef} width={400} height={150} className={`w-full touch-none ${readOnly ? 'cursor-default' : 'cursor-crosshair'}`} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} />
      </div>
      {!readOnly && <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            <XIcon className="w-4 h-4 mr-1" />
            Annuler
          </Button>
          <Button onClick={saveSignature} disabled={!hasSignature}>
            <SaveIcon className="w-4 h-4 mr-1" />
            Enregistrer
          </Button>
        </div>}
      {!hasSignature && !readOnly && <p className="text-sm text-gray-500 mt-2 text-center">
          Dessinez votre signature dans la zone ci-dessus
        </p>}
    </div>;
};