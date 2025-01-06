/**
 * Middleware d'authentification
 * 
 * Ce middleware permet de vérifier si l'utilisateur est authentifié avant d'accéder à une route protégée.
 * Si l'utilisateur n'est pas authentifié, il sera redirigé vers la page de connexion.
 * 
 */
// Importer les fonctions nécessaires
import { defineNuxtRouteMiddleware } from '#app';
import { useAuthStore } from '~/stores/auth';
import { navigateTo } from '#app';

// Définir le middleware d'authentification
export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore(); // Récupérer le store d'authentification
  
    // Vérifier si l'utilisateur est authentifié
    if (!authStore.isAuthenticated) {
      return navigateTo('/login'); // Rediriger vers la page de connexion
    }
  });
  