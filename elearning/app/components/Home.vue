<template>
  <section>
    <div class="py-20 grid md:grid-cols-2 gap-10 items-center">
      <!-- Left Content -->
      <div>
        <h1 class="text-4xl md:text-5xl font-bold leading-tight">
          Learn Without <span class="text-orange-400">Limits</span>
        </h1>
        <p class="mt-5 text-lg text-gray-500 max-w-lg">
          Start, switch, or advance your career with more than 213,000 courses,
          Professional Certificates, and degrees from world-class universities
          and companies.
        </p>

        <!-- Buttons -->
        <div class="mt-6 flex gap-4">
          <NuxtLink :to="'/courses'">
            <button
              class="bg-orange-400 hover:bg-orange-500 text-white px-12 py-3 rounded-lg font-medium shadow-lg"
            >
              Explore Courses
            </button>
          </NuxtLink>
        </div>

        <!-- Stats -->
        <div class="mt-12 flex gap-10 text-center">
          <div>
            <p class="text-2xl font-bold text-orange-400">
              <i class="fa-solid fa-users mr-3"></i>57M+
            </p>
            <p class="text-gray-700 pt-1">Students</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-orange-400">
              <i class="fa-solid fa-award mr-3"></i>213K+
            </p>
            <p class="text-gray-700 pt-1">Courses</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-orange-400">
              <i class="fa-solid fa-arrows-turn-right mr-2"></i>190+
            </p>
            <p class="text-gray-700 pt-1">Countries</p>
          </div>
        </div>
      </div>

      <!-- Right Content (Image with badges) -->
      <div class="relative">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
          alt="Students learning"
          class="rounded-2xl shadow-2xl"
        />

        <!-- Certificate Badge -->
        <div
          class="absolute top-6 left-6 bg-white text-gray-900 px-4 py-2 rounded-xl shadow-md text-sm flex items-center gap-2"
        >
          <span class="text-green-500">🏅</span>
          <div>
            <p class="font-semibold">Certificate Ready</p>
            <p class="text-gray-500 text-xs">Get industry recognition</p>
          </div>
        </div>

        <!-- Trending Badge -->
        <div
          class="absolute bottom-6 right-6 bg-white text-gray-900 px-4 py-2 rounded-xl shadow-md text-sm flex items-center gap-2"
        >
          <span class="text-blue-500">📈</span>
          <div>
            <p class="font-semibold">Trending Skills</p>
            <p class="text-gray-500 text-xs">Stay ahead of the curve</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Calendar Modal -->
    <div
      v-if="showCalendar"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-6 shadow-xl w-[90%] max-w-md">
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Select a Date</h2>
          <button
            @click="showCalendar = false"
            class="text-gray-500 hover:text-red-500 text-xl"
          >
            ✖
          </button>
        </div>

        <!-- Calendar -->
        <vue-cal
          style="height: 400px"
          hide-view-selector
          default-view="month"
          time="false"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
</script>
