import React, { useState } from 'react';
import { Button } from '../components/Button';
import { PlusIcon, SendIcon, FileTextIcon, EditIcon, TrashIcon, ClockIcon, HelpCircleIcon, AlertCircleIcon, CheckCircleIcon, InfoIcon, MapPinIcon, XIcon, SaveIcon, AlertTriangleIcon } from 'lucide-react';
interface TechnicianDashboardProps {
  technicianInfo: {
    name: string;
    date: string;
  };
  repairOrders: Array<any>;
  onStartNew: () => void;
  onEdit: (id: string) => void;
  onUpdate: (order: any) => void;
  onDelete: (id: string) => void;
  onSendForBilling: () => void;
  onViewHistory: () => void;
  onShowHelp: () => void;
}
export const TechnicianDashboard = ({
  technicianInfo,
  repairOrders,
  onStartNew,
  onEdit,
  onUpdate,
  onDelete,
  onSendForBilling,
  onViewHistory,
  onShowHelp
}: TechnicianDashboardProps) => {
  // État pour suivre quel ordre est en cours de modification d'emplacement
  const [editingLocationOrder, setEditingLocationOrder] = useState(null);
  // États pour les valeurs d'emplacement temporaires
  const [tempOutboundLocation, setTempOutboundLocation] = useState('');
  const [tempInboundLocation, setTempInboundLocation] = useState('');
  // État pour la boîte de dialogue de confirmation de suppression
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  // ID de l'ordre à supprimer
  const [orderToDeleteId, setOrderToDeleteId] = useState(null);
  // Commencer la modification d'un emplacement
  const startEditingLocation = order => {
    setEditingLocationOrder(order);
    setTempOutboundLocation(order.storage?.outbound?.location || '');
    setTempInboundLocation(order.storage?.inbound?.location || '');
  };
  // Annuler la modification
  const cancelEditingLocation = () => {
    setEditingLocationOrder(null);
    setTempOutboundLocation('');
    setTempInboundLocation('');
  };
  // Ouvrir la boîte de dialogue de confirmation de suppression
  const confirmDelete = orderId => {
    setOrderToDeleteId(orderId);
    setShowDeleteConfirmation(true);
  };
  // Annuler la suppression
  const cancelDelete = () => {
    setOrderToDeleteId(null);
    setShowDeleteConfirmation(false);
  };
  // Confirmer et exécuter la suppression
  const executeDelete = () => {
    if (orderToDeleteId) {
      onDelete(orderToDeleteId);
      setOrderToDeleteId(null);
      setShowDeleteConfirmation(false);
    }
  };
  // Sauvegarder l'emplacement
  const saveLocation = order => {
    // Créer une copie de l'ordre avec les emplacements mis à jour
    const updatedOrder = {
      ...order
    };
    // Mise à jour des emplacements si nécessaire
    if (order.storage?.outbound?.isBackAtCenter && order.storage?.outbound?.count && order.storage?.outbound?.count !== '0') {
      updatedOrder.storage = {
        ...updatedOrder.storage,
        outbound: {
          ...updatedOrder.storage.outbound,
          location: tempOutboundLocation
        }
      };
    }
    if (order.storage?.inbound?.isBackAtCenter && order.storage?.inbound?.count && order.storage?.inbound?.count !== '0') {
      updatedOrder.storage = {
        ...updatedOrder.storage,
        inbound: {
          ...updatedOrder.storage.inbound,
          location: tempInboundLocation
        }
      };
    }
    // Appeler onUpdate avec l'ordre mis à jour
    onUpdate(updatedOrder);
    // Réinitialiser l'état d'édition
    cancelEditingLocation();
  };
  // Identifier les ordres qui nécessitent une finalisation (emplacement à renseigner)
  const ordersToFinalize = repairOrders.filter(order => {
    // Vérifier si l'ordre a des pneus en entrée ou sortie stock qui sont revenus au centre mais sans emplacement
    const outboundNeedsLocation = order.storage?.outbound?.isBackAtCenter && order.storage?.outbound?.count && order.storage?.outbound?.count !== '0' && !order.storage?.outbound?.location;
    const inboundNeedsLocation = order.storage?.inbound?.isBackAtCenter && order.storage?.inbound?.count && order.storage?.inbound?.count !== '0' && !order.storage?.inbound?.location;
    return outboundNeedsLocation || inboundNeedsLocation;
  });
  // Ordres qui ne nécessitent pas de finalisation
  const regularOrders = repairOrders.filter(order => !ordersToFinalize.includes(order));
  // Group repair orders by company
  const ordersByCompany = regularOrders.reduce((acc, order) => {
    const company = order.driver.company || 'Particulier';
    if (!acc[company]) {
      acc[company] = [];
    }
    acc[company].push(order);
    return acc;
  }, {});
  // Group orders to finalize by company
  const finalizeOrdersByCompany = ordersToFinalize.reduce((acc, order) => {
    const company = order.driver.company || 'Particulier';
    if (!acc[company]) {
      acc[company] = [];
    }
    acc[company].push(order);
    return acc;
  }, {});
  // Vérifier si tous les emplacements sont renseignés pour pouvoir envoyer à la facturation
  const canSendForBilling = () => {
    // Vérifier si tous les ordres qui ont des pneus marqués comme "De retour au centre" ont un emplacement renseigné
    const hasUnfinishedOrders = repairOrders.some(order => {
      const outboundNeedsLocation = order.storage?.outbound?.isBackAtCenter && order.storage?.outbound?.count && order.storage?.outbound?.count !== '0' && !order.storage?.outbound?.location;
      const inboundNeedsLocation = order.storage?.inbound?.isBackAtCenter && order.storage?.inbound?.count && order.storage?.inbound?.count !== '0' && !order.storage?.inbound?.location;
      return outboundNeedsLocation || inboundNeedsLocation;
    });
    return !hasUnfinishedOrders;
  };
  // Gestion de l'envoi pour facturation avec vérification
  const handleSendForBilling = () => {
    if (canSendForBilling()) {
      onSendForBilling();
    } else {
      alert("Impossible d'envoyer pour facturation : certains ordres ont des pneus marqués comme 'De retour au centre' mais l'emplacement n'a pas été renseigné.");
    }
  };
  return <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#333333]">
          Tableau de bord technicien
        </h2>
        <div className="text-sm text-gray-600">{technicianInfo.date}</div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#0054A4] text-white flex items-center justify-center font-bold mr-3">
            {technicianInfo.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{technicianInfo.name}</p>
          </div>
        </div>
        <button onClick={onShowHelp} className="flex items-center text-[#0054A4] hover:underline text-sm">
          <HelpCircleIcon className="w-4 h-4 mr-1" />
          Aide
        </button>
      </div>
      <div className="flex flex-wrap gap-4 mb-6">
        <Button onClick={onStartNew}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Nouvel ordre
        </Button>
        <Button variant="secondary" onClick={onViewHistory}>
          <ClockIcon className="w-4 h-4 mr-2" />
          Historique
        </Button>
      </div>
      {/* Section des ordres à finaliser */}
      {ordersToFinalize.length > 0 && <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-[#333333] flex items-center">
              <AlertCircleIcon className="w-5 h-5 text-amber-500 mr-2" />
              Ordres à finaliser ({ordersToFinalize.length})
            </h3>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg mb-4 border border-amber-200">
            <p className="text-sm text-amber-800 flex items-center">
              <InfoIcon className="w-4 h-4 mr-2" />
              Ces ordres ont des pneus marqués comme "De retour au centre" mais
              l'emplacement n'a pas été renseigné.
            </p>
          </div>
          {Object.entries(finalizeOrdersByCompany).map(([company, orders]) => <div key={`finalize-${company}`} className="mb-6">
              <h4 className="text-md font-medium text-amber-700 mb-2 border-b border-amber-200 pb-1">
                {company}
              </h4>
              <div className="space-y-3">
                {orders.map(order => <div key={`finalize-${order.id}`} className="bg-white border border-amber-300 rounded-md p-3 shadow-sm hover:shadow-md transition-shadow">
                    {editingLocationOrder && editingLocationOrder.id === order.id ?
            // Mode édition d'emplacement
            <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium flex items-center">
                            <MapPinIcon className="w-4 h-4 mr-1 text-amber-500" />
                            Renseigner les emplacements
                          </h4>
                          <button onClick={cancelEditingLocation} className="text-gray-500 hover:text-gray-700">
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-3 pt-2">
                          {order.storage?.outbound?.isBackAtCenter && order.storage?.outbound?.count && order.storage?.outbound?.count !== '0' && <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Emplacement sortie stock (
                                  {order.storage.outbound.count} pneus)
                                </label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500" value={tempOutboundLocation} onChange={e => setTempOutboundLocation(e.target.value)} placeholder="Ex: Rack A-12" />
                              </div>}
                          {order.storage?.inbound?.isBackAtCenter && order.storage?.inbound?.count && order.storage?.inbound?.count !== '0' && <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Emplacement entrée stock (
                                  {order.storage.inbound.count} pneus)
                                </label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500" value={tempInboundLocation} onChange={e => setTempInboundLocation(e.target.value)} placeholder="Ex: Rack B-05" />
                              </div>}
                        </div>
                        <div className="flex justify-end pt-2">
                          <button onClick={() => saveLocation(order)} className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-md flex items-center text-sm">
                            <SaveIcon className="w-4 h-4 mr-1" />
                            Enregistrer
                          </button>
                        </div>
                      </div> :
            // Mode affichage normal
            <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">
                              {order.driver.firstName} {order.driver.lastName}
                            </p>
                            <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
                              À finaliser
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {order.vehicle.brand} - {order.vehicle.registration}
                          </p>
                          <button onClick={() => startEditingLocation(order)} className="mt-2 flex items-center text-xs text-amber-600 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-md border border-amber-200 shadow-sm hover:shadow transition-all duration-150 font-medium" aria-label="Cliquez pour renseigner l'emplacement">
                            <MapPinIcon className="w-3 h-3 mr-1" />
                            <EditIcon className="w-2.5 h-2.5 mr-1" />
                            Cliquez pour renseigner l'emplacement
                          </button>
                        </div>
                        <div className="flex space-x-2">
                          <button onClick={() => onEdit(order.id)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded" title="Éditer cet ordre">
                            <EditIcon className="w-4 h-4" />
                          </button>
                          <button onClick={() => confirmDelete(order.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Supprimer cet ordre">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>}
                  </div>)}
              </div>
            </div>)}
        </div>}
      {/* Section des ordres réguliers */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-[#333333] flex items-center">
          {ordersToFinalize.length > 0 ? <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" /> : null}
          Ordres de réparation en cours ({regularOrders.length})
        </h3>
      </div>
      {regularOrders.length === 0 && ordersToFinalize.length === 0 ? <div className="bg-gray-50 rounded-lg p-8 text-center">
          <FileTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Aucun ordre de réparation en cours</p>
          <p className="text-sm text-gray-400 mt-1">
            Cliquez sur "Nouvel ordre" pour commencer ou consultez l'historique
          </p>
        </div> : regularOrders.length === 0 ? <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-gray-500">
            Tous les ordres nécessitent une finalisation
          </p>
        </div> : <>
          {Object.entries(ordersByCompany).map(([company, orders]) => <div key={company} className="mb-6">
              <h4 className="text-md font-medium text-[#0054A4] mb-2 border-b pb-1">
                {company}
              </h4>
              <div className="space-y-3">
                {orders.map(order => <div key={order.id} className="bg-white border rounded-md p-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {order.driver.firstName} {order.driver.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.vehicle.brand} - {order.vehicle.registration}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => onEdit(order.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Éditer cet ordre">
                          <EditIcon className="w-4 h-4" />
                        </button>
                        <button onClick={() => confirmDelete(order.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Supprimer cet ordre">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>)}
        </>}
      {repairOrders.length > 0 && <div className="mt-8 flex justify-end">
          <Button onClick={handleSendForBilling}>
            <SendIcon className="w-4 h-4 mr-2" />
            Envoyer pour facturation
          </Button>
        </div>}
      {/* Boîte de dialogue de confirmation de suppression */}
      {showDeleteConfirmation && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex items-center text-red-600 mb-4">
              <AlertTriangleIcon className="w-8 h-8 mr-3" />
              <h3 className="text-lg font-bold">Confirmer la suppression</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Êtes-vous sûr de vouloir supprimer cet ordre de réparation ? Cette
              action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button onClick={cancelDelete} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Annuler
              </button>
              <button onClick={executeDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                Supprimer
              </button>
            </div>
          </div>
        </div>}
    </div>;
};