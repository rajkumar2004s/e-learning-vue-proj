// middleware/auth.global.ts
import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return;

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
});
