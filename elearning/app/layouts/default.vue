<template>
  <div class="flex min-h-screen">
    <div class="hidden lg:block">
      <Sidebar v-if="showSidebar" />
    </div>

    <div class="w-full lg:hidden">
      <Navbar />
    </div>

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
