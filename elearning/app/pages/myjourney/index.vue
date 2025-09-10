<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">My Journey</h1>

    <p class="text-gray-600 max-w-2xl">
      This page will show your personal learning journey, including completed
      courses, progress, and upcoming lessons.
    </p>

    <div class="mt-6 space-y-4">
      <div class="p-4 bg-white shadow rounded-md">
        <h2 class="text-xl font-semibold">Completed Courses</h2>
        <ul class="list-disc pl-6 mt-2 text-gray-600">
          <li>JavaScript Basics</li>
          <li>Vue 3 Mastery</li>
        </ul>
      </div>

      <div class="p-4 bg-white shadow rounded-md">
        <h2 class="text-xl font-semibold">In Progress</h2>
        <p class="text-gray-600">Nuxt 3 Crash Course (50% complete)</p>
      </div>

      <div class="p-4 bg-white shadow rounded-md">
        <h2 class="text-xl font-semibold">Upcoming</h2>
        <p class="text-gray-600">Advanced TypeScript Workshop</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Later, you can replace the static content with real data from your API.
</script>
