<template>
  <div class="container mt-5">
    <h2>Ajouter un produit</h2>
    <form @submit.prevent="addProduct">
      <div class="mb-3">
        <label for="name" class="form-label">Nom de produit</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          v-model="description"
          class="form-control"
          id="description"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Prix</label>
        <input
          v-model="price"
          type="number"
          class="form-control"
          id="price"
          required
        />
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input
          v-model="image"
          type="text"
          class="form-control"
          id="image"
          required
        />
      </div>
      <div class="mb-3">
        <label for="countInStock" class="form-label">Quatité de produit</label>
        <input
          v-model="countInStock"
          type="number"
          class="form-control"
          id="countInStock"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
/**
 * @name Add.vue
 * @type {Component}
 * @description Add component
 * 
 * @module Add
 * @param {Function} addProduct - Add product function
 * @param {Ref} name - Name
 * @param {Ref} description - Description
 * @param {Ref} price - Price
 * @param {Ref} image - Image
 * @param {Ref} countInStock - Count in stock
 * @param {Object} config - Runtime config
 * @param {Function} router - Router
 * @param {Function} authStore - Auth store
 * @returns {Function} addProduct - Add product function
 */
import { ref } from "vue";
import { useRuntimeConfig } from "#imports";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
definePageMeta({
  middleware: 'auth', // Appliquer le middleware d'authentification
});

const name = ref("");
const description = ref("");
const price = ref(0);
const image = ref("");
const countInStock = ref(0);
const config = useRuntimeConfig();
const router = useRouter();
const authStore = useAuthStore();

const addProduct = async () => {
  try {
    authStore.checkAuth();

    await axios.post(
      `${config.public.apiBase}/users/products`,
      {
        name: name.value,
        price: price.value,
        description: description.value,
        image: image.value,
        countInStock: countInStock.value,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    );
    router.push("/");
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Erreur d'inscription : :",
        (error as any).response?.data || error.message,
      );
    } else {
      console.error("Erreur inconnue :", error);
    }
  }
};
</script>
