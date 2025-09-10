<!-- <template>
  <div>
    <div class="pt-8 flex flex-col gap-2">
      <label class="text-white">Email</label>
      <input placeholder="admin@gmail.com" v-model="user.email" />
    </div>

    <div class="pt-4 flex flex-col gap-2">
      <label class="text-white">Password</label>

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
          <span v-if="showPassword">
            <i class="fa-solid fa-eye-slash text-white"></i>
          </span>

          <span v-else>
            <i class="fa-solid fa-eye text-white"></i>
          </span>
        </span>
      </div>
    </div>

    <button
      class="shiny-btn active-glow text-white bg-[#2f76e8] font-[Roboto] mt-8 p-2 w-full rounded-md"
      @click="handleLogin"
      :disabled="loading"
    >
      <Loader v-if="loading" />
      <div v-else>
        <i class="fa-solid fa-right-to-bracket p-2 mr-2"></i> Sign in
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
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
input {
  background-color: #0f172a;
  padding: 10px;
  width: 22vw;
  border-radius: 6px;
  color: white;
  outline: none;
  border: 1px solid rgb(48, 48, 48);
  font-family: sans-serif;
  font-size: 14px;
}
label {
  font-family: sans-serif;
}
</style> -->
