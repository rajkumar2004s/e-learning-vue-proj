<template>
  <div class="md:py-8 py-28 p-8 min-h-screen bg-white text-black">
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

    <div class="grid grid-cols-3 md:grid-cols-3 gap-6">
      <div class="card">
        <h2 class="text-xl">Total Courses</h2>
        <p class="text-4xl font-bold pt-2">{{ course.courses.length }}</p>
      </div>

      <div class="card">
        <h2 class="text-xl">Active Users</h2>
        <p class="text-4xl font-bold pt-2">{{ activeUsers }}</p>
      </div>

      <div class="card">
        <h2 class="text-xl">Total Enrollments</h2>
        <p class="text-4xl font-bold pt-2">
          {{ enrolledCourses.enrolledCourses.length }}
        </p>
      </div>
    </div>

    <div class="pt-8 md:flex md:justify-end w-[100vw] md:w-[77vw]">
      <button
        class="bg-blue-500 text-white p-3 rounded-xl px-8 course-btn-glow animate-zoomPulse md:mr-16"
        @click="course.toggleNewCourse"
      >
        <i class="fa-solid fa-plus mr-2"></i> Add Course
      </button>
    </div>

    <div class="mt-8 rounded-lg p-6 w-[100vw] md:w-[77vw]">
      <h2 class="text-2xl font-semibold mb-4">Your Courses</h2>
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-gray-600">
            <th class="py-2">Title</th>
            <th class="py-2">Professor</th>
            <th class="py-2 p-4">Price</th>
            <th class="py-2 pl-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in course.courses"
            :key="c.id"
            class="border-b border-gray-700"
          >
            <td class="py-4 pr-4">{{ c.title }}</td>
            <td class="py-4">{{ c.professor }}</td>
            <td class="py-4 p-4">${{ c.price }}</td>
            <td class="py-4 space-x-2">
              <button
                class="bg-gray-500 px-6 border border-gray-500 mr-4 py-1 rounded md:w-[30%] w-full m-2"
                @click="course.startEditCourse(c.id)"
              >
                <i class="fa-solid fa-pen-to-square text-xs"></i>
                Edit
              </button>
              <button
                class="bg-red-400 px-3 py-1 rounded w-full md:w-[30%] m-2"
                @click="course.removeCourse(c.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <CourseForm v-if="course.newCourse || course.editingCourseId" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useCourseStore } from "../stores/courses";
import { useEnrolledCourseStore } from "../stores/enrolledCourses";
import { useAuthStore } from "../stores/auth";

const course = useCourseStore();
const enrolledCourses = useEnrolledCourseStore();
const auth = useAuthStore();

const activeUsers = computed(() => {
  return new Set(enrolledCourses.enrolledCourses.map((c) => c.id)).size || 0;
});

onMounted(() => {
  course.fetchCourses();
  enrolledCourses.fetchEnrolledCourses();
  auth.initAuth();
});
</script>

<style scoped>
@keyframes zoomPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
.animate-zoomPulse {
  animation: zoomPulse 1.5s infinite ease-in-out;
}
</style>
