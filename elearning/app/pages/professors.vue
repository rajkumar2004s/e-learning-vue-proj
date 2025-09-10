<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">Our Professors</h1>
    <p class="text-gray-600 mb-6">
      Meet the mentors and experts who guide your learning journey.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="professor in professors"
        :key="professor.id"
        class="bg-white p-6 shadow rounded-md"
      >
        <img
          :src="professor.image"
          alt="professor"
          class="h-24 w-24 rounded-full object-cover mb-4"
        />
        <h2 class="text-lg font-semibold">{{ professor.name }}</h2>
        <p class="text-gray-500">{{ professor.expertise }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const professors = [
  {
    id: 1,
    name: "Dr. John Doe",
    expertise: "Computer Science",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    expertise: "Data Science",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Prof. Michael Brown",
    expertise: "Web Development",
    image: "https://via.placeholder.com/100",
  },
];
</script>
