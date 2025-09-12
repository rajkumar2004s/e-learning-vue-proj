<template>
  <div class="pl-80 p-8 min-h-screen bg-[#0f172a] text-white">
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card">
        <h2 class="text-xl">Total Courses</h2>
        <p class="text-4xl font-bold pt-2">{{ course.courses.length }}</p>
      </div>
      <div class="card">
        <h2 class="text-xl">Active Users</h2>
        <p class="text-4xl font-bold pt-2">0</p>
      </div>
      <div class="card">
        <h2 class="text-xl">Total Enrollments</h2>
        <p class="text-4xl font-bold pt-2">0</p>
      </div>
    </div>

    <div class="pt-8 flex justify-end pr-16">
      <button
        class="bg-blue-500 p-3 rounded px-8 active-glow"
        @click="course.toggleNewCourse"
      >
        <i class="fa-solid fa-plus mr-2"></i> Add Course
      </button>
    </div>

    <!-- Courses List -->
    <div class="mt-8 bg-gray-800 rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Your Courses</h2>
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-gray-600">
            <th class="py-2">Title</th>
            <th class="py-2">Professor</th>
            <th class="py-2">Price</th>
            <th class="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in course.courses"
            :key="c.id"
            class="border-b border-gray-700"
          >
            <td class="py-4">{{ c.title }}</td>
            <td class="py-4">{{ c.professor }}</td>
            <td class="py-2">${{ c.price }}</td>
            <td class="py-2 space-x-2">
              <button
                class="bg-[#2f65a1] px-6 border border-gray-500 mr-4 py-1 rounded"
                @click="course.startEditCourse(c.id)"
              >
                <i class="fa-solid fa-pen-to-square text-xs"></i>
                Edit
              </button>
              <button
                class="bg-red-500 px-3 py-1 rounded"
                @click="course.removeCourse(c.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <CourseForm v-if="course.newCourse || course.editingCourseId" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCourseStore } from "@/stores/courses";

const course = useCourseStore();

onMounted(() => {
  course.fetchCourses();
});
</script>
