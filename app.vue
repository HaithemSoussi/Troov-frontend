<template>
  <div class="page-container d-flex flex-column">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <div class="content flex-grow-1">
      <router-view></router-view>
      <!-- Le contenu de chaque page -->
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
/**
 * @name App.vue
 * @type {Component}
 * @description App component
 * 
 * @module App
 * @returns {Component} Navbar - Navbar component
 */
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
authStore.checkAuth();
</script>

<style scoped>
body,
html {
  height: 100%;
  margin: 0;
}

.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex-grow: 1;
}

.footer {
  padding: 10px;
}
</style>
