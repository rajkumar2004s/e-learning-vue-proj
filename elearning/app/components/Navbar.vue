<template>
  <nav class="bg-[#080b0f] text-white fixed w-full z-50 shadow-md p-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center">
          <i class="fa-solid fa-bars-progress text-[#2f76e8] text-3xl mr-2"></i>
          <NuxtLink to="/">
            <h1 class="text-white text-2xl font-bold font-sans">SKILLIFY</h1>
          </NuxtLink>
        </div>

        <div class="hidden md:flex space-x-4 font-semibold text-lg">
          <NuxtLink
            to="/"
            class="px-3 py-2 rounded-md"
            :class="isActive('/') ? 'bg-blue-700' : 'hover:bg-gray-700'"
          >
            Home
          </NuxtLink>

          <NuxtLink
            to="/myjourney"
            class="px-3 py-2 rounded-md"
            :class="
              isActive('/myjourney') ? 'bg-blue-700' : 'hover:bg-gray-700'
            "
          >
            My Journey
          </NuxtLink>

          <NuxtLink
            to="/courses"
            class="px-3 py-2 rounded-md"
            :class="isActive('/courses') ? 'bg-blue-700' : 'hover:bg-gray-700'"
          >
            All Courses
          </NuxtLink>

          <NuxtLink
            to="/professors"
            class="px-3 py-2 rounded-md"
            :class="
              isActive('/professors') ? 'bg-blue-700' : 'hover:bg-gray-700'
            "
          >
            Professors
          </NuxtLink>

          <NuxtLink
            to="/cart"
            class="px-3 py-2 rounded-md"
            :class="isActive('/cart') ? 'bg-blue-700' : 'hover:bg-gray-700'"
          >
            Cart
          </NuxtLink>

          <NuxtLink
            to="/wishlist"
            class="px-3 py-2 rounded-md"
            :class="isActive('/wishlist') ? 'bg-blue-700' : 'hover:bg-gray-700'"
          >
            Wishlist
          </NuxtLink>

          <NuxtLink
            to="/aboutus"
            class="px-3 py-2 rounded-md"
            :class="isActive('/aboutus') ? 'bg-blue-700' : 'hover:bg-gray-700'"
          >
            About Us
          </NuxtLink>

          <NuxtLink
            v-if="auth.user && auth.user.role === 'admin'"
            to="/admin"
            class="px-3 py-2 rounded-md"
            :class="isActive('/admin') ? 'bg-blue-700' : 'hover:bg-gray-700'"
          >
            Admin
          </NuxtLink>
        </div>

        <div class="hidden md:flex items-center gap-4">
          <img
            :src="'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'"
            alt="User Avatar"
            class="w-10 h-10 rounded-full"
          />
          <h1 v-if="auth.user && auth.user.name" class="font-bold">
            {{ auth.user.name.toUpperCase() }}
          </h1>
          <NuxtLink to="/login">
            <i class="fa-solid fa-right-from-bracket text-2xl"></i>
          </NuxtLink>
        </div>

        <div class="md:hidden">
          <button @click="isOpen = !isOpen" class="focus:outline-none">
            <i v-if="!isOpen" class="fa-solid fa-bars text-2xl text-white"></i>
            <i v-else class="fa-solid fa-xmark text-2xl text-white"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isOpen" class="md:hidden bg-[#080b0f] px-4 pb-4 space-y-2">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="block px-3 py-2 rounded-md"
        :class="isActive(link.path) ? 'bg-blue-700' : 'hover:bg-gray-700'"
        @click="isOpen = false"
      >
        {{ link.label }}
      </NuxtLink>

      <NuxtLink
        v-if="auth.user && auth.user.role === 'admin'"
        to="/admin"
        class="block px-3 py-2 rounded-md"
        :class="isActive('/admin') ? 'bg-blue-700' : 'hover:bg-gray-700'"
        @click="isOpen = false"
      >
        Admin
      </NuxtLink>

      <div class="flex items-center gap-3 mt-3">
        <img
          :src="'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'"
          alt="User Avatar"
          class="w-10 h-10 rounded-full"
        />
        <div v-if="user" class="flex flex-col">
          <h1 class="text-white font-bold">
            {{ (user.displayName || user.name)?.split(" ")[0] }}
          </h1>
          <!-- <p class="text-gray-400 text-sm truncate">
            {{ user.displayName }}@gmail.com
          </p> -->
        </div>
        <NuxtLink to="/login" @click="isOpen = false">
          <i class="fa-solid fa-right-from-bracket text-2xl"></i>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { ref, computed } from "vue";
import { useAuth } from "../composables/useAuth";

const auth = useAuthStore();
const route = useRoute();
const isOpen = ref(false);
const isActive = (path: string) => route.path === path;

const { user: firebaseUser } = useAuth();

const user = computed(() => ({
  ...auth.user,
  displayName: firebaseUser.value?.displayName,
  photoURL: firebaseUser.value?.photoURL,
}));

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/myjourney", label: "My Journey" },
  { path: "/courses", label: "All Courses" },
  { path: "/professors", label: "Professors" },
  { path: "/cart", label: "Cart" },
  { path: "/wishlist", label: "Wishlist" },
  { path: "/aboutus", label: "About Us" },
];
</script>
