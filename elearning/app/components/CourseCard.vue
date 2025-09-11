<template>
  <div
    class="relative group border rounded-lg shadow hover:shadow-lg bg-white flex flex-col overflow-hidden transition"
  >
    <img
      :src="course.imgUrl"
      :alt="course.title"
      class="w-full h-40 object-cover"
    />

    <div class="p-4 flex flex-col flex-1">
      <h3 class="font-semibold text-lg mb-1 line-clamp-2">
        {{ course.title }}
      </h3>
      <p class="text-sm text-gray-600 mb-2">By {{ course.professor }}</p>

      <div class="flex items-center gap-1 text-sm mb-2">
        <span class="font-semibold">{{ course.rating }}</span>
        <span class="text-yellow-500">⭐</span>
      </div>

      <p class="text-sm text-gray-700 line-clamp-3 flex-1">
        {{ course.description }}
      </p>

      <div class="mt-3 flex items-center justify-between">
        <div>
          <span class="font-bold text-gray-900 mr-2">${{ course.price }}</span>
          <span v-if="course.mrp" class="text-sm text-gray-500 line-through">
            ${{ course.mrp }}
          </span>
        </div>

        <!-- Enroll button states -->
        <button
          v-if="!isLoading && !courseStore.isEnrolled(course.id)"
          @click="handleEnroll"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Enroll Now
        </button>

        <button
          v-else-if="isLoading"
          disabled
          class="bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          Loading...
        </button>

        <button
          v-else
          disabled
          class="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Enrolled
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCourseStore } from "@/stores/courses"; // ✅ match your store filename
import type { Course } from "../types/Course"; // ✅ import type from store

const props = defineProps<{ course: Course }>();
const courseStore = useCourseStore();
const isLoading = ref(false);

const handleEnroll = async () => {
  isLoading.value = true;
  setTimeout(async () => {
    await courseStore.enrollCourse(props.course);
    isLoading.value = false;
  }, 2000);
};
</script>
