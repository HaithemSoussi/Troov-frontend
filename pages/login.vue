<template>
  <div class="container mt-5">
    <p class="h3">Connexion</p>
    <form @submit.prevent="loginUser">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
    <p class="mt-3">
      Pas encore de compte ?
      <nuxt-link to="/register">Inscrivez-vous ici</nuxt-link>.
    </p>
  </div>
</template>

<script setup>
/**
 * @name Login.vue
 * @type {Component}
 * @description Login component
 * 
 * @module Login
 * @param {Ref} email - Email
 * @param {Ref} password - Password
 * @param {Object} config - Runtime config
 * @param {Function} router - Router
 * @param {Function} authStore - Auth store
 * @param {Function} loginUser - Login user function
 * @returns {Function} loginUser - Login user function
 */
import { ref } from "vue";
import { useRuntimeConfig } from "#imports";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

const email = ref("");
const password = ref("");
const config = useRuntimeConfig();
const router = useRouter();
const authStore = useAuthStore();

const loginUser = async () => {
  try {
    const { data } = await axios.post(`${config.public.apiBase}/users/login`, {
      email: email.value,
      password: password.value,
    });
    authStore.login(data.token);
    router.push("/");
  } catch (error) {
    console.error("Erreur de connexion :", error);
    alert("Erreur : Veuillez vérifier vos identifiants.");
  }
};
</script>
