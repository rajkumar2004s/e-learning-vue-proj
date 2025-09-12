import { defineStore } from "pinia";
import { ref, watch } from "vue";

export interface Course {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  videoUrl?: string;
  price: number;
  mrp?: number;
  rating: number;
  professor: string;
  createdAt: string;
  enrolledUsers?: number;
  enrolled?: boolean; // flag to indicate enrollment
}

export const useCourseStore = defineStore("course", () => {
  const courses = ref<Course[]>([]);
  const enrolledCourses = ref<Course[]>([]);
  const newCourse = ref(false);
  const editingCourseId = ref<string | null>(null);

  const toggleNewCourse = () => {
    newCourse.value = !newCourse.value;
    editingCourseId.value = null; // reset editing when adding new
  };

  const startEditCourse = (id: string) => {
    editingCourseId.value = id;
    newCourse.value = false; // reset add mode when editing
  };

  // ✅ FIX: close editing modal
  const closeEditCourse = () => {
    editingCourseId.value = null;
    newCourse.value = false;
  };

  // --------------------------
  // Load enrolled courses from localStorage
  // --------------------------
  if (process.client) {
    const saved = localStorage.getItem("enrolledCourses");
    if (saved) enrolledCourses.value = JSON.parse(saved);

    // Save any changes to localStorage automatically
    watch(
      enrolledCourses,
      (val) => localStorage.setItem("enrolledCourses", JSON.stringify(val)),
      { deep: true }
    );
  }

  // --------------------------
  // Merge enrolled state
  // --------------------------
  const mergeEnrolledState = () => {
    enrolledCourses.value.forEach((enrolled) => {
      const found = courses.value.find((c) => c.id === enrolled.id);
      if (found) found.enrolled = true;
    });
  };

  // --------------------------
  // CRUD
  // --------------------------
  const fetchCourses = async () => {
    const data = await $fetch<Course[]>("/api/courses");
    courses.value = data;
    mergeEnrolledState();
  };

  const addCourse = async (
    course: Omit<Course, "id" | "createdAt" | "enrolledUsers">
  ) => {
    const newC = await $fetch<Course>("/api/courses", {
      method: "POST",
      body: course,
    });
    courses.value.unshift(newC);
  };

  const updateCourse = async (updatedCourse: Course) => {
    const saved = await $fetch<Course>("/api/courses", {
      method: "PUT",
      body: updatedCourse,
    });
    const index = courses.value.findIndex((c) => c.id === saved.id);
    if (index !== -1) courses.value.splice(index, 1, saved);
  };

  const removeCourse = async (id: string) => {
    await $fetch("/api/courses", {
      method: "DELETE",
      body: { id },
    });
    courses.value = courses.value.filter((c) => c.id !== id);
    enrolledCourses.value = enrolledCourses.value.filter((c) => c.id !== id);
  };

  // --------------------------
  // Enrollment
  // --------------------------
  const enrollCourse = (course: Course) => {
    if (!isEnrolled(course.id)) {
      enrolledCourses.value.push(course);

      const found = courses.value.find((c) => c.id === course.id);
      if (found) found.enrolled = true;
    }
  };

  const isEnrolled = (courseId: string) =>
    enrolledCourses.value.some((c) => c.id === courseId);

  return {
    courses,
    enrolledCourses,
    fetchCourses,
    addCourse,
    updateCourse,
    removeCourse,
    enrollCourse,
    isEnrolled,
    mergeEnrolledState,
    newCourse,
    editingCourseId,
    toggleNewCourse,
    startEditCourse,
    closeEditCourse, // ✅ added
  };
});
