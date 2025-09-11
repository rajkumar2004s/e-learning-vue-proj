import { defineStore } from "pinia";
import { ref, watch } from "vue";

export interface Course {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  mrp: number;
  rating: number;
  professor: string;
  createdAt: string;
  enrolledUsers: number;
}

export const useCourseStore = defineStore("course", () => {
  const newCourse = ref(false);
  const courses = ref<Course[]>([]);
  const editingCourseId = ref<string | null>(null);

  // ✅ Enrolled courses (persistent in localStorage)
  const enrolledCourses = ref<Course[]>([]);

  // Load enrolledCourses from localStorage at startup
  const loadEnrolledCourses = () => {
    const saved = localStorage.getItem("enrolledCourses");
    if (saved) {
      enrolledCourses.value = JSON.parse(saved);
    }
  };

  // Persist enrolledCourses when it changes
  watch(
    enrolledCourses,
    (val) => {
      localStorage.setItem("enrolledCourses", JSON.stringify(val));
    },
    { deep: true }
  );

  const toggleNewCourse = () => {
    newCourse.value = !newCourse.value;
  };

  const startEditCourse = (id: string) => {
    editingCourseId.value = id;
  };

  const closeEditCourse = () => {
    editingCourseId.value = null;
  };

  // ✅ Load all courses
  const fetchCourses = async () => {
    const data = await $fetch<Course[]>("/api/courses");
    courses.value = data;
  };

  // ✅ Add new course
  const addCourse = async (
    course: Omit<Course, "id" | "createdAt" | "enrolledUsers">
  ) => {
    const newC = await $fetch<Course>("/api/courses", {
      method: "POST",
      body: course,
    });
    courses.value.unshift(newC);
    toggleNewCourse();
  };

  // ✅ Update course
  const updateCourse = async (updatedCourse: Course) => {
    const saved = await $fetch<Course>("/api/courses", {
      method: "PUT",
      body: updatedCourse,
    });
    const index = courses.value.findIndex((c) => c.id === saved.id);
    if (index !== -1) {
      courses.value.splice(index, 1, saved);
    }
    closeEditCourse();
  };

  // ✅ Remove course
  const removeCourse = async (id: string) => {
    await $fetch("/api/courses", {
      method: "DELETE",
      body: { id },
    });
    courses.value = courses.value.filter((c) => c.id !== id);
  };

  // ✅ Enroll in a course
  const enrollCourse = async (course: Course) => {
    if (!enrolledCourses.value.find((c) => c.id === course.id)) {
      enrolledCourses.value.push(course);
    }
  };

  // ✅ Check if already enrolled
  const isEnrolled = (courseId: string) => {
    return enrolledCourses.value.some((c) => c.id === courseId);
  };

  return {
    newCourse,
    courses,
    editingCourseId,
    enrolledCourses,
    toggleNewCourse,
    startEditCourse,
    closeEditCourse,
    fetchCourses,
    addCourse,
    updateCourse,
    removeCourse,
    enrollCourse,
    isEnrolled,
    loadEnrolledCourses,
  };
});
