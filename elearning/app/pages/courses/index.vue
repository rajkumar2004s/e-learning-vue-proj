<template>
  <div class="min-h-screen bg-white text-gray-900 ml-80">
    <!-- Fixed Header with Toggle Button for mobile -->
    <header class="sticky top-0 z-50 bg-white shadow-sm md:hidden">
      <div class="flex items-center justify-between px-6 py-4">
        <h1 class="text-xl font-bold">Courses</h1>
        <button @click="isNavOpen = !isNavOpen" class="focus:outline-none">
          <svg
            v-if="!isNavOpen"
            class="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
          <svg
            v-else
            class="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </header>

    <!-- Animated Side Navigation for mobile -->
    <div
      :class="{ 'translate-x-0': isNavOpen, '-translate-x-full': !isNavOpen }"
      class="fixed inset-y-0 left-0 w-64 px-6 py-8 transform transition-transform duration-300 ease-in-out bg-gray-50 border-r md:static md:w-auto md:translate-x-0 md:border-b md:flex-grow md:flex md:flex-col md:py-8 z-40"
    >
      <div class="max-w-6xl mx-auto text-center md:flex-grow md:w-full">
        <h1 class="hidden md:block text-3xl font-bold mb-6">All Courses</h1>
        <div
          class="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <div
            class="flex items-center border rounded-md shadow-sm w-full md:w-2/3"
          >
            <input
              v-model="search"
              type="text"
              placeholder="Search for anything"
              class="flex-1 px-4 py-2 rounded-l-md focus:outline-none"
            />
            <button class="px-6 py-2 bg-gray-800 text-white rounded-r-md">
              Search
            </button>
          </div>
          <select
            v-model="selectedCategory"
            class="px-4 py-2 border rounded-md w-full md:w-auto"
          >
            <option value="">All Categories</option>
            <option v-for="filter in filters" :key="filter" :value="filter">
              {{ filter }}
            </option>
          </select>
        </div>
      </div>
      <button
        @click="isNavOpen = false"
        class="md:hidden mt-8 px-4 py-2 text-sm text-gray-600"
      >
        Close Menu
      </button>
    </div>

    <!-- Background overlay when menu is open on mobile -->
    <div
      v-if="isNavOpen"
      @click="isNavOpen = false"
      class="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
    ></div>

    <!-- Category Filters and Sorting -->
    <section class="px-6 py-4 border-b">
      <div class="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
        <button
          v-for="filter in filters"
          :key="filter"
          class="px-4 py-2 text-sm rounded-full border hover:bg-gray-100 transition"
          :class="{ 'bg-gray-800 text-white': activeFilters.includes(filter) }"
          @click="toggleFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>
    </section>

    <section class="px-6 py-3 border-b bg-white">
      <div class="max-w-6xl mx-auto flex justify-end">
        <select v-model="sortBy" class="px-3 py-2 border rounded-md text-sm">
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>
      </div>
    </section>

    <!-- Courses Grid -->
    <section class="px-6 py-10">
      <div
        class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <NuxtLink
          v-for="course in sortedCourses"
          :key="course.id"
          :to="`/course/${course.id}`"
          class="relative group border rounded-md shadow-sm hover:shadow-md transition bg-white flex flex-col overflow-hidden"
          style="min-height: 280px"
        >
          <img
            :src="course.image"
            :alt="course.title"
            class="w-full h-40 object-cover rounded-t-md"
          />
          <div class="p-4 flex flex-col flex-1">
            <h3 class="font-semibold text-base mb-1 line-clamp-2">
              {{ course.title }}
            </h3>
            <p class="text-sm text-gray-600 mb-1">{{ course.instructor }}</p>
            <div class="flex items-center gap-2 text-sm mb-2">
              <span class="font-semibold">{{ course.rating }}</span>
              <span class="text-yellow-500">⭐</span>
              <span class="text-gray-500"
                >({{ course.enrollments }} learners)</span
              >
            </div>
            <p class="text-sm text-gray-700 line-clamp-3 flex-1">
              {{ course.description }}
            </p>
            <div class="mt-3">
              <span class="font-bold text-gray-900 mr-2">{{
                course.price
              }}</span>
              <span
                v-if="course.originalPrice"
                class="text-sm text-gray-500 line-through"
                >{{ course.originalPrice }}</span
              >
            </div>
          </div>

          <!-- Hover Preview Panel -->
          <div
            class="absolute inset-0 bg-white border rounded-md shadow-xl p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 z-50 flex flex-col justify-center items-center text-center"
          >
            <h3 class="font-semibold text-lg mb-2">{{ course.title }}</h3>
            <p class="text-sm text-gray-600 mb-2">By {{ course.instructor }}</p>
            <div class="flex items-center gap-2 text-sm mb-2">
              <span class="font-semibold">{{ course.rating }}</span>
              <span class="text-yellow-500">⭐</span>
              <span class="text-gray-500"
                >({{ course.enrollments }} learners)</span
              >
            </div>
            <p class="text-sm text-gray-700 mb-3 overflow-y-auto max-h-24">
              {{ course.description }}
            </p>
            <button
              class="w-full py-2 mb-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add to Cart
            </button>
            <button class="w-full py-2 border rounded-md hover:bg-gray-100">
              Add to Wishlist
            </button>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Recommendations -->
    <section class="px-6 py-12 bg-gray-50 border-t">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold mb-6">Recommended for you</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="rec in recommendations"
            :key="rec.id"
            class="border rounded-md p-4 hover:shadow-md transition bg-white"
          >
            <h3 class="font-semibold mb-2">{{ rec.title }}</h3>
            <p class="text-sm text-gray-600">{{ rec.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="px-6 py-8 text-center border-t text-sm text-gray-500">
      © 2025 Your Learning Platform. Built for explorers.
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { NuxtLink } from "#components";

const search = ref("");
const selectedCategory = ref("");
const activeFilters = ref([]);
const sortBy = ref("popular");
const isNavOpen = ref(false); // New state variable

const filters = [
  "Development",
  "Business",
  "Design",
  "Marketing",
  "IT & Software",
  "Personal Development",
  "Photography",
];

const courses = ref([
  {
    id: 1,
    title: "Mastering Vue 3",
    category: "Development",
    instructor: "Jane Doe",
    rating: 4.8,
    enrollments: 12000,
    description: "Build modern apps with Vue 3 and Composition API.",
    image: "https://placehold.co/600x400?text=Vue+3",
    price: "$14.99",
    originalPrice: "$79.99",
  },
  {
    id: 2,
    title: "AI for Creators",
    category: "IT & Software",
    instructor: "John Smith",
    rating: 4.7,
    enrollments: 8500,
    description: "Leverage AI tools to boost your creative workflow.",
    image: "https://placehold.co/600x400?text=AI+Course",
    price: "$19.99",
    originalPrice: "$89.99",
  },
  {
    id: 3,
    title: "Full-Stack Web Development",
    category: "Development",
    instructor: "Emily Chen",
    rating: 4.9,
    enrollments: 22000,
    description: "Learn front-end, back-end, and database skills.",
    image: "https://placehold.co/600x400?text=Full+Stack",
    price: "$24.99",
    originalPrice: "$99.99",
  },
  {
    id: 4,
    title: "Graphic Design Essentials",
    category: "Design",
    instructor: "Alex Johnson",
    rating: 4.6,
    enrollments: 6500,
    description: "Fundamentals of design, typography, and visual storytelling.",
    image: "https://placehold.co/600x400?text=Design",
    price: "$12.99",
    originalPrice: "$69.99",
  },
  {
    id: 5,
    title: "Marketing Strategy",
    category: "Marketing",
    instructor: "Michael Brown",
    rating: 4.5,
    enrollments: 5000,
    description: "Learn to build a robust digital marketing plan.",
    image: "https://placehold.co/600x400?text=Marketing",
    price: "$15.99",
    originalPrice: "$79.99",
  },
  {
    id: 6,
    title: "Photography Fundamentals",
    category: "Photography",
    instructor: "Sarah Miller",
    rating: 4.8,
    enrollments: 9500,
    description: "Capture stunning images and master your camera.",
    image: "https://placehold.co/600x400?text=Photography",
    price: "$11.99",
    originalPrice: "$59.99",
  },
]);

const recommendations = ref([
  {
    id: 1,
    title: "Because you liked Vue 3...",
    detail: "Try Advanced Component Patterns.",
  },
  {
    id: 2,
    title: "Hot in your region",
    detail: "AI & Data Science are trending.",
  },
  { id: 3, title: "Career Ready", detail: "Explore certification bundles." },
]);

const filteredCourses = computed(() => {
  return courses.value.filter((c) => {
    const matchesSearch = c.title
      .toLowerCase()
      .includes(search.value.toLowerCase());

    // Check if the course category is in the activeFilters array
    const matchesCategory =
      activeFilters.value.length === 0 ||
      activeFilters.value.includes(c.category);

    return matchesSearch && matchesCategory;
  });
});

const sortedCourses = computed(() => {
  let sorted = [...filteredCourses.value];
  switch (sortBy.value) {
    case "popular":
      sorted.sort((a, b) => b.enrollments - a.enrollments);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      sorted.sort((a, b) => b.id - a.id);
      break;
    case "priceLow":
      sorted.sort(
        (a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1))
      );
      break;
    case "priceHigh":
      sorted.sort(
        (a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1))
      );
      break;
    default:
      sorted.sort((a, b) => b.enrollments - a.enrollments);
      break;
  }
  return sorted;
});
const toggleFilter = (filter) => {
  const index = activeFilters.value.indexOf(filter);
  if (index > -1) {
    activeFilters.value.splice(index, 1);
  } else {
    activeFilters.value.push(filter);
  }
};
</script>
