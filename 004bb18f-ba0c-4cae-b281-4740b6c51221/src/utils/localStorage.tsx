import React from 'react';
// Fonction pour sauvegarder les ordres de réparation dans le localStorage avec expiration
export const saveOrdersToLocalStorage = (orders, technicianName) => {
  // Création d'un objet avec les ordres et leur date d'expiration (1 mois)
  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 1);
  const storageData = {
    orders,
    expiration: expirationDate.getTime(),
    technicianName
  };
  localStorage.setItem('repairOrdersHistory', JSON.stringify(storageData));
};
// Fonction pour récupérer les ordres de réparation du localStorage
export const getOrdersFromLocalStorage = technicianName => {
  const storageData = localStorage.getItem('repairOrdersHistory');
  if (!storageData) {
    return [];
  }
  try {
    const data = JSON.parse(storageData);
    // Vérifier si les données sont expirées
    if (data.expiration && new Date().getTime() > data.expiration) {
      localStorage.removeItem('repairOrdersHistory');
      return [];
    }
    // Vérifier si les ordres appartiennent au technicien connecté
    if (data.technicianName !== technicianName) {
      return [];
    }
    return data.orders || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return [];
  }
};
// Fonction pour ajouter un nouvel ordre à l'historique
export const addOrderToHistory = (order, technicianName) => {
  const existingOrders = getOrdersFromLocalStorage(technicianName);
  // Vérifier si l'ordre existe déjà dans l'historique
  const orderIndex = existingOrders.findIndex(o => o.id === order.id);
  if (orderIndex >= 0) {
    // Mettre à jour l'ordre existant
    existingOrders[orderIndex] = order;
  } else {
    // Ajouter le nouvel ordre
    existingOrders.push(order);
  }
  saveOrdersToLocalStorage(existingOrders, technicianName);
};
// Fonction pour supprimer un ordre de l'historique
export const removeOrderFromHistory = (orderId, technicianName) => {
  const existingOrders = getOrdersFromLocalStorage(technicianName);
  const updatedOrders = existingOrders.filter(order => order.id !== orderId);
  saveOrdersToLocalStorage(updatedOrders, technicianName);
};