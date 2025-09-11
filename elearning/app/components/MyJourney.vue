<template>
  <div class="flex justify-center pt-12 pl-60">
    <div class="h-[55vh] w-[78%] rounded-2xl flex justify-center items-center">
      <div class="flex flex-col justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-14 text-gray-500 mb-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
          />
        </svg>

        <h1 class="text-center text-3xl font-semibold font-sans">
          No courses enrolled yet..
        </h1>
        <p class="text-gray-500 text-[18px] font-semibold pt-6">
          Explore our courses and start your learning journey today!
        </p>
        <div class="flex justify-center pt-8">
          <NuxtLink :to="'/courses'">
            <button
              class="bg-blue-700 hover:bg-orange-500 text-white px-12 py-3 rounded-lg font-medium shadow-lg"
            >
              Explore Courses
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
