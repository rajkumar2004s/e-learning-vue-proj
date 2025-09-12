<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div v-if="!course" class="text-gray-500">Loading course...</div>

    <div v-else class="bg-white rounded-2xl ml-60 shadow-lg overflow-hidden">
      <!-- Course Header -->
      <img
        :src="course.imgUrl"
        :alt="course.title"
        class="w-full h-72 object-cover"
      />

      <div class="p-6">
        <!-- Title + Wishlist -->
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">{{ course.title }}</h1>
            <p class="text-gray-600">By {{ course.professor }}</p>
          </div>
          <div>
            <button
              @click="toggleWish"
              class="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition"
            >
              <i
                v-if="wishlistStore.isInWishlist(course.id)"
                class="fa-solid fa-heart text-red-500 text-xl"
              ></i>
              <i v-else class="fa-regular fa-heart text-gray-500 text-xl"></i>
            </button>
          </div>
        </div>

        <!-- Rating -->
        <div class="flex items-center gap-2 mt-3">
          <span class="font-semibold">{{ course.rating }}</span>
          <span class="text-yellow-500">⭐</span>
          <span class="text-sm text-gray-600"
            >({{ course.reviews }} reviews)</span
          >
        </div>

        <!-- Price -->
        <div class="mt-4">
          <span class="text-2xl font-bold text-gray-900 mr-3"
            >${{ course.price }}</span
          >
          <span v-if="course.mrp" class="text-lg text-gray-500 line-through">
            ${{ course.mrp }}
          </span>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex gap-4">
          <NuxtLink
            v-if="!courseStore.isEnrolled(course.id)"
            :to="`/payments/${course.id}`"
            @click.prevent="goToPayment"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition"
          >
            Enroll Now
          </NuxtLink>
          <button
            v-else
            class="bg-green-600 text-white px-6 py-3 rounded-lg text-lg"
            disabled
          >
            Enrolled
          </button>

          <button
            v-if="!cartStore.isInCart(course.id)"
            @click="cartStore.addToCart(course)"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg transition"
          >
            Add to Cart
          </button>
          <button
            v-else
            @click="cartStore.removeFromCart(course.id)"
            class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg transition"
          >
            Remove from Cart
          </button>
          <NuxtLink to="/courses">
            <button class="ml-3 pt-3 p-3 px-6 rounded bg-gray-500 text-white">
              Back to courses
            </button>
          </NuxtLink>
        </div>

        <!-- Description -->
        <div class="mt-8">
          <h2 class="text-xl font-semibold mb-3">About this course</h2>
          <p class="text-gray-700 leading-relaxed">
            {{ course.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useCourseStore } from "@/stores/courses";
import { useWishlistStore } from "@/stores/wishlist";
import { useCartStore } from "@/stores/cart";
import { usePaymentStore } from "@/stores/payments";

const route = useRoute();
const courseStore = useCourseStore();
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const paymentStore = usePaymentStore();

const courseId = route.params.id as string;
const course = computed(() =>
  courseStore.courses.find((c) => c.id === courseId)
);

const goToPayment = () => {
  if (course.value) paymentStore.startPayment(course.value);
};

const toggleWish = () => {
  if (course.value) wishlistStore.toggleWishlist(course.value);
};
</script>
