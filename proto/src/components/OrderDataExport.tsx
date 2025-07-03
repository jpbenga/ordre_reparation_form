import React, { useRef } from 'react';
import { Button } from './Button';
import { PrinterIcon, SendIcon, XIcon, PenIcon } from 'lucide-react';
import { SignatureCanvas } from './SignatureCanvas';
interface OrderDataExportProps {
  order: any;
  onClose: () => void;
  onAddSignature?: (orderId: string) => void;
}
export const OrderDataExport = ({
  order,
  onClose,
  onAddSignature
}: OrderDataExportProps) => {
  // Format date to be more readable
  const formatDate = dateString => {
    if (!dateString) return 'Non spécifié';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  // Print the current view
  const handlePrint = () => {
    window.print();
  };
  // Helper function to check if a section has data
  const hasData = section => {
    if (!section) return false;
    return Object.values(section).some(value => value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0));
  };
  // Helper function to format boolean values
  const formatBoolean = value => {
    return value ? 'Oui' : 'Non';
  };
  // Gérer l'ajout d'une signature
  const handleAddSignature = () => {
    if (onAddSignature) {
      onAddSignature(order.id);
    }
  };
  return <div className="fixed inset-0 bg-white z-50 overflow-y-auto print:static print:overflow-visible">
      <div className="print:hidden bg-[#0054A4] sticky top-0 z-10 p-4 border-b flex justify-between items-center text-white">
        <h1 className="text-xl font-bold flex items-center">
          <span className="hidden md:inline">
            Données de l'ordre de réparation
          </span>
          <span className="md:hidden">Ordre de réparation</span>
        </h1>
        <div className="flex gap-2">
          {onAddSignature && <Button onClick={handleAddSignature} variant="secondary">
              <PenIcon className="w-4 h-4 mr-2" />
              {order.signature ? 'Modifier signature' : 'Ajouter signature'}
            </Button>}
          <Button onClick={handlePrint} variant="secondary">
            <PrinterIcon className="w-4 h-4 mr-2" />
            Imprimer
          </Button>
          <button onClick={onClose} className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 print:mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0054A4]">
              Ordre de réparation
            </h1>
            <p className="text-gray-600">
              ID: {order.id.substring(0, 8).toUpperCase()}
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <p className="text-gray-600">Date: {formatDate(order.date)}</p>
            <p className="text-gray-600">Technicien: {order.technicianName}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h2 className="text-lg font-medium text-[#0054A4] mb-4">
              Information client
            </h2>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">Nom</td>
                  <td className="py-2">{order.driver.lastName}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Prénom</td>
                  <td className="py-2">{order.driver.firstName}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Société</td>
                  <td className="py-2">
                    {order.driver.company || 'Particulier'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h2 className="text-lg font-medium text-[#0054A4] mb-4">
              Information véhicule
            </h2>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">Immatriculation</td>
                  <td className="py-2 font-bold">
                    {order.vehicle.registration}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Marque</td>
                  <td className="py-2">{order.vehicle.brand}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Kilométrage</td>
                  <td className="py-2">{order.vehicle.mileage} km</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border mb-6">
          <h2 className="text-lg font-medium text-[#0054A4] mb-4">
            État des pneumatiques
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border rounded p-3 text-center">
              <div className="text-sm text-gray-600">Avant Gauche</div>
              <div className="font-bold text-lg">
                {order.condition.frontLeft || 'N/A'}
              </div>
            </div>
            <div className="border rounded p-3 text-center">
              <div className="text-sm text-gray-600">Avant Droit</div>
              <div className="font-bold text-lg">
                {order.condition.frontRight || 'N/A'}
              </div>
            </div>
            <div className="border rounded p-3 text-center">
              <div className="text-sm text-gray-600">Arrière Gauche</div>
              <div className="font-bold text-lg">
                {order.condition.rearLeft || 'N/A'}
              </div>
            </div>
            <div className="border rounded p-3 text-center">
              <div className="text-sm text-gray-600">Arrière Droit</div>
              <div className="font-bold text-lg">
                {order.condition.rearRight || 'N/A'}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border mb-6">
          <h2 className="text-lg font-medium text-[#0054A4] mb-4">
            Pneumatiques commandés
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50">
                  <th className="text-left p-3">Position</th>
                  <th className="text-left p-3">Quantité</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Marque</th>
                  <th className="text-left p-3">Modèle</th>
                  <th className="text-left p-3">Dimension</th>
                  <th className="text-left p-3">Indices</th>
                </tr>
              </thead>
              <tbody>
                {order.tires.frontTireCount && order.tires.frontTireCount !== '0' && <tr className="border-b">
                      <td className="p-3 font-medium">Avant</td>
                      <td className="p-3">{order.tires.frontTireCount}</td>
                      <td className="p-3">
                        {order.tires.front === 'summer' ? 'Été' : order.tires.front === 'winter' ? 'Hiver' : order.tires.front === 'allSeason' ? 'Toutes Saisons' : 'Non spécifié'}
                      </td>
                      <td className="p-3">{order.tires.frontBrand || '-'}</td>
                      <td className="p-3">{order.tires.frontModel || '-'}</td>
                      <td className="p-3">
                        {order.tires.frontDimension || '-'}
                      </td>
                      <td className="p-3">{order.tires.frontIndex || '-'}</td>
                    </tr>}
                {order.tires.rearTireCount && order.tires.rearTireCount !== '0' && <tr className="border-b">
                      <td className="p-3 font-medium">Arrière</td>
                      <td className="p-3">{order.tires.rearTireCount}</td>
                      <td className="p-3">
                        {order.tires.rear === 'summer' ? 'Été' : order.tires.rear === 'winter' ? 'Hiver' : order.tires.rear === 'allSeason' ? 'Toutes Saisons' : 'Non spécifié'}
                      </td>
                      <td className="p-3">{order.tires.rearBrand || '-'}</td>
                      <td className="p-3">{order.tires.rearModel || '-'}</td>
                      <td className="p-3">
                        {order.tires.rearDimension || '-'}
                      </td>
                      <td className="p-3">{order.tires.rearIndex || '-'}</td>
                    </tr>}
                {(!order.tires.frontTireCount || order.tires.frontTireCount === '0') && (!order.tires.rearTireCount || order.tires.rearTireCount === '0') && <tr>
                      <td colSpan={7} className="p-3 text-center text-gray-500">
                        Aucun pneumatique commandé
                      </td>
                    </tr>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border mb-6">
          <h2 className="text-lg font-medium text-[#0054A4] mb-4">
            Services et prestations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3 border-b pb-2">Forfaits</h3>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Forfait MO</td>
                    <td className="py-2 text-right">
                      {order.tires.laborCount || '0'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Valve</td>
                    <td className="py-2 text-right">
                      {order.tires.valveCount || '0'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Azote</td>
                    <td className="py-2 text-right">
                      {order.tires.nitrogenCount || '0'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Réparation crevaison</td>
                    <td className="py-2 text-right">
                      {order.tires.punctureRepairCount || '0'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Dépose/pose</td>
                    <td className="py-2 text-right">
                      {order.tires.mountingCount || '0'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Permutation</td>
                    <td className="py-2 text-right">
                      {order.tires.rotationCount || '0'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="font-medium mb-3 border-b pb-2">
                Options supplémentaires
              </h3>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Assurance pneumatique</td>
                    <td className="py-2 text-right">
                      {formatBoolean(order.tires.tireInsurance)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Assurance dépannage</td>
                    <td className="py-2 text-right">
                      {formatBoolean(order.tires.roadAssistance)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">
                      Réutilisation valve élec.
                    </td>
                    <td className="py-2 text-right">
                      {formatBoolean(order.tires.valveReuse)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">
                      Entretien valves élect.
                    </td>
                    <td className="py-2 text-right">
                      {formatBoolean(order.tires.valveMaintenance)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Équilibrage type</td>
                    <td className="py-2 text-right">
                      {formatBoolean(order.tires.balancingType)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Géométrie type</td>
                    <td className="py-2 text-right">
                      {formatBoolean(order.tires.geometryType)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Accord mise au déchet</td>
                    <td className="py-2 text-right">
                      {order.tires.wasteAgreementCount || '0'} pneu(s)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {(hasData(order.storage?.outbound) || hasData(order.storage?.inbound)) && <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h2 className="text-lg font-medium text-[#0054A4] mb-4">
              Gardiennage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hasData(order.storage?.outbound) && <div className="border rounded p-4">
                  <h3 className="font-medium mb-3 border-b pb-2">
                    Sortie stock
                  </h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Nombre de pneus</td>
                        <td className="py-2 text-right">
                          {order.storage.outbound.count || '0'}
                        </td>
                      </tr>
                      {order.storage.outbound.count && order.storage.outbound.count !== '0' && <>
                            <tr className="border-b">
                              <td className="py-2 font-medium">Roue</td>
                              <td className="py-2 text-right">
                                {formatBoolean(order.storage.outbound.wheel)}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-medium">Enjoliveur</td>
                              <td className="py-2 text-right">
                                {formatBoolean(order.storage.outbound.hubcap)}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-medium">Visserie</td>
                              <td className="py-2 text-right">
                                {formatBoolean(order.storage.outbound.screws)}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-medium">
                                De retour au centre
                              </td>
                              <td className="py-2 text-right">
                                {formatBoolean(order.storage.outbound.isBackAtCenter)}
                              </td>
                            </tr>
                            {order.storage.outbound.isBackAtCenter && <tr>
                                <td className="py-2 font-medium">
                                  Emplacement
                                </td>
                                <td className="py-2 text-right">
                                  {order.storage.outbound.location || 'Non spécifié'}
                                </td>
                              </tr>}
                          </>}
                    </tbody>
                  </table>
                </div>}
              {hasData(order.storage?.inbound) && <div className="border rounded p-4">
                  <h3 className="font-medium mb-3 border-b pb-2">
                    Entrée stock
                  </h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Nombre de pneus</td>
                        <td className="py-2 text-right">
                          {order.storage.inbound.count || '0'}
                        </td>
                      </tr>
                      {order.storage.inbound.count && order.storage.inbound.count !== '0' && <>
                            <tr className="border-b">
                              <td className="py-2 font-medium">Roue</td>
                              <td className="py-2 text-right">
                                {formatBoolean(order.storage.inbound.wheel)}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-medium">Enjoliveur</td>
                              <td className="py-2 text-right">
                                {formatBoolean(order.storage.inbound.hubcap)}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-medium">Visserie</td>
                              <td className="py-2 text-right">
                                {formatBoolean(order.storage.inbound.screws)}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-medium">
                                De retour au centre
                              </td>
                              <td className="py-2 text-right">
                                {formatBoolean(order.storage.inbound.isBackAtCenter)}
                              </td>
                            </tr>
                            {order.storage.inbound.isBackAtCenter && <tr>
                                <td className="py-2 font-medium">
                                  Emplacement
                                </td>
                                <td className="py-2 text-right">
                                  {order.storage.inbound.location || 'Non spécifié'}
                                </td>
                              </tr>}
                          </>}
                    </tbody>
                  </table>
                </div>}
            </div>
          </div>}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#0054A4] mb-4">
            Signature du client
          </h2>
          {order.signature ? <div className="border rounded p-4 bg-gray-50">
              <img src={order.signature} alt="Signature du client" className="max-h-32 mx-auto" />
            </div> : <div className="border rounded p-4 bg-gray-50 text-center text-gray-400">
              {onAddSignature ? <p>
                  Aucune signature - Cliquez sur "Ajouter signature" pour signer
                </p> : <p>Aucune signature</p>}
            </div>}
        </div>
        <div className="print:hidden text-center mt-8">
          <Button onClick={handlePrint}>
            <PrinterIcon className="w-4 h-4 mr-2" />
            Imprimer ce document
          </Button>
        </div>
      </div>
    </div>;
};