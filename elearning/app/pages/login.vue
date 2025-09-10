<template>
  <div class="container h-[100vh] flex justify-center items-center">
    <div
      class="w-[28%] border-[0.1px] border-[#1383CE] h-auto pb-10 bg-[#1E293B] rounded-2xl flex flex-col items-center shadow-4xl"
    >
      <i class="fa-solid fa-bars-progress text-[#2f76e8] text-5xl pt-12"></i>
      <h1 class="text-white text-3xl font-bold pt-4 font-sans title">
        NEURO FLOW
      </h1>
      <p class="text-[17px] pt-2 text-gray-500 font-sans font-semibold">
        Manage your projects with ease
      </p>

      <!-- Login Form -->
      <div class="pt-8 flex flex-col gap-2 w-[80%]">
        <label class="text-white">Email</label>
        <input placeholder="admin@gmail.com" v-model="user.email" />

        <label class="text-white pt-4">Password</label>
        <div class="relative">
          <input
            placeholder="password"
            :type="showPassword ? 'text' : 'password'"
            v-model="user.password"
          />
          <span
            @click="togglePassword"
            class="absolute right-4 m-2 cursor-pointer"
          >
            <i v-if="showPassword" class="fa-solid fa-eye-slash text-white"></i>
            <i v-else class="fa-solid fa-eye text-white"></i>
          </span>
        </div>
      </div>

      <!-- Error -->
      <p class="text-red-500 text-center pt-2" v-if="error">{{ error }}</p>

      <!-- Button -->
      <button
        class="shiny-btn active-glow text-white bg-[#2f76e8] font-[Roboto] mt-8 p-2 w-[80%] rounded-md"
        @click="handleLogin"
        :disabled="loading"
      >
        <Loader v-if="loading" />
        <span v-else>
          <i class="fa-solid fa-right-to-bracket p-2 mr-2"></i> Sign in
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

definePageMeta({
  layout: "auth", // use the auth layout (no sidebar)
});

const auth = useAuthStore();

const showPassword = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);

const user = ref({
  email: "raju@gmail.com",
  password: "raju@1234",
});

const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  setTimeout(async () => {
    try {
      const success = await auth.login(user.value.email, user.value.password);
      if (success) {
        await navigateTo("/projects");
      } else {
        error.value = "Invalid Email or Password";
      }
    } catch (err) {
      error.value = "Login failed. Please try again";
    } finally {
      loading.value = false;
    }
  }, 2000);
};
</script>

<style scoped>
.container {
  background-image: linear-gradient(135deg, #080b0f, rgb(35, 38, 46) 100%);
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
