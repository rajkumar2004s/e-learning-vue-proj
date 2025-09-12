import { defineStore } from "pinia";
import { ref, watch, onMounted } from "vue";
import type { Course } from "@/stores/courses"; // reuse Course interface

export const useWishlistStore = defineStore("wishlist", () => {
  const wishlist = ref<Course[]>([]);

  // ===============================
  // Load Wishlist (client-only)
  // ===============================
  const loadWishlist = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wishlist");
      if (saved) {
        wishlist.value = JSON.parse(saved);
      }
    }
  };

  // ===============================
  // Auto-persist changes
  // ===============================
  if (typeof window !== "undefined") {
    watch(
      wishlist,
      (val) => {
        localStorage.setItem("wishlist", JSON.stringify(val));
      },
      { deep: true }
    );
  }

  // ===============================
  // Actions
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

  const isInWishlist = (courseId: string) =>
    wishlist.value.some((c) => c.id === courseId);

  return {
    wishlist,
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  };
});
