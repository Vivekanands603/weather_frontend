<template>
  <div
    class="login-page flex items-center justify-center min-h-screen bg-gray-100"
  >
    <div
      class="login-container bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
    >
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
      <p class="mt-4 text-center text-sm">
        Don't have an account?
        <router-link to="/signup" class="text-blue-500 hover:underline"
          >Sign Up</router-link
        >
      </p>
      <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import authService from "@/services/authService";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const { token } = await authService.signIn(this.email, this.password);
        console.log("Login successful. Token:", token);
        // Store the token in localStorage or Vuex for future requests
        localStorage.setItem("token", token);
        // Redirect user to home page or another route
        this.$router.push("/home");
      } catch (error) {
        console.error("Login failed:", error);
        this.errorMessage =
          error.response.data.message || "Login failed. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  background-color: #f7fafc;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  margin-bottom: 16px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4299e1;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3182ce;
}

p {
  margin-top: 16px;
  text-align: center;
}

a {
  color: #4299e1;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
