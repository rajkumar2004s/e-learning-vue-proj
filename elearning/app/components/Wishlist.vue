<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">My Wishlist ❤️</h1>

    <div v-if="wishlistStore.wishlist.length === 0" class="text-gray-500">
      No courses in wishlist yet.
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="course in wishlistStore.wishlist"
        :key="course.id"
        class="border p-4 rounded-xl shadow"
      >
        <img
          :src="course.imgUrl"
          class="h-32 w-full object-cover rounded-md mb-2"
        />
        <h3 class="font-semibold">{{ course.title }}</h3>
        <p class="text-sm text-gray-600">{{ course.professor }}</p>
        <p class="font-bold mt-2">${{ course.price }}</p>
        <button
          @click="wishlistStore.removeFromWishlist(course.id)"
          class="mt-2 bg-red-500 text-white px-3 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWishlistStore } from "@/stores/wishlist";

const wishlistStore = useWishlistStore();
wishlistStore.loadWishlist();
</script>
