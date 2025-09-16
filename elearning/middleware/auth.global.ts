import { useAuthStore } from "../app/stores/auth";
// @ts-expect-error: '#app' is a Nuxt 3 alias, valid at runtime
import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import type { RouteLocationNormalized } from "vue-router";

export default defineNuxtRouteMiddleware(
  async (to: RouteLocationNormalized) => {
    if (typeof window === "undefined") return;

    const auth = useAuthStore();
    await auth.initAuth();

    const requiresAuth = !!to.meta?.requiresAuth;
    const requiresAdmin = !!to.meta?.requiresAdmin;

    if (requiresAuth && !auth.isAuthenticated) {
      return navigateTo("/"); // redirect to login
    }

    if (requiresAdmin) {
      if (!auth.isAuthenticated) {
        return navigateTo("/");
      }
      if (!auth.isAdmin) {
        return navigateTo("/unauthorized"); // create unauthorized.vue
      }
    }
  }
);
