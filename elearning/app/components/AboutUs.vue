<script lang="ts" setup>
const instructors = [
  {
    id: 1,
    name: "Rajkumar",
    role: "Frontend Developer",
    image:
      "https://res.cloudinary.com/dwdekki8t/image/upload/v1754388184/IMG_20250804_201911_geyhzn.jpg",
  },
  {
    id: 2,
    name: "Rudhraksh",
    role: "Data Scientist",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 3,
    name: "Jabeer",
    role: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 3,
    name: "Nikhil",
    role: "Backend Developer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];
</script>
<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-4xl font-bold mb-10 text-center">Our Team</h2>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="instructor in instructors"
          :key="instructor.id"
          class="bg-white rounded-xl shadow-md p-6 text-center hover:scale-105 transition"
        >
          <img
            :src="instructor.image"
            alt="Instructor"
            class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 class="font-semibold">{{ instructor.name }}</h3>
          <p class="text-gray-500 text-sm">{{ instructor.role }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
