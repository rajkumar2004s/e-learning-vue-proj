<template>
  <div class="bg-white pb-24 lg:pb-0">
    <div class="bg-gray-800 text-white pt-8 pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="text-sm breadcrumbs mb-4">
          <ul class="flex flex-wrap space-x-2 text-blue-300 font-bold">
            <li><NuxtLink to="/" class="hover:underline">Development</NuxtLink></li>
            <li><span>&gt;</span></li>
            <li><NuxtLink to="/course" class="hover:underline">Web Development</NuxtLink></li>
            <li class="hidden sm:inline-block"><span>&gt;</span></li>
            <li class="text-gray-400 mt-1 sm:mt-0 basis-full sm:basis-auto">{{ course.title }}</li>
          </ul>
        </nav>

        <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-2 shadow-[0_-2px_5px_rgba(0,0,0,0.1)] z-50 border-t border-gray-200">
          <div class="text-xl font-bold text-black mb-1">{{ course.price }}</div>
          <button class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition">
            Buy now
          </button>
        </div>

        <div class="max-w-4xl">
          <h1 class="text-3xl sm:text-4xl font-bold mb-3">{{ course.title }}</h1>
          <p class="text-lg sm:text-xl mb-4 text-gray-200">{{ course.headline }}</p>
          <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm mb-4">
            <span v-if="course.bestseller" class="bg-yellow-300 text-yellow-900 font-bold px-2 py-1 rounded text-xs">Bestseller</span>
            <span class="text-yellow-400 font-bold">{{ course.rating }}</span>
            <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <span class="text-blue-300 hover:underline cursor-pointer">({{ course.ratingsCount?.toLocaleString() }} ratings)</span>
            <span class="text-gray-300">{{ course.enrollments?.toLocaleString() }} learners</span>
          </div>
          <p class="text-gray-300 text-sm">Created by
            <span v-for="(instructor, index) in course.instructors" :key="instructor.name">
              <a href="#" class="text-blue-300 underline hover:text-blue-200 cursor-pointer">{{ instructor.name }}</a>{{ index < course.instructors.length - 1 ? ', ' : '' }}
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="border border-gray-300 p-6 rounded-md shadow bg-white mb-8">
            <h2 class="text-2xl font-bold mb-4">What you'll learn</h2>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-gray-800">
              <li v-for="(item, index) in course.learnings" :key="index" class="flex items-start">
                <svg class="w-5 h-5 mr-3 text-gray-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-white mb-8">
            <h2 class="text-2xl font-bold mb-4">Course content</h2>
            <div class="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>{{ course.curriculum?.length }} sections • {{ totalLectures }} lectures • {{ course.totalDuration }} total length</span>
              <button class="text-blue-600 font-bold hover:text-blue-800">Expand all sections</button>
            </div>
            <div class="border border-gray-300 divide-y divide-gray-300 rounded-md overflow-hidden">
              <details v-for="(section, index) in course.curriculum" :key="index" class="bg-gray-50 last:border-b-0 group">
                <summary class="p-4 font-semibold cursor-pointer flex justify-between items-center group-hover:bg-gray-100">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 mr-3 transform transition-transform details-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    <span>{{ section.title }}</span>
                  </div>
                  <span class="text-gray-500 text-sm font-normal">{{ section.lessons.length }} lectures • {{ section.duration }}</span>
                </summary>
                <ul class="bg-white divide-y divide-gray-200">
                  <li v-for="(lesson, lessonIndex) in section.lessons" :key="lessonIndex" class="flex justify-between items-center p-3 text-sm hover:bg-gray-50">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span class="text-gray-800">{{ lesson.title }}</span>
                    </div>
                    <span class="text-xs text-gray-500">{{ lesson.duration }}</span>
                  </li>
                </ul>
              </details>
            </div>
          </div>

          <div class="pt-8">
            <h2 class="text-2xl font-bold mb-4">Instructors</h2>
            <div class="space-y-8">
              <div v-for="instructor in course.instructors" :key="instructor.name">
                <a href="#" class="text-xl font-bold text-blue-600 underline hover:text-blue-800">{{ instructor.name }}</a>
                <p class="text-sm text-gray-600 mb-4">{{ instructor.title }}</p>
                <div class="flex items-start gap-4 mb-4">
                  <img :src="instructor.image" :alt="instructor.name" class="w-28 h-28 rounded-full object-cover">
                  <ul class="space-y-2 text-sm text-gray-800">
                    <li class="flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                      <span>{{ instructor.stats.rating }} Instructor Rating</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span>{{ instructor.stats.reviews.toLocaleString() }} Reviews</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <span>{{ instructor.stats.students.toLocaleString() }} Students</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span>{{ instructor.stats.courses }} Courses</span>
                    </li>
                  </ul>
                </div>
                <div class="prose max-w-none">
                  <p :class="{ 'line-clamp-3': !instructor.isExpanded }">
                    {{ instructor.bio }}
                  </p>
                </div>
                <button @click="instructor.isExpanded = !instructor.isExpanded" class="font-bold text-blue-600 hover:text-blue-800 mt-2">
                  {{ instructor.isExpanded ? 'Show less' : 'Show more' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="lg:sticky lg:top-8 bg-white rounded-md shadow-lg border border-gray-200">
            <div class="w-full aspect-video bg-gray-200 rounded-t-md overflow-hidden relative group cursor-pointer">
              <img :src="course.image" :alt="course.title" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ease-in-out">
                  <svg class="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.188v3.624a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664l-3.197-1.684z" clip-rule="evenodd"></path></svg>
                </div>
                <p class="absolute bottom-4 text-white font-semibold">Preview this course</p>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-baseline mb-2">
                <span class="text-4xl font-bold text-gray-900 mr-2">{{ course.price }}</span>
                <span v-if="course.originalPrice" class="text-lg text-gray-500 line-through mr-2">{{ course.originalPrice }}</span>
                <span v-if="discountPercentage" class="text-lg font-bold text-gray-800">{{ discountPercentage }}% off</span>
              </div>
              <button class="w-full py-3 mb-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition">
                Add to cart
              </button>
              <button class="w-full py-3 mb-4 border border-gray-800 text-gray-800 font-bold rounded-md hover:bg-gray-100 transition">
                Buy now
              </button>
              <p class="text-xs text-center text-gray-600 mb-4">30-Day Money-Back Guarantee</p>

              <div>
                <h3 class="font-bold mb-2">This course includes:</h3>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li v-for="(item, index) in course.includes" :key="index" class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
details[open] .details-arrow {
  transform: rotate(180deg);
  transition: transform 0.2s;
}
summary {
  list-style: none;
  cursor: pointer;
  outline: none;
  user-select: none;
  display: flex;
  align-items: center;
}
summary::-webkit-details-marker {
  display: none;
}
.details-arrow {
  margin-right: 0.75rem;
  transition: transform 0.2s;
}
@media (max-width: 1023px) {
  .lg\:sticky {
    position: static !important;
  }
}
</style>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from 'nuxt/app';

const route = useRoute();
const course = ref({});

const fullStackCourse = {
  id: 1,
  title: "Full Stack Web Developer",
  headline: "Learn to build professional web applications from the ground up with the world's leading experts and join a global community of developers.",
  instructors: [
    {
      name: "Dr. Angela Yu",
      title: "Developer and Lead Instructor",
      image: "https://placehold.co/200x200?text=Angela+Yu",
      stats: {
        rating: 4.7,
        reviews: 788123,
        students: 1854344,
        courses: 7,
      },
      bio: "I'm Angela, a developer with a passion for teaching. I'm the lead instructor at the London App Brewery, one of London's leading programming bootcamps. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I've been invited by companies such as Google, Twitter and Facebook to teach their employees. My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I've made hundred of websites, apps and games. But most importantly, I realised that my greatest passion is teaching.",
    },
    {
      name: "Rob Percival",
      title: "Web Developer and Teacher",
      image: "https://placehold.co/200x200?text=Rob+P.",
      stats: {
        rating: 4.5,
        reviews: 301432,
        students: 2103234,
        courses: 30,
      },
      bio: "Hi! I'm Rob. I have a degree in Mathematics from Cambridge University and you might call me a bit of a coding geek. After building websites for friends and family for fun, I soon learned that web development was a very lucrative career choice. I gave up my successful (and sometimes stressful) job as a teacher to work part time and today, couldn't be happier. I'm passionate about teaching kids to code, so every summer I run Code School in the beautiful city of Cambridge. I also run the popular web hosting and design service, Eco Web Hosting, which leaves me free to share my secrets with people like you.",
    }
  ],
  bestseller: true,
  rating: 4.7,
  ratingsCount: 293733,
  enrollments: 1281048,
  price: "$19.99",
  originalPrice: "$94.99",
  image: "https://placehold.co/600x400?text=Full+Stack+Course",
  totalDuration: "55.5 hours",
  learnings: [
    "Build a portfolio of over 25+ websites and applications.",
    "Master frontend development with HTML, CSS, Javascript, and React.",
    "Master backend development with Node.js, Express, and databases.",
    "Learn professional developer best practices.",
    "Understand how to build and deploy full-stack web apps.",
    "Work as a freelance web developer.",
    "Master the latest technologies in the web development industry.",
    "Get hired as a full-time web developer."
  ],
  curriculum: [
    {
      title: "Frontend Web Development",
      duration: "15h 30m",
      lessons: [
        { title: "Introduction to HTML5", duration: "45m" },
        { title: "Introduction to CSS3", duration: "1h 15m" },
        { title: "Javascript for Beginners", duration: "3h" }
      ]
    },
    {
      title: "Backend Web Development",
      duration: "20h 15m",
      lessons: [
        { title: "Introduction to Node.js", duration: "2h" },
        { title: "Working with Express.js", duration: "2h 30m" },
        { title: "Databases with MongoDB", duration: "3h" }
      ]
    },
    {
      title: "Advanced Topics & Deployment",
      duration: "19h 45m",
      lessons: [
        { title: "Introduction to React.js", duration: "5h" },
        { title: "Authentication & Security", duration: "3h" },
        { title: "Deploying to the Cloud (AWS/Heroku)", duration: "2h" }
      ]
    }
  ],
  includes: [
    "55.5 hours on-demand video",
    "42 articles",
    "12 downloadable resources",
    "Full lifetime access",
    "Access on mobile and TV",
    "Certificate of completion"
  ]
};

const allCourses = [fullStackCourse];

const totalLectures = computed(() => {
  if (!course.value.curriculum) return 0;
  return course.value.curriculum.reduce((total, section) => total + section.lessons.length, 0);
});

const discountPercentage = computed(() => {
  if (!course.value.price || !course.value.originalPrice) return 0;
  const priceNum = parseFloat(course.value.price.replace('$', ''));
  const originalPriceNum = parseFloat(course.value.originalPrice.replace('$', ''));
  if (originalPriceNum <= priceNum) return 0;
  const discount = ((originalPriceNum - priceNum) / originalPriceNum) * 100;
  return Math.round(discount);
});

const fetchCourseData = (id) => {
  const foundCourse = allCourses.find(c => c.id === parseInt(id));
  if (foundCourse) {
    course.value = foundCourse;
    if (course.value.instructors) {
      course.value.instructors.forEach(instructor => {
        instructor.isExpanded = false;
      });
    }
  } else {
    course.value = fullStackCourse;
    console.warn("Course not found for ID:", id, ". Loading default course.");
  }
};

onMounted(() => {
  const courseId = route.params.id || 1;
  fetchCourseData(courseId);
});
</script>