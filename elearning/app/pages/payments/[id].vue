<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6"
  >
    <div
      class="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-3xl animate__animated animate__fadeInUp"
    >
      <div v-if="course" class="space-y-6">
        <!-- Course Summary -->
        <div class="flex items-center gap-6 mb-8">
          <img
            :src="course.imgUrl"
            alt=""
            class="w-40 h-28 object-cover rounded-xl shadow"
          />
          <div>
            <h2 class="text-2xl font-bold">{{ course.title }}</h2>
            <p class="text-gray-600">By {{ course.professor }}</p>
            <p class="mt-2 text-xl font-semibold text-blue-600">
              ${{ course.price }}
            </p>
          </div>
        </div>

        <!-- Payment Form -->
        <h3 class="text-xl font-semibold mb-4">Payment Details</h3>
        <form @submit.prevent="handlePay" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Card Holder Name"
              class="input"
              required
            />
            <input
              type="text"
              placeholder="Card Number"
              class="input"
              required
            />
          </div>
          <div class="grid grid-cols-3 gap-4">
            <input type="text" placeholder="MM/YY" class="input" required />
            <input type="text" placeholder="CVV" class="input" required />
            <select class="input">
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>UPI</option>
              <option>PayPal</option>
            </select>
          </div>
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transform transition text-white py-3 rounded-xl font-semibold text-lg shadow-lg"
          >
            Pay ${{ course.price }}
          </button>
        </form>
      </div>

      <div v-else class="text-center text-gray-600">
        <p>Course not found. Please go back and try again.</p>
        <NuxtLink
          to="/courses"
          class="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Browse Courses
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useCourseStore } from "@/stores/courses";
import { usePaymentStore } from "@/stores/payments";
import { ref, onMounted } from "vue";

const courseStore = useCourseStore();
const paymentStore = usePaymentStore();
const route = useRoute();
const router = useRouter();
const course = ref();

onMounted(() => {
  // find course from payment store first
  if (paymentStore.currentPayment) {
    course.value = courseStore.courses.find(
      (c) => c.id === paymentStore.currentPayment?.courseId
    );
  }

  // fallback if accessed directly
  if (!course.value) {
    course.value = courseStore.courses.find((c) => c.id === route.params.id);
  }
});

const handlePay = () => {
  paymentStore.completePayment();
  router.push("/myjourney");
};
</script>

<style scoped></style>
