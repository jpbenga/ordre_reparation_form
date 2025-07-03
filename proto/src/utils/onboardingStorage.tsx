import React from 'react';
// Fonction pour vérifier si l'utilisateur a déjà vu l'onboarding
export const hasSeenOnboarding = (technicianName: string): boolean => {
  const data = localStorage.getItem('onboardingStatus');
  if (!data) {
    return false;
  }
  try {
    const parsedData = JSON.parse(data);
    return parsedData[technicianName] === true;
  } catch (error) {
    return false;
  }
};
// Fonction pour marquer l'onboarding comme vu
export const markOnboardingAsSeen = (technicianName: string): void => {
  let data = {};
  try {
    const existingData = localStorage.getItem('onboardingStatus');
    if (existingData) {
      data = JSON.parse(existingData);
    }
  } catch (error) {
    // Si erreur, on repart avec un objet vide
  }
  data[technicianName] = true;
  localStorage.setItem('onboardingStatus', JSON.stringify(data));
};
// Fonction pour réinitialiser le statut d'onboarding (pour revoir le guide)
export const resetOnboardingStatus = (technicianName: string): void => {
  let data = {};
  try {
    const existingData = localStorage.getItem('onboardingStatus');
    if (existingData) {
      data = JSON.parse(existingData);
    }
  } catch (error) {
    // Si erreur, on repart avec un objet vide
  }
  data[technicianName] = false;
  localStorage.setItem('onboardingStatus', JSON.stringify(data));
};