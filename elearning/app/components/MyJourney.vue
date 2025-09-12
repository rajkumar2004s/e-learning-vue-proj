<template>
  <div class="ml-65 min-h-screen bg-gray-50 p-8">
    <h1 class="text-3xl font-bold mb-6">My Journey</h1>

    <!-- If no enrolled courses -->
    <div
      v-if="enrolledStore.enrolledCourses.length === 0"
      class="text-center py-20"
    >
      <h2 class="text-2xl font-semibold text-gray-600">
        No courses enrolled yet..
      </h2>
      <p class="text-gray-500 mt-2">
        Explore our courses and start learning today!
      </p>
      <NuxtLink to="/courses">
        <button
          class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Explore Courses
        </button>
      </NuxtLink>
    </div>

    <!-- If enrolled courses exist -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <CourseCard
        v-for="course in enrolledStore.enrolledCourses"
        :key="course.id"
        :course="course"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useEnrolledCourseStore } from "@/stores/enrolledCourses";
import CourseCard from "@/components/CourseCard.vue";

const enrolledStore = useEnrolledCourseStore();

onMounted(async () => {
  await enrolledStore.fetchEnrolledCourses();
});
</script>
