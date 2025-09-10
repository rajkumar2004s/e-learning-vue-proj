<script setup>
definePageMeta({
  requiresAuth: true,
  requiresAdmin: true,
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Admin Dashboard</h1>
    <p>Only admins can see this page.</p>
  </div>
</template>
