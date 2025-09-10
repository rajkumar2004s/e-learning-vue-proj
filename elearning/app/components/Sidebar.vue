<template>
  <div class="h-screen w-64 bg-[#080b0f] flex flex-col justify-between py-12">
    <div>
      <!-- Logo -->
      <div class="pl-6">
        <h1 class="font-bold text-3xl text-white font-sans">Skillify</h1>
      </div>

      <!-- Navigation -->
      <div class="text-white pt-8 pl-4 flex flex-col text-lg font-semibold">
        <NuxtLink
          to="/"
          class="px-4 py-2 rounded-md"
          :class="isActive('/') ? 'bg-purple-700' : 'hover:bg-gray-700'"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/myjourney"
          class="px-4 py-2 rounded-md"
          :class="
            isActive('/myjourney') ? 'bg-purple-700' : 'hover:bg-gray-700'
          "
        >
          My Journey
        </NuxtLink>

        <NuxtLink
          to="/courses"
          class="px-4 py-2 rounded-md"
          :class="isActive('/courses') ? 'bg-purple-700' : 'hover:bg-gray-700'"
        >
          All Courses
        </NuxtLink>

        <NuxtLink
          to="/professors"
          class="px-4 py-2 rounded-md"
          :class="
            isActive('/professors') ? 'bg-purple-700' : 'hover:bg-gray-700'
          "
        >
          Professors
        </NuxtLink>

        <NuxtLink
          to="/aboutus"
          class="px-4 py-2 rounded-md"
          :class="isActive('/aboutus') ? 'bg-purple-700' : 'hover:bg-gray-700'"
        >
          About Us
        </NuxtLink>

        <NuxtLink
          to="/admin"
          class="px-4 py-2 rounded-md"
          :class="isActive('/admin') ? 'bg-purple-700' : 'hover:bg-gray-700'"
        >
          Admin
        </NuxtLink>
      </div>
    </div>

    <!-- Profile -->
    <h1 class="text-white pl-8 text-xl font-bold">Profile</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

// function to check if route is active
const isActive = (path: string) => route.path === path;
</script>
