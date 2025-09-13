<template>
  <div class="bg-gray-50 min-h-screen pl-64">
    <div v-if="!course" class="text-gray-500 text-center text-lg py-12">
      Loading course...
    </div>

    <div v-else class="bg-white min-h-screen flex flex-col">
      <!-- Course Header Image (Hero style) -->
      <div class="w-full">
        <img
          :src="course.imgUrl"
          :alt="course.title"
          class="h-[200px] w-[30%] object-cover m-6 rounded"
        />

        <h1 class="text-3xl pl-8 font-extrabold text-black drop-shadow-xl">
          {{ course.title }}
        </h1>
      </div>

      <!-- Course Content -->
      <div class="flex-1 p-6 pl-8 max-w-7xl mx-auto w-full">
        <!-- Top Section -->
        <div class="flex items-start justify-between mb-6">
          <div>
            <p class="text-gray-600 text-lg mb-2">
              Taught by
              <span class="font-semibold">{{ course.professor }}</span>
            </p>
            <!-- Rating -->
            <div class="flex items-center gap-2">
              <span class="font-semibold text-lg">{{ course.rating }}</span>
              <span class="text-yellow-500">⭐</span>
              <span class="text-sm text-gray-600"
                >({{ course.reviews }} reviews)</span
              >
            </div>
          </div>
          <!-- Wishlist -->
          <button
            @click="toggleWish"
            class="bg-gray-100 p-4 rounded-full hover:bg-gray-200 transition"
          >
            <i
              v-if="wishlistStore.isInWishlist(course.id)"
              class="fa-solid fa-heart text-red-500 text-2xl"
            ></i>
            <i v-else class="fa-regular fa-heart text-gray-500 text-2xl"></i>
          </button>
        </div>

        <!-- Price Section -->
        <div class="flex items-center gap-4 mt-2">
          <span class="text-4xl font-bold text-gray-900"
            >${{ course.price }}</span
          >
          <span
            v-if="course.mrp"
            class="text-xl text-gray-500 line-through font-medium"
          >
            ${{ course.mrp }}
          </span>
        </div>

        <!-- Actions -->
        <div class="mt-10 flex flex-wrap gap-5">
          <NuxtLink
            v-if="!courseStore.isEnrolled(course.id)"
            :to="`/payments/${course.id}`"
            @click.prevent="goToPayment"
            class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition shadow-lg"
          >
            Enroll Now
          </NuxtLink>
          <button
            v-else
            class="bg-green-600 text-white px-10 py-4 rounded-xl text-lg font-semibold cursor-not-allowed"
            disabled
          >
            Enrolled
          </button>

          <button
            v-if="!cartStore.isInCart(course.id)"
            @click="cartStore.addToCart(course)"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-4 rounded-xl text-lg font-semibold transition shadow-lg"
          >
            Add to Cart
          </button>
          <button
            v-else
            @click="cartStore.removeFromCart(course.id)"
            class="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-xl text-lg font-semibold transition shadow-lg"
          >
            Remove from Cart
          </button>

          <NuxtLink to="/courses">
            <button
              class="px-10 py-4 rounded-xl bg-gray-600 hover:bg-gray-700 text-white text-lg font-semibold transition shadow-lg"
            >
              Back to Courses
            </button>
          </NuxtLink>
        </div>

        <!-- Divider -->
        <hr class="my-12 border-gray-300" />

        <!-- Description -->
        <div>
          <h2 class="text-3xl font-bold mb-6 text-gray-900">
            About this course
          </h2>
          <p class="text-gray-700 leading-relaxed text-lg mb-4">
            {{ course.description }}
          </p>
          <h1 class="text-2xl font-bold mb-4">Concepts you will learn</h1>
          <p class="text-gray-600 leading-relaxed text-base">
            {{ course.details }}
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
