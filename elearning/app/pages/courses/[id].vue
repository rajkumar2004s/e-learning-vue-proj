<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Course Details</h1>

    <div v-if="course" class="bg-white p-6 rounded shadow">
      <h2 class="text-xl font-semibold">{{ course.title }}</h2>
      <p class="mt-2 text-gray-600">{{ course.description }}</p>
      <p class="mt-4 text-sm text-gray-400">Course ID: {{ course.id }}</p>
    </div>

    <div v-else class="text-red-500">Course not found</div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

// Get the current route (extract dynamic :id param)
const route = useRoute();
const courseId = Number(route.params.id);

// Mock data for now (replace with API call later)
const courses = [
  {
    id: 1,
    title: "JavaScript Basics",
    description: "Learn the fundamentals of JS.",
  },
  {
    id: 2,
    title: "Vue 3 Mastery",
    description: "Deep dive into Vue 3 features.",
  },
  {
    id: 3,
    title: "Nuxt 3 Crash Course",
    description: "Build full-stack apps with Nuxt.",
  },
];

// Find the course by ID
const course = courses.find((c) => c.id === courseId);
</script>
