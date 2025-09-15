<template>
  <div class="flex min-h-screen">
    <!-- Sidebar (desktop only) -->
    <div class="hidden lg:block">
      <Sidebar v-if="showSidebar" />
    </div>

    <!-- Navbar (mobile only) -->
    <div class="w-full lg:hidden">
      <Navbar />
    </div>

    <!-- Page Content -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const showSidebar = computed(() => route.path !== "/login");
</script>
