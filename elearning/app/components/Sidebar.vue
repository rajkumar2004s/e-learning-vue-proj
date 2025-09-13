<template>
  <div
    class="h-screen w-64 bg-[#080b0f] flex flex-col justify-between pt-12 fixed"
  >
    <div>
      <!-- Logo -->
      <div class="pl-6 flex">
        <i class="fa-solid fa-bars-progress text-[#2f76e8] text-4xl mr-2"></i>
        <NuxtLink to="/">
          <h1 class="text-white text-3xl font-bold font-sans title">
            SKILLIFY
          </h1>
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <div class="text-white pt-8 pl-4 flex flex-col text-lg font-semibold">
        <NuxtLink
          to="/"
          class="px-4 m-1 py-2 mr-2 rounded-md"
          :class="isActive('/') ? 'bg-blue-700' : 'hover:bg-gray-700'"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/myjourney"
          class="px-4 m-1 mr-2 py-2 rounded-md"
          :class="isActive('/myjourney') ? 'bg-blue-700' : 'hover:bg-gray-700'"
        >
          My Journey
        </NuxtLink>

        <NuxtLink
          to="/courses"
          class="px-4 m-1 mr-2 py-2 rounded-md"
          :class="isActive('/courses') ? 'bg-blue-700' : 'hover:bg-gray-700'"
        >
          All Courses
        </NuxtLink>

        <NuxtLink
          to="/professors"
          class="px-4 py-2 m-1 mr-2 rounded-md"
          :class="isActive('/professors') ? 'bg-blue-700' : 'hover:bg-gray-700'"
        >
          Professors
        </NuxtLink>

        <!-- <NuxtLink
          to="/payments"
          class="px-4 py-2 m-1 mr-2 rounded-md"
          :class="isActive('/payments') ? 'bg-blue-700' : 'hover:bg-gray-700'"
        >
          Payments
        </NuxtLink> -->

        <NuxtLink
          to="/cart"
          class="px-4 py-2 m-1 mr-2 rounded-md"
          :class="isActive('/cart') ? 'bg-blue-700' : 'hover:bg-gray-700'"
        >
          Cart
        </NuxtLink>

        <NuxtLink
          to="/wishlist"
          class="px-4 py-2 m-1 mr-2 rounded-md"
          :class="isActive('/wishlist') ? 'bg-blue-700' : 'hover:bg-gray-700'"
        >
          Wishlist
        </NuxtLink>
        <NuxtLink
          v-if="auth.user && auth.user.role === 'admin'"
          to="/admin"
          class="px-4 py-2 m-1 mr-2 rounded-md"
          :class="isActive('/admin') ? 'bg-blue-700' : 'hover:bg-gray-700'"
        >
          Admin
        </NuxtLink>
      </div>
    </div>
    <!-- <p>v-if="auth.user && auth.user.role === 'admin'"</p> -->
    <hr class="text-gray-500" />
    <div class="flex p-4 gap-4">
      <img
        :src="'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'"
        alt="User Avatar"
        class="w-12 h-12 rounded-full"
      />
      <h1 v-if="auth.user" class="text-white font-bold pr-2 pt-3">
        {{ auth.user.name.toUpperCase() }}
      </h1>
      <NuxtLink :to="'/login'">
        <i
          class="fa-solid fa-right-from-bracket text-2xl ml-12 text-white pt-3"
        ></i
      ></NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
const route = useRoute();

const isActive = (path: string) => route.path === path;
</script>
