<template>
  <section class="overflow-hidden">
    <div class="py-20 grid md:grid-cols-2 gap-10 items-center">
      <!-- Left Content -->
      <div>
        <!-- Heading -->
        <transition name="fade-up">
          <h1
            v-if="show.heading"
            class="text-4xl md:text-5xl font-bold leading-tight"
          >
            Learn Without <span class="text-blue-500">Limits</span>
          </h1>
        </transition>

        <!-- Description -->
        <transition name="fade-up">
          <p
            v-if="show.description"
            class="mt-5 text-lg text-gray-500 max-w-lg"
          >
            Start, switch, or advance your career with more than 213,000
            courses, Professional Certificates, and degrees from world-class
            universities and companies.
          </p>
        </transition>

        <!-- Button -->
        <transition name="fade-up">
          <div v-if="show.button" class="mt-6 flex gap-4">
            <NuxtLink :to="'/courses'">
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white px-12 py-3 rounded-lg font-medium shadow-lg transition-transform transform hover:-translate-y-1"
              >
                Explore Courses
              </button>
            </NuxtLink>
          </div>
        </transition>

        <!-- Stats -->
        <transition name="fade-up">
          <div v-if="show.stats" class="mt-12 flex gap-10 text-center">
            <div>
              <p class="text-2xl font-bold text-blue-500">
                <i class="fa-solid fa-users mr-3"></i>57M+
              </p>
              <p class="text-gray-700 pt-1">Students</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-blue-500">
                <i class="fa-solid fa-award mr-3"></i>213K+
              </p>
              <p class="text-gray-700 pt-1">Courses</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-blue-500">
                <i class="fa-solid fa-globe mr-2"></i>190+
              </p>
              <p class="text-gray-700 pt-1">Countries</p>
            </div>
          </div>
        </transition>
      </div>

      <!-- Right Content (Image with badges) -->
      <div class="relative">
        <!-- Image -->
        <transition name="fade-up">
          <img
            v-if="show.image"
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
            alt="Students learning"
            class="rounded-2xl shadow-2xl"
          />
        </transition>

        <!-- Certificate Badge -->
        <transition name="fade-up">
          <div
            v-if="show.badge1"
            class="absolute top-6 left-6 bg-white text-gray-900 px-4 py-2 rounded-xl shadow-md text-sm flex items-center gap-2"
          >
            <span class="text-green-500">🏅</span>
            <div>
              <p class="font-semibold">Certificate Ready</p>
              <p class="text-gray-500 text-xs">Get industry recognition</p>
            </div>
          </div>
        </transition>

        <!-- Trending Badge -->
        <transition name="fade-up">
          <div
            v-if="show.badge2"
            class="absolute bottom-6 right-6 bg-white text-gray-900 px-4 py-2 rounded-xl shadow-md text-sm flex items-center gap-2"
          >
            <span class="text-blue-500">📈</span>
            <div>
              <p class="font-semibold">Trending Skills</p>
              <p class="text-gray-500 text-xs">Stay ahead of the curve</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <Rewards />
    <Testimonials />
    <FooterHome />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const show = ref({
  heading: false,
  description: false,
  button: false,
  stats: false,
  image: false,
  badge1: false,
  badge2: false,
});

onMounted(() => {
  // stagger animations
  setTimeout(() => (show.value.heading = true), 200);
  setTimeout(() => (show.value.description = true), 400);
  setTimeout(() => (show.value.button = true), 600);
  setTimeout(() => (show.value.stats = true), 800);
  setTimeout(() => (show.value.image = true), 1000);
  setTimeout(() => (show.value.badge1 = true), 1200);
  setTimeout(() => (show.value.badge2 = true), 1400);
});
</script>

<style>
.fade-up-enter-active {
  transition: all 0.8s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
