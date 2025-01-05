<template>
  <div class="container mt-5">
    <p class="h3">Inscription</p>
    <form @submit.prevent="registerUser">
      <div class="mb-3">
        <label for="name" class="form-label">Nom</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="name"
          required
        />
      </div>
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
      <button type="submit" class="btn btn-primary">S'inscrire</button>
    </form>
    <p class="mt-3">
      Vous avez déjà un compte ?
      <nuxt-link to="/login">Connectez-vous ici</nuxt-link>.
    </p>
  </div>
</template>

<script setup>
/**
 * @name Register.vue
 * @type {Component}
 * @description Register component
 * 
 * @module Register
 * @param {Function} registerUser - Register user function
 * @param {Ref} name - Name
 * @param {Ref} email - Email
 * @param {Ref} password - Password
 * @param {Object} config - Runtime config
 * @param {Function} router - Router
 * @returns {Function} registerUser - Register user function
 */
import { ref } from "vue";
import { useRuntimeConfig } from "#imports";
import axios from "axios";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const config = useRuntimeConfig();
const router = useRouter();

const registerUser = async () => {
  try {
    await axios.post(`${config.public.apiBase}/users/register`, {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    alert("Inscription réussie !");
    router.push("/login");
  } catch (error) {
    console.error("Erreur d'inscription :", error);
    alert("Erreur : Veuillez vérifier vos informations.");
  }
};
</script>
