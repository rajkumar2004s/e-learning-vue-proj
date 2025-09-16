import type { User } from "firebase/auth";
import { useAuthStore } from "~/stores/auth";
import { useNuxtApp } from "#app";
import { computed } from "vue";

export const useAuth = () => {
  const { $auth } = useNuxtApp();
  const authStore = useAuthStore();
  const user = computed(() => $auth.user.value as User | null);
  const isAuthenticated = computed(() => !!user.value);

  const signInWithGoogle = async () => {
    const { user, error } = await $auth.signInWithGoogle();
    if (user) {
      // Update the auth store with the user info
      await authStore.setUser({
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: "google",
      });
      return { success: true };
    }
    return { success: false, error };
  };

  const signOut = async () => {
    const { error } = await $auth.signOut();
    if (!error) {
      authStore.clearUser();
      return { success: true };
    }
    return { success: false, error };
  };

  return {
    user,
    isAuthenticated,
    signInWithGoogle,
    signOut,
  };
};
