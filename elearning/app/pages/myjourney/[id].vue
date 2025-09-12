<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div
      v-if="course"
      class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <!-- Thumbnail -->
      <img
        :src="course.imgUrl"
        alt="Course image"
        class="w-full h-64 object-cover"
      />

      <div class="p-6">
        <h1 class="text-2xl font-bold mb-2">{{ course.title }}</h1>
        <p class="text-gray-600 mb-4">By {{ course.professor }}</p>

        <!-- Embedded Video -->
        <div v-if="course.videoUrl" class="mb-6">
          <iframe
            :src="formatYoutube(course.videoUrl)"
            frameborder="0"
            allowfullscreen
            class="w-full h-96 rounded-lg"
          ></iframe>
        </div>

        <p class="text-gray-700">{{ course.description }}</p>
      </div>
    </div>

    <div v-else class="text-center py-20 text-gray-600">
      <h2 class="text-xl font-semibold">Course not found</h2>
      <NuxtLink to="/myjourney" class="mt-4 inline-block text-blue-600">
        ← Back to My Journey
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useCourseStore } from "@/stores/courses";

const route = useRoute();
const courseStore = useCourseStore();
const course = ref();

onMounted(async () => {
  if (courseStore.courses.length === 0) {
    await courseStore.fetchCourses();
  }
  course.value = courseStore.courses.find((c) => c.id === route.params.id);
});

const formatYoutube = (url: string) => {
  // Converts normal YouTube URL to embed format
  return url.replace("watch?v=", "embed/");
};
</script>
