import React from 'react';
import { Button } from '../components/Button';
import { ArrowLeftIcon, SendIcon, PrinterIcon } from 'lucide-react';
interface RepairOrderSummaryProps {
  repairOrders: Array<any>;
  onBack: () => void;
  onSendForBilling: () => void;
}
export const RepairOrderSummary = ({
  repairOrders,
  onBack,
  onSendForBilling
}: RepairOrderSummaryProps) => {
  // Group repair orders by company
  const ordersByCompany = repairOrders.reduce((acc, order) => {
    const company = order.driver.company || 'Particulier';
    if (!acc[company]) {
      acc[company] = [];
    }
    acc[company].push(order);
    return acc;
  }, {});
  // Calculate totals
  const totalOrders = repairOrders.length;
  const totalCompanies = Object.keys(ordersByCompany).length;
  return <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#333333]">
          Récapitulatif des ordres
        </h2>
        <button onClick={onBack} className="text-[#0054A4] hover:underline flex items-center">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Retour
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total des ordres</p>
          <p className="text-2xl font-bold text-[#0054A4]">{totalOrders}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Entreprises</p>
          <p className="text-2xl font-bold text-[#0054A4]">{totalCompanies}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Date</p>
          <p className="text-2xl font-bold text-[#0054A4]">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      {Object.entries(ordersByCompany).map(([company, orders]) => <div key={company} className="mb-6 bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-50 p-3 border-b">
            <h3 className="font-medium">{company}</h3>
            <p className="text-sm text-gray-600">
              {orders.length} ordres de réparation
            </p>
          </div>
          <div className="p-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Conducteur</th>
                  <th className="text-left py-2 px-2">Véhicule</th>
                  <th className="text-left py-2 px-2">Immatriculation</th>
                  <th className="text-left py-2 px-2">Pneumatiques</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2">
                      {order.driver.firstName} {order.driver.lastName}
                    </td>
                    <td className="py-2 px-2">{order.vehicle.brand}</td>
                    <td className="py-2 px-2">{order.vehicle.registration}</td>
                    <td className="py-2 px-2">
                      {order.tires.front && `AV: ${order.tires.front === 'summer' ? 'Été' : order.tires.front === 'winter' ? 'Hiver' : '4 Saisons'}`}
                      {order.tires.front && order.tires.rear && ', '}
                      {order.tires.rear && `AR: ${order.tires.rear === 'summer' ? 'Été' : order.tires.rear === 'winter' ? 'Hiver' : '4 Saisons'}`}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>)}
      <div className="mt-8 flex justify-between">
        <Button variant="secondary" onClick={() => window.print()}>
          <PrinterIcon className="w-4 h-4 mr-2" />
          Imprimer
        </Button>
        <Button onClick={onSendForBilling}>
          <SendIcon className="w-4 h-4 mr-2" />
          Envoyer pour facturation
        </Button>
      </div>
    </div>;
};