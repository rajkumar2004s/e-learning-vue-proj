<template>
  <section class="py-20 bg-gray-500 rounded text-white text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Start Learning?
    </h2>
    <p class="mb-6 text-gray-200 max-w-xl mx-auto">
      Join thousands of learners and start your journey today.
    </p>
    <NuxtLink :to="'/courses'">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white px-12 py-3 rounded-lg font-medium shadow-lg transition-transform transform hover:-translate-y-1"
      >
        Explore Courses
      </button>
    </NuxtLink>
  </section>
</template>
<script setup lang="js">
//
</script>
