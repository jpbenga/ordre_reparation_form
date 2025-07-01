import React, { useEffect, useState } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { DriverInfo } from './pages/DriverInfo';
import { VehicleInfo } from './pages/VehicleInfo';
import { VehicleCondition } from './pages/VehicleCondition';
import { TireSelection } from './pages/TireSelection';
import { Storage } from './pages/Storage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TechnicianInfo } from './pages/TechnicianInfo';
import { TechnicianDashboard } from './pages/TechnicianDashboard';
import { RepairOrderSummary } from './pages/RepairOrderSummary';
import { OrderHistory } from './pages/OrderHistory';
import { Onboarding } from './components/Onboarding';
import { saveOrdersToLocalStorage, getOrdersFromLocalStorage, addOrderToHistory } from './utils/localStorage';
import { hasSeenOnboarding, markOnboardingAsSeen, resetOnboardingStatus } from './utils/onboardingStorage';
export function App() {
  // Main navigation state: 'dashboard', 'new-order', 'edit-order', 'summary', 'history'
  const [appView, setAppView] = useState('technician-login');
  // Current repair order ID being worked on
  const [currentOrderId, setCurrentOrderId] = useState(null);
  // Technician information
  const [technicianInfo, setTechnicianInfo] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0]
  });
  // All repair orders for the day
  const [repairOrders, setRepairOrders] = useState([]);
  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(false);
  // Load orders from localStorage when technician logs in
  useEffect(() => {
    if (technicianInfo.name && appView === 'dashboard') {
      const savedOrders = getOrdersFromLocalStorage(technicianInfo.name);
      // On ne charge pas automatiquement les ordres historiques dans la liste active
      // mais on pourrait le faire si nécessaire
    }
  }, [technicianInfo.name, appView]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    driver: {
      firstName: '',
      lastName: '',
      company: ''
    },
    vehicle: {
      registration: '',
      brand: '',
      mileage: ''
    },
    condition: {
      frontLeft: '',
      frontRight: '',
      rearLeft: '',
      rearRight: ''
    },
    tires: {
      front: '',
      rear: '',
      frontBrand: '',
      rearBrand: '',
      frontModel: '',
      rearModel: '',
      frontDimension: '',
      rearDimension: '',
      frontIndex: '',
      rearIndex: '',
      frontTireCount: '',
      rearTireCount: '',
      tireInsurance: false,
      roadAssistance: false,
      valveReuse: false,
      valveMaintenance: false,
      balancingType: false,
      geometryType: false,
      contReg: false,
      wasteAgreementCount: '',
      // Initialisation des propriétés pour les forfaits
      laborCount: '',
      valveCount: '',
      nitrogenCount: '',
      punctureRepairCount: '',
      mountingCount: '',
      rotationCount: ''
    },
    storage: {
      outbound: {
        count: '',
        wheel: false,
        hubcap: false,
        screws: false,
        location: '',
        profile: '',
        dimension: '',
        brand: '',
        tireProfile: '',
        isBackAtCenter: false
      },
      inbound: {
        count: '',
        wheel: false,
        hubcap: false,
        screws: false,
        location: '',
        profile: '',
        dimension: '',
        brand: '',
        tireProfile: '',
        isBackAtCenter: false
      }
    }
  });
  // Handle technician login
  const handleTechnicianLogin = techData => {
    setTechnicianInfo(techData);
    // Vérifier si l'utilisateur a déjà vu l'onboarding
    if (!hasSeenOnboarding(techData.name)) {
      setShowOnboarding(true);
    } else {
      setAppView('dashboard');
    }
  };
  // Handle onboarding completion
  const handleOnboardingComplete = () => {
    markOnboardingAsSeen(technicianInfo.name);
    setShowOnboarding(false);
    setAppView('dashboard');
  };
  // Handle onboarding skip
  const handleOnboardingSkip = () => {
    markOnboardingAsSeen(technicianInfo.name);
    setShowOnboarding(false);
    setAppView('dashboard');
  };
  // Show onboarding again
  const showOnboardingAgain = () => {
    setShowOnboarding(true);
  };
  // Start a new repair order
  const startNewOrder = () => {
    setFormData({
      driver: {
        firstName: '',
        lastName: '',
        company: ''
      },
      vehicle: {
        registration: '',
        brand: '',
        mileage: ''
      },
      condition: {
        frontLeft: '',
        frontRight: '',
        rearLeft: '',
        rearRight: ''
      },
      tires: {
        front: '',
        rear: '',
        frontBrand: '',
        rearBrand: '',
        frontModel: '',
        rearModel: '',
        frontDimension: '',
        rearDimension: '',
        frontIndex: '',
        rearIndex: '',
        frontTireCount: '',
        rearTireCount: '',
        tireInsurance: false,
        roadAssistance: false,
        valveReuse: false,
        valveMaintenance: false,
        balancingType: false,
        geometryType: false,
        contReg: false,
        wasteAgreementCount: '',
        // Initialisation des propriétés pour les forfaits
        laborCount: '',
        valveCount: '',
        nitrogenCount: '',
        punctureRepairCount: '',
        mountingCount: '',
        rotationCount: ''
      },
      storage: {
        outbound: {
          count: '',
          wheel: false,
          hubcap: false,
          screws: false,
          location: '',
          profile: '',
          dimension: '',
          brand: '',
          tireProfile: '',
          isBackAtCenter: false
        },
        inbound: {
          count: '',
          wheel: false,
          hubcap: false,
          screws: false,
          location: '',
          profile: '',
          dimension: '',
          brand: '',
          tireProfile: '',
          isBackAtCenter: false
        }
      }
    });
    setCurrentStep(1);
    setCurrentOrderId(null);
    setAppView('new-order');
  };
  // Save current repair order
  const saveRepairOrder = () => {
    const newOrder = {
      id: currentOrderId || Date.now().toString(),
      date: new Date().toISOString(),
      technicianName: technicianInfo.name,
      ...formData
    };
    if (currentOrderId) {
      // Update existing order
      setRepairOrders(repairOrders.map(order => order.id === currentOrderId ? newOrder : order));
    } else {
      // Add new order
      setRepairOrders([...repairOrders, newOrder]);
    }
    // Sauvegarder l'ordre dans le localStorage
    addOrderToHistory(newOrder, technicianInfo.name);
    setAppView('dashboard');
  };
  // Edit an existing repair order
  const editRepairOrder = orderId => {
    // Chercher d'abord dans les ordres actifs
    let orderToEdit = repairOrders.find(order => order.id === orderId);
    // Si non trouvé, chercher dans l'historique
    if (!orderToEdit) {
      const historicalOrders = getOrdersFromLocalStorage(technicianInfo.name);
      orderToEdit = historicalOrders.find(order => order.id === orderId);
    }
    if (orderToEdit) {
      const {
        id,
        date,
        technicianName,
        ...orderData
      } = orderToEdit;
      setFormData(orderData);
      setCurrentOrderId(id);
      setCurrentStep(1);
      setAppView('new-order');
    }
  };
  // Update a repair order directly (for quick location updates)
  const updateRepairOrder = updatedOrder => {
    if (updatedOrder) {
      // Update the order in the active orders list
      setRepairOrders(repairOrders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
      // Also update in localStorage history
      addOrderToHistory(updatedOrder, technicianInfo.name);
    }
  };
  // Delete a repair order
  const deleteRepairOrder = orderId => {
    setRepairOrders(repairOrders.filter(order => order.id !== orderId));
  };
  // Send selected repair orders for billing
  const sendForBilling = (ordersToSend = repairOrders) => {
    alert(`${ordersToSend.length} ordres de réparation envoyés pour facturation.`);
    // Si on envoie tous les ordres actifs
    if (ordersToSend === repairOrders) {
      // Sauvegarder tous les ordres dans l'historique avant de les supprimer
      repairOrders.forEach(order => {
        addOrderToHistory(order, technicianInfo.name);
      });
      setRepairOrders([]);
    }
    setAppView('dashboard');
  };
  // View order history
  const viewOrderHistory = () => {
    setAppView('history');
  };
  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      saveRepairOrder();
    }
  };
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const updateFormData = (section, data) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        ...data
      }
    });
  };
  // Render the appropriate view based on app state
  const renderView = () => {
    switch (appView) {
      case 'technician-login':
        return <TechnicianInfo onSubmit={handleTechnicianLogin} />;
      case 'dashboard':
        return <TechnicianDashboard technicianInfo={technicianInfo} repairOrders={repairOrders} onStartNew={startNewOrder} onEdit={editRepairOrder} onUpdate={updateRepairOrder} onDelete={deleteRepairOrder} onSendForBilling={() => sendForBilling()} onViewHistory={viewOrderHistory} onShowHelp={showOnboardingAgain} />;
      case 'history':
        return <OrderHistory technicianName={technicianInfo.name} onBack={() => setAppView('dashboard')} onEdit={editRepairOrder} onSendForBilling={sendForBilling} />;
      case 'summary':
        return <RepairOrderSummary repairOrders={repairOrders} onBack={() => setAppView('dashboard')} onSendForBilling={() => sendForBilling()} />;
      case 'new-order':
        return <>
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => setAppView('dashboard')} className="text-[#0054A4] hover:underline flex items-center">
                ← Retour au tableau de bord
              </button>
              <div className="text-sm text-gray-600">
                Technicien: {technicianInfo.name} | Date: {technicianInfo.date}
              </div>
            </div>
            <ProgressBar currentStep={currentStep} totalSteps={5} />
            {currentStep === 1 && <DriverInfo data={formData.driver} updateData={data => updateFormData('driver', data)} onNext={handleNext} />}
            {currentStep === 2 && <VehicleInfo data={formData.vehicle} updateData={data => updateFormData('vehicle', data)} onNext={handleNext} onPrevious={handlePrevious} />}
            {currentStep === 3 && <VehicleCondition data={formData.condition} updateData={data => updateFormData('condition', data)} onNext={handleNext} onPrevious={handlePrevious} />}
            {currentStep === 4 && <TireSelection data={formData.tires} updateData={data => updateFormData('tires', data)} onNext={handleNext} onPrevious={handlePrevious} />}
            {currentStep === 5 && <Storage data={formData.storage} updateData={data => updateFormData('storage', data)} onPrevious={handlePrevious} onFinish={saveRepairOrder} />}
          </>;
      default:
        return <div>Erreur de navigation</div>;
    }
  };
  return <div className="flex flex-col min-h-screen w-full bg-white">
      <Header />
      <main className="flex-1 p-4 md:p-8 max-w-3xl mx-auto w-full">
        {renderView()}
      </main>
      <Footer />
      {/* Afficher l'onboarding si nécessaire */}
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} onSkip={handleOnboardingSkip} />}
    </div>;
}