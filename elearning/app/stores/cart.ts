import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Course } from "@/types/Course";

export const useCartStore = defineStore("cart", () => {
  const cart = ref<Course[]>([]);

  // ✅ Load cart from localStorage (immediately on store creation)
  const loadCart = () => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) {
        cart.value = JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load cart:", e);
      cart.value = [];
    }
  };
  loadCart(); // ⬅ auto-load when store initializes

  // ✅ Persist cart to localStorage
  watch(
    cart,
    (val) => {
      localStorage.setItem("cart", JSON.stringify(val));
    },
    { deep: true }
  );

  // ✅ Add to cart
  const addToCart = (course: Course) => {
    if (!isInCart(course.id)) {
      cart.value.push(course);
      localStorage.setItem("cart", JSON.stringify(cart.value));
    }
  };

  // ✅ Remove from cart
  const removeFromCart = (id: string) => {
    cart.value = cart.value.filter((c) => c.id !== id);
    localStorage.removeItem("cart");
  };

  // ✅ Check if in cart
  const isInCart = (id: string) => {
    return cart.value.some((c) => c.id === id);
  };

  // ✅ Clear cart
  const clearCart = () => {
    cart.value = [];
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    isInCart,
    clearCart,
  };
});
