<template>
  <div v-if="!authToggle" class="pt-8 flex flex-col gap-2 w-[80%]">
    <label class="text-white">Email</label>
    <input placeholder="Enter your email" v-model="loginForm.email" />

    <label class="text-white pt-4">Password</label>
    <div class="relative">
      <input
        placeholder="password"
        :type="showPassword ? 'text' : 'password'"
        v-model="loginForm.password"
      />
      <span @click="togglePassword" class="absolute right-4 m-2 cursor-pointer">
        <i v-if="showPassword" class="fa-solid fa-eye-slash text-white"></i>
        <i v-else class="fa-solid fa-eye text-white"></i>
      </span>
    </div>

    <p class="text-red-500 text-center pt-2" v-if="error">{{ error }}</p>

    <button
      class="shiny-btn active-glow text-white bg-[#2f76e8] font-[Roboto] mt-6 p-2 w-full rounded-md"
      @click="handleLogin"
      :disabled="loading"
    >
      <Loader v-if="loading" />
      <span v-else>
        <i class="fa-solid fa-right-to-bracket p-2 mr-2"></i> Sign in
      </span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

definePageMeta({
  layout: "auth", // no sidebar
});

const auth = useAuthStore();

const authToggle = ref(false); // false = login, true = register
const showPassword = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);

const loginForm = ref({
  email: "jabeer@gmail.com",
  password: "jabeer1234",
});

const loading = ref(false);
const error = ref("");

// Handle Login
const handleLogin = async () => {
  loading.value = true;
  error.value = "";
  try {
    const success = await auth.login(
      loginForm.value.email,
      loginForm.value.password
    );
    if (success) {
      await navigateTo("/"); // go to Home
    } else {
      error.value = "Invalid Email or Password";
    }
  } catch {
    error.value = "Login failed. Please try again";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.container {
  background-image: linear-gradient(
    135deg,
    rgb(30, 41, 59) 0%,
    rgb(15, 23, 42) 100%
  );
}
input {
  background-color: #0f172a;
  padding: 10px;
  width: 100%;
  border-radius: 6px;
  color: white;
  outline: none;
  border: 1px solid rgb(48, 48, 48);
  font-family: sans-serif;
  font-size: 14px;
}
.title {
  font-family: "Exo 2", sans-serif;
  letter-spacing: 0.02rem;
}
</style>
