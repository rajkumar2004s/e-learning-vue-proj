<template>
  <div class="flex min-h-screen">
    <Sidebar v-if="showSidebar" />
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
const route = useRoute();

// hide sidebar on exact login route '/' or '/login' depending where your login is
const showSidebar = computed(() => route.path !== "/login");
</script>
