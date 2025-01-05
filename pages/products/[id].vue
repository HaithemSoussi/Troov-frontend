<template>
  <div class="container mt-5">
    <h2>Modifier le produit</h2>
    <form @submit.prevent="updateProduct">
      <div class="mb-3">
        <label for="name" class="form-label">Nom de produit</label>
        <input
          v-model="product.name"
          type="text"
          class="form-control"
          id="name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          v-model="product.description"
          class="form-control"
          id="description"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Prix</label>
        <input
          v-model="product.price"
          type="number"
          class="form-control"
          id="price"
          required
        />
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input
          v-model="product.image"
          type="text"
          class="form-control"
          id="image"
          required
        />
      </div>
      <div class="mb-3">
        <label for="countInStock" class="form-label">Quantité en stock</label>
        <input
          v-model="product.countInStock"
          type="number"
          class="form-control"
          id="countInStock"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Mettre à jour</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
/**
 * @name Update.vue
 * @type {Component}
 * @description Update component
 * 
 * @module Update
 * @param {Ref} product - Product
 * @param {Function} updateProduct - Update product function
 * @param {Object} config - Runtime config
 * @param {Object} router - Router
 * @param {Object} route - Route
 * @param {Function} authStore - Auth store
 * @returns {Function} updateProduct - Update product function
 * @returns {Function} product - Product
 */
import { ref, onMounted } from "vue";
import { useRuntimeConfig, useRouter, useRoute } from "#imports";
import axios from "axios";
import { useAuthStore } from "~/stores/auth";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  countInStock: number;
}

definePageMeta({
  middleware: 'auth', // Appliquer le middleware d'authentification
});

const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const product = ref<Product>({
  _id: "",
  name: "",
  price: 0,
  description: "",
  image: "",
  countInStock: 0,
});

const id = route.params.id;

onMounted(async () => {
  try {
    authStore.checkAuth();
    const { data } = await axios.get(
      `${config.public.apiBase}/users/products/${id}`,
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      },
    );
    product.value = data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Erreur lors du chargement du produit :",
        (error as any).response?.data || error.message,
      );
    } else {
      console.error("Erreur inconnue :", error);
    }
  }
});

const updateProduct = async () => {
  try {
    authStore.checkAuth();
    await axios.patch(
      `${config.public.apiBase}/users/products/${id}`,
      product.value,
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      },
    );
    alert("Produit mis à jour avec succès.");
    router.push("/");
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Erreur lors de la mise à jour du produit :",
        (error as any).response?.data || error.message,
      );
    } else {
      console.error("Erreur inconnue :", error);
    }
  }
};
</script>
