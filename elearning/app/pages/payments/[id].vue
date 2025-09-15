<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center w-[100vw] pt-30 md:py-8 justify-center p-4 sm:p-6 md:pl-0 md:pl-20"
  >
    <div
      class="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 md:p-12 w-full max-w-5xl animate__animated animate__fadeInUp"
    >
      <div v-if="course" class="space-y-8">
        <!-- Course Summary -->
        <div
          class="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8 mb-10"
        >
          <!-- Thumbnail -->
          <img
            :src="course.imgUrl"
            alt=""
            class="w-full sm:w-64 h-40 sm:h-32 object-cover rounded-xl shadow"
          />

          <!-- Course Info -->
          <div class="flex-1 text-center text-left">
            <h2 class="text-2xl sm:text-3xl font-bold">{{ course.title }}</h2>
            <p class="text-gray-600 text-base sm:text-lg">
              By {{ course.professor }}
            </p>
            <p class="mt-3 text-xl sm:text-2xl font-semibold text-blue-600">
              ${{ course.price }}
            </p>
          </div>

          <!-- Payment Method Selector -->
          <div class="w-48">
            <label class="block text-gray-700 font-medium mb-2 text-sm">
              Payment Methods
            </label>
            <select
              v-model="selectedMethod"
              class="input w-full text-sm py-2 border-gray-500 border rounded-lg"
            >
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="upi">UPI</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
        </div>

        <!-- Payment Form -->
        <h3
          class="text-xl sm:text-2xl font-semibold mb-4 text-center lg:text-left"
        >
          Payment Details
        </h3>

        <form @submit.prevent="handlePay" class="space-y-6">
          <!-- Dynamic Inputs -->
          <div
            v-if="selectedMethod === 'credit' || selectedMethod === 'debit'"
            class="space-y-4"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Card Holder Name"
                class="input border border-gray-500 rounded-lg px-4 py-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Card Number"
                class="input border border-gray-500 rounded-lg px-4 py-2 w-full"
                required
              />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                class="input border border-gray-500 rounded-lg px-4 py-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="CVV"
                class="input border border-gray-500 rounded-lg px-4 py-2 w-full"
                required
              />
            </div>
          </div>

          <div v-else-if="selectedMethod === 'upi'" class="space-y-4">
            <input
              type="text"
              placeholder="Enter UPI ID (e.g. name@upi)"
              class="input border border-gray-300 rounded-lg px-4 py-2 w-full"
              required
            />
          </div>

          <div v-else-if="selectedMethod === 'paypal'" class="space-y-4">
            <input
              type="email"
              placeholder="PayPal Email"
              class="input border border-gray-300 rounded-lg px-4 py-2 w-full"
              required
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transform transition text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg flex justify-center items-center gap-3"
            :disabled="loading"
          >
            <span v-if="loading">
              <i class="fa-solid fa-spinner fa-spin"></i> Processing...
            </span>
            <span v-else> Pay ${{ course.price }} </span>
          </button>
        </form>
      </div>

      <!-- No Course Found -->
      <div v-else class="text-center text-gray-600">
        <p>Course not found. Please go back and try again.</p>
        <NuxtLink
          to="/courses"
          class="mt-6 inline-block px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
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
const loading = ref(false);
const selectedMethod = ref("credit"); // default

onMounted(() => {
  if (paymentStore.currentPayment) {
    course.value = courseStore.courses.find(
      (c) => c.id === paymentStore.currentPayment?.courseId
    );
  }

  if (!course.value) {
    course.value = courseStore.courses.find((c) => c.id === route.params.id);
  }
});

const handlePay = () => {
  loading.value = true;

  setTimeout(async () => {
    if (course.value) {
      await paymentStore.completePayment(course.value);
    }
    router.push("/myjourney");
  }, 3000);
};
</script>

<style scoped>
input {
  border: 1px solid #6b7280 !important;
}
</style>
