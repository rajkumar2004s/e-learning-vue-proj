<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div class="hidden lg:block">
      <Sidebar v-if="showSidebar" />
    </div>

    <!-- Mobile Navbar -->
    <div class="w-full lg:hidden">
      <Navbar />
    </div>

    <!-- Main Content -->
    <main class="flex-1 transition-all" :class="showSidebar ? 'lg:ml-64 ' : ''">
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
