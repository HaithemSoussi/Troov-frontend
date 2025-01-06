<template>
  <div class="container mt-5">
    <div v-if="loading" class="text-center">
      <p>Chargement...</p>
    </div>
    <div v-else>
      <p class="h3">Liste de mes produits</p>
      <div v-if="products.length === 0" class="alert alert-info">
        Aucun produit trouvé.
      </div>
      <div v-else>
        <table class="table table-striped table-bordered">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Nom</th>
              <th scope="col">Description</th>
              <th scope="col">Prix</th>
              <th scope="col">Stock</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="product._id">
              <th scope="row">{{ index + 1 }}</th>
              <td><NuxtImg :src="product.image" height="80" /></td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price }} €</td>
              <td>{{ product.countInStock }}</td>
              <td>
                <!-- Update Button -->
                <button
                  class="btn btn-warning btn-sm me-2"
                  @click="updateProduct(product)"
                >
                  Modifier
                </button>
                <!-- Delete Button -->
                <button
                  class="btn btn-danger btn-sm"
                  @click="deleteProduct(`${product._id}`)"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * @name Index.vue
 * @type {Component}
 * @description Index component
 * 
 * @module Index
 * @param {Ref} products - Products
 * @param {Ref} loading - Loading
 * @param {Function} loadProducts - Load products function
 * @param {Function} deleteProduct - Delete product function
 * @param {Function} updateProduct - Update product function
 * @param {Object} config - Runtime config
 * @param {Object} router - Router
 * @param {Object} authStore - Auth store
 */
import { ref, onMounted } from "vue";
import { useRuntimeConfig, useRouter } from "#imports";
import axios from "axios";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  middleware: 'auth', // Appliquer le middleware d'authentification
});

const config = useRuntimeConfig();
const products = ref<Product[]>([]);
const loading = ref(true);
const router = useRouter();
const authStore = useAuthStore();

// Load products on mount
onMounted(async () => {
  await loadProducts();
});

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  countInStock: number;
}

const loadProducts = async () => {
  authStore.checkAuth();
  loading.value = true;
  try {
    const { data } = await axios.get(
      `${config.public.apiBase}/users/products`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    );

    products.value = data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Erreur lors du chargement des produits :",
        (error as any).response?.data || error.message,
      );
    } else {
      console.error("Erreur inconnue :", error);
    }
  } finally {
    loading.value = false;
  }
};

// Delete product
const deleteProduct = async (id: string) => {
  if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

  try {
    authStore.checkAuth();

    await axios.delete(`${config.public.apiBase}/users/products/${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    alert("Produit supprimé avec succès.");
    await loadProducts(); // Reload the product list
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Erreur lors de la suppression du produit :",
        (error as any).response?.data || error.message,
      );
    } else {
      console.error("Erreur inconnue :", error);
    }
    alert("Erreur lors de la suppression du produit.");
  }
};

// Update product
const updateProduct = (product: Product) => {
  // Redirect to an update page, passing the product ID as a query parameter
  router.push({
    path: `/users/products/${product._id}`,
  });
};
</script>
