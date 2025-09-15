<template>
  <div class="min-h-screen bg-gray-50 p-8 md:py-8 py-30 md:pl-70 w-[100vw]">
    <h1 class="text-3xl font-bold mb-6">🛒 My Cart</h1>

    <div v-if="!cartStore.cart.length" class="text-gray-600">
      Your cart is empty.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="course in cartStore.cart"
        :key="course.id"
        class="flex items-center justify-between bg-white p-4 rounded-lg shadow"
      >
        <div>
          <h2 class="font-semibold">{{ course.title }}</h2>
          <p class="text-gray-600">By {{ course.professor }}</p>
          <span class="font-bold text-blue-600">${{ course.price }}</span>
        </div>

        <div class="md:flex md:flex-row gap-3 flex flex-col">
          <button
            @click="cartStore.removeFromCart(course.id)"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Remove
          </button>
          <NuxtLink
            :to="`/payments/${course.id}`"
            @click.prevent="checkout(course)"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Checkout
          </NuxtLink>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="mt-6 bg-white p-4 rounded-lg shadow text-right">
        <p class="text-xl font-semibold">Total: ${{ total }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { usePaymentStore } from "@/stores/payments";
import type { Course } from "@/types/Course";

const cartStore = useCartStore();
const paymentStore = usePaymentStore();

const total = computed(() =>
  cartStore.cart.reduce((sum, c: Course) => sum + c.price, 0)
);

const checkout = (course: Course) => {
  paymentStore.startPayment(course);
};
</script>
