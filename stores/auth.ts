/**
 * Auth store
 * This store will manage the authentication state of the user
 * It will store the JWT token and authentication state
 * It will also have actions to login, logout and check authentication status
 * The authentication state will be persisted in localStorage
 * This store will be used in the layout component to show/hide login/logout links
 * This store will be used in the login page to login the user
 * This store will be used in the logout page to logout the user
 * This store will be used in the page components to check authentication status
 * This store will be used in the layout component to check authentication status
 * This store will be used in the layout component to show/hide login/logout links
 * This store will be used in the login page to login the user
 * This store will be used in the logout page to logout the user
 * @param {string} token - JWT token
 */
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    
  state: () => ({
    isAuthenticated: false,
    token: '', // JWT token will be stored here
  }),

  actions: {
    // Login action: Save token and set authentication state
    login(token: string) {
      this.token = token;
      this.isAuthenticated = true;
      localStorage.setItem("token", token); // Save token to localStorage
      localStorage.setItem("isAuthenticated", "true"); // Persist authentication state
    },

    // Logout action: Remove token and set authentication state
    logout() {
      this.token = '';
      this.isAuthenticated = false;
      localStorage.removeItem("token"); // Remove token from localStorage
      localStorage.removeItem("isAuthenticated"); // Remove authentication state
    },

    // Check authentication status on page load
    checkAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    },
  },
});
