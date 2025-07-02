import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { getOrdersFromLocalStorage } from '../utils/localStorage';
import { ArrowLeftIcon, EditIcon, SendIcon, CalendarIcon } from 'lucide-react';
interface OrderHistoryProps {
  technicianName: string;
  onBack: () => void;
  onEdit: (orderId: string) => void;
  onSendForBilling: (orders: any[]) => void;
}
export const OrderHistory = ({
  technicianName,
  onBack,
  onEdit,
  onSendForBilling
}: OrderHistoryProps) => {
  const [historicalOrders, setHistoricalOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  useEffect(() => {
    // Charger les ordres depuis le localStorage
    const orders = getOrdersFromLocalStorage(technicianName);
    setHistoricalOrders(orders);
  }, [technicianName]);
  const handleOrderSelection = orderId => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };
  const handleSendSelected = () => {
    const ordersToSend = historicalOrders.filter(order => selectedOrders.includes(order.id));
    onSendForBilling(ordersToSend);
  };
  // Filtrer les ordres par date si une date est sélectionnée
  const filteredOrders = filterDate ? historicalOrders.filter(order => {
    const orderDate = new Date(order.date).toISOString().split('T')[0];
    return orderDate === filterDate;
  }) : historicalOrders;
  // Grouper les ordres par date
  const ordersByDate = filteredOrders.reduce((acc, order) => {
    const date = new Date(order.date).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {});
  return <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#333333]">
          Historique des ordres de réparation
        </h2>
        <button onClick={onBack} className="text-[#0054A4] hover:underline flex items-center">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Retour au tableau de bord
        </button>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-700">
          Consultez vos ordres de réparation des 30 derniers jours. Vous pouvez
          les modifier ou les renvoyer pour facturation.
        </p>
      </div>
      <div className="flex items-center mb-6">
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-gray-700 mr-2">Filtrer par date:</span>
        </div>
        <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="border rounded px-3 py-1.5 text-sm" />
        {filterDate && <button onClick={() => setFilterDate('')} className="ml-2 text-sm text-[#0054A4] hover:underline">
            Réinitialiser
          </button>}
      </div>
      {Object.keys(ordersByDate).length === 0 ? <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">
            Aucun ordre de réparation dans l'historique
          </p>
        </div> : <>
          {Object.entries(ordersByDate).sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime()).map(([date, orders]) => <div key={date} className="mb-6">
                <h3 className="text-md font-medium text-[#0054A4] mb-2 border-b pb-1">
                  {new Date(date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
                </h3>
                <div className="space-y-3">
                  {orders.map(order => <div key={order.id} className="bg-white border rounded-md p-3 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <input type="checkbox" checked={selectedOrders.includes(order.id)} onChange={() => handleOrderSelection(order.id)} className="mt-1 mr-3" />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">
                                {order.driver.firstName} {order.driver.lastName}
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.vehicle.brand} -{' '}
                                {order.vehicle.registration}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {order.driver.company || 'Particulier'}
                              </p>
                            </div>
                            <button onClick={() => onEdit(order.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Modifier cet ordre">
                              <EditIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>)}
          {selectedOrders.length > 0 && <div className="mt-6 bg-gray-50 p-4 rounded-lg flex items-center justify-between">
              <p className="text-sm text-gray-700">
                {selectedOrders.length} ordre(s) sélectionné(s)
              </p>
              <Button onClick={handleSendSelected}>
                <SendIcon className="w-4 h-4 mr-2" />
                Envoyer pour facturation
              </Button>
            </div>}
        </>}
    </div>;
};