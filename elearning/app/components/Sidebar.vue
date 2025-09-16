<template>
  <div
    class="h-screen w-64 bg-[#080b0f] flex flex-col justify-between pt-12 fixed"
  >
    <div>
      <div class="pl-6 flex">
        <i class="fa-solid fa-bars-progress text-[#2f76e8] text-4xl mr-2"></i>
        <NuxtLink to="/">
          <h1 class="text-white text-3xl font-bold font-sans title">
            SKILLIFY
          </h1>
        </NuxtLink>
      </div>

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
          to="/aboutus"
          class="px-4 py-2 m-1 mr-2 rounded-md"
          :class="isActive('/aboutus') ? 'bg-blue-700' : 'hover:bg-gray-700'"
        >
          About Us
        </NuxtLink>
        <NuxtLink
          to="/chatbot"
          class="px-4 py-2 m-1 mr-2 rounded-md"
          :class="isActive('/chatbot') ? 'bg-blue-700' : 'hover:bg-gray-700'"
        >
          Assistant
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
    <hr class="text-gray-500" />
    <div class="flex p-4 gap-4">
      <div class="flex items-center gap-4 w-full">
        <img
          :src="
            user.photoURL ||
            'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'
          "
          alt="User Avatar"
          class="w-12 h-12 rounded-full object-cover"
        />
        <div v-if="user" class="flex flex-col">
          <h1 class="text-white font-bold">
            {{ (user.displayName || user.name)?.split(" ")[0] }}
          </h1>
          <!-- <p class="text-gray-400 text-sm truncate">
            {{ user.displayName }}@gmail.com
          </p> -->
        </div>
      </div>
      <NuxtLink :to="'/login'">
        <i
          class="fa-solid fa-right-from-bracket text-2xl ml-12 text-white pt-3"
        ></i>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useAuth } from "../composables/useAuth";

const route = useRoute();
const isActive = (path: string) => route.path === path;

const auth = useAuthStore();
const { user: firebaseUser } = useAuth();

const user = computed(() => ({
  ...auth.user,
  displayName: firebaseUser.value?.displayName,
  photoURL: firebaseUser.value?.photoURL,
}));

// Sidebar open state (safe default for SSR)
const sidebarOpen = ref(true);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebarOnMobile = () => {
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    sidebarOpen.value = false;
  }
};

const handleResize = () => {
  if (typeof window !== "undefined") {
    sidebarOpen.value = window.innerWidth >= 768;
  }
};

onMounted(() => {
  // Initialize after mount
  sidebarOpen.value = window.innerWidth >= 768;
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
