<template>
  <div class="min-h-screen bg-gray-50 p-8 pl-70">
    <div class="max-w-7xl mx-auto">
      <!-- Page Header -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
      >
        <h1 class="text-3xl font-bold">All Courses</h1>

        <!-- Search & Filter -->
        <div class="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <!-- Search -->
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search courses..."
            class="w-full md:w-64 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <!-- Fixed Filter Buttons -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="f in filters"
              :key="f"
              @click="activeFilter = f"
              :class="[
                'px-4 py-2 rounded-full border transition text-sm font-medium',
                activeFilter === f
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300',
              ]"
            >
              {{ f }}
            </button>
          </div>
        </div>
      </div>

      <!-- Course Grid -->
      <div
        v-if="filteredCourses.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <CourseCard
          v-for="course in filteredCourses"
          :key="course.id"
          :course="course"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 text-gray-500">
        <p class="text-lg">
          No courses found. Try adjusting your search or filters.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useCourseStore } from "@/stores/courses";

const courseStore = useCourseStore();

const searchQuery = ref("");
const filters = ["All", "Frontend", "Backend", "Editing"];
const activeFilter = ref("All");

// 🔎 Filter + Search
const filteredCourses = computed(() => {
  let list = [...courseStore.courses];

  // Apply filter
  if (activeFilter.value === "Frontend") {
    list = list.filter((c) =>
      ["html", "css", "javascript", "react", "vue"].some((kw) =>
        c.title.toLowerCase().includes(kw)
      )
    );
  } else if (activeFilter.value === "Backend") {
    list = list.filter((c) =>
      ["node", "express", "mongodb", "java", "c++", "python"].some((kw) =>
        c.title.toLowerCase().includes(kw)
      )
    );
  } else if (activeFilter.value === "Editing") {
    list = list.filter((c) =>
      ["video", "premiere", "after", "davinci", "final cut"].some((kw) =>
        c.title.toLowerCase().includes(kw)
      )
    );
  }

  // Apply search
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.professor.toLowerCase().includes(q)
    );
  }

  return list;
});

// Fetch courses on mount
onMounted(async () => {
  await courseStore.fetchCourses();
});
</script>
