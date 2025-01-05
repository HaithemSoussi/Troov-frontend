<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div
        class="container container-fluid d-flex justify-content-between align-items-center"
      >
        <nuxt-link
          v-if="!authStore.isAuthenticated"
          to="/login"
          class="navbar-brand"
          >Connexion</nuxt-link
        >
        <nuxt-link
          v-if="!authStore.isAuthenticated"
          to="/register"
          class="navbar-brand"
          >Inscription</nuxt-link
        >
        <nuxt-link v-if="authStore.isAuthenticated" to="/" class="navbar-brand"
          >Accueil</nuxt-link
        >
        <div class="d-flex justify-content-center flex-grow-1">
          <nuxt-link
            v-if="authStore.isAuthenticated"
            to="/products/add"
            class="nav-link text-white"
            >Ajouter un produit</nuxt-link
          >
        </div>
        <button
          v-if="authStore.isAuthenticated"
          class="btn btn-danger ms-auto"
          @click="logout"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
/**
 * @name Navbar.vue
 * @type {Component}
 * @description Navbar component
 * 
 * @module Navbar
 * @param {Object} authStore - Auth store
 * @param {Function} logout - Logout function
 * @param {Function} $router - Router
 * @param {Function} $authStore - Auth store
 * @returns {Function} logout - Logout function
 */
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

authStore.checkAuth();
const logout = () => {
  localStorage.removeItem("token");
  authStore.logout();
  router.push("/login");
};
</script>
