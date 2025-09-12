import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Course } from "@/stores/course"; // ✅ reuse Course interface

export const useWishlistStore = defineStore("wishlist", () => {
  // ===============================
  // STATE
  // ===============================
  const wishlist = ref<Course[]>([]);

  // ===============================
  // PERSISTENCE
  // ===============================
  const loadWishlist = () => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      wishlist.value = JSON.parse(saved);
    }
  };

  watch(
    wishlist,
    (val) => {
      localStorage.setItem("wishlist", JSON.stringify(val));
    },
    { deep: true }
  );

  // ===============================
  // ACTIONS
  // ===============================
  const addToWishlist = (course: Course) => {
    if (!isInWishlist(course.id)) {
      wishlist.value.push(course);
    }
  };

  const removeFromWishlist = (courseId: string) => {
    wishlist.value = wishlist.value.filter((c) => c.id !== courseId);
  };

  const toggleWishlist = (course: Course) => {
    if (isInWishlist(course.id)) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist(course);
    }
  };

  const isInWishlist = (courseId: string) => {
    return wishlist.value.some((c) => c.id === courseId);
  };

  // ===============================
  // EXPORT
  // ===============================
  return {
    wishlist,
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  };
});
